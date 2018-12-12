import React, { Component } from 'react'
import Time from 'react-time-format'
import Messenger from '../services/messenger.js'
import './teamstable.css'
import Environment from '../services/env.js'
import axios from 'axios'

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
  tableUrlPromise

  constructor (props) {
    super(props)

    this.state = {
      tables: [],
      matches: []
    }

    this.envPromise = Environment.load()
    this.tableUrlPromise = Environment.load().then(env => `${env.moduleTournamentUrl}/table/all`)

    Messenger.init()
  }

  componentDidMount () {

    Promise.resolve(this.tableUrlPromise).then(url => this.url = url).then(() => axios.get(this.url)).then(response => {
      console.log(response.data)
      this.setState({tables: response.data})
    })

    Messenger.on('UpcomingMatches:reload', (data, msg) => {
      const matches = data.data
      this.setState({matches: matches})
    })

  }

  render () {
    if (!isArrayEmpty(this.state.matches)) {
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
      for (let j = 0; j < this.state.matches.length; j++) {
        let rowJSX = []

        for (let i = 0; i < MATCH_FIELD.length; i++) {
          switch (MATCH_FIELD[i].type) {
            case 'date':
              rowJSX.push(<div className="cell auto match-cell"><Time value={this.state.matches[j][MATCH_FIELD[i].name]}
                                                                      format="HH:mm:ss"/></div>)
              break
            default:
              rowJSX.push(<div className="cell auto match-cell">{this.state.matches[j][MATCH_FIELD[i].name]}</div>)
              break
          }
        }

        for (let i = 0; i < this.state.matches[j].matchTeams.length; i++) {
          rowJSX.push(<div className="cell auto match-cell">{this.state.matches[j].matchTeams[i].teamNumber}</div>)
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
  return arr.length === 0 || arr.some(x => !x)
}
