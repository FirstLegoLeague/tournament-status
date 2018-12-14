import React, { Component } from 'react'
import Time from 'react-time-format'
import '../../css/components/teamstable.css'
import Environment from '../services/env.js'
import RestResource from '../classes/RestResource'
import MhubResource from '../classes/MhubResource'

const COLUMN_NAMES = ['Match #', 'Start Time', 'End Time']
const MATCH_FIELD = [
  {
    name: 'matchId',
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
        headers.push(<div className="cell auto header">{COLUMN_NAMES[i]}</div>)
      }

      for (let i = 0; i < this.state.tables.length; i++) {
        headers.push(<div className="cell auto header">{this.state.tables[i].tableName}</div>)
      }

      // Creating table records
      for (let j = 0; j < this.state.upcomingMatches.length; j++) {
        let rowJSX = []

        for (let i = 0; i < MATCH_FIELD.length; i++) {
          switch (MATCH_FIELD[i].type) {
            case 'date':
              rowJSX.push(<div className="cell auto match-cell"><Time
                value={this.state.upcomingMatches[j][MATCH_FIELD[i].name]}
                format="HH:mm:ss"/></div>)
              break
            default:
              rowJSX.push(<div
                className="cell auto match-cell">{this.state.upcomingMatches[j][MATCH_FIELD[i].name]}</div>)
              break
          }
        }

        for (let i = 0; i < this.state.upcomingMatches[j].matchTeams.length; i++) {
          rowJSX.push(<div
            className="cell auto match-cell">{this.state.upcomingMatches[j].matchTeams[i].teamNumber}</div>)
        }

        rows.push(<div className="cell grid-x match-row">{rowJSX}</div>)
      }
      return (
        <div className="grid-padding-y cell">
          <div className="cell grid-x">
            {headers}
          </div>
          {rows}
        </div>
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
