import React, { Component } from 'react'
import Time from 'react-time-format'
import '../../css/components/teamstable.css'
import Environment from '../services/env.js'
import RestResource from '../classes/RestResource'
import MhubResource from '../classes/MhubResource'

const COLUMN_NAMES = ['Match #', 'Stage', 'Start Time', 'End Time']
const MATCH_FIELD = [
  {
    name: 'matchId',
    type: 'string'
  },
  {
    name: 'stage',
    type: 'string'
  },
  {
    name: 'startTime',
    type: 'date'
  },
  {
    name: 'endTime',
    type: 'date'
  }]

export default class TeamsTable extends Component {

  envPromise

  constructor (props) {
    super(props)

    this.state = {
      tables: [],
      upcomingMatches: []
    }

    this.envPromise = Environment.load()
    this.tablesResource = new RestResource(Environment.load().then(env => `${env.moduleTournamentUrl}/table/all`), 'tables:reload')
    this.upcomingMatchesResource = new MhubResource(Environment.load().then(env => `${env.moduleTournamentUrl}/match/upcoming`), 'UpcomingMatches:reload')
    this.currentMatchResource = new MhubResource(Environment.load().then(env => `${env.moduleTournamentUrl}/match/current`), '')

  }

  componentDidMount () {

    this.tablesResource.onReload = () => {
      Promise.resolve(this.tablesResource.data).then(data => {
        this.setState({tables: data})
      })
    }

    this.upcomingMatchesResource.onReload = () => {
      Promise.resolve(this.upcomingMatchesResource.data).then(data => {
        this.setState({upcomingMatches: data})
      })
    }

  }

  render () {
    if (!isArrayEmpty(this.state.upcomingMatches)) {
      const headers = []
      const rows = []

      // Creating table headers
      for (let i = 0; i < COLUMN_NAMES.length; i++) {
        headers.push(<th>{COLUMN_NAMES[i]}</th>)
      }

      for (let i = 0; i < this.state.tables.length; i++) {
        headers.push(<th>{this.state.tables[i].tableName}</th>)
      }

      // Creating table records
      for (let j = 0; j < this.state.upcomingMatches.length; j++) {
        let rowJSX = []

        for (let i = 0; i < MATCH_FIELD.length; i++) {
          switch (MATCH_FIELD[i].type) {
            case 'date':
              rowJSX.push(<td><Time
                value={this.state.upcomingMatches[j][MATCH_FIELD[i].name]}
                format="HH:mm:ss"/></td>)
              break
            default:
              rowJSX.push(<td>{this.state.upcomingMatches[j][MATCH_FIELD[i].name]}</td>)
              break
          }
        }

        for (let i = 0; i < this.state.upcomingMatches[j].matchTeams.length; i++) {
          rowJSX.push(<td>{this.state.upcomingMatches[j].matchTeams[i].teamNumber}</td>)
        }

        rows.push(<tr>{rowJSX}</tr>)
      }
      return (
        <table>
          <thead>
          <tr>
            {headers}
          </tr>
          </thead>
          <tbody>
          {rows}
          </tbody>
        </table>
      )
    }

    return (<div>No matches found!</div>)
  }
}

function isArrayEmpty (arr) {
  if (Array.isArray(arr)) {
    return arr.length === 0 || arr.some(x => !x)
  }
  return false
}
