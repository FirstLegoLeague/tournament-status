import React, { Component } from 'react'
import MhubResource from '../classes/MhubResource'
import Environment from '../services/env'
import RestResource from '../classes/RestResource'

export default class CurrentMatch extends Component {

  constructor (props, context) {
    super(props, context)
    this.state = {
      tables: []
    }

    this.tablesResource = new RestResource(Environment.load().then(env => `${env.moduleTournamentUrl}/table/all`), 'tables:reload')
    this.currentMatchResource = new MhubResource(Environment.load().then(env => `${env.moduleTournamentUrl}/match/current`), 'CurrentMatch:reload')

    this.tablesResource.onReload = () => {
      Promise.resolve(this.tablesResource.data).then(data => {
        this.setState({tables: data})
      })
    }

    this.currentMatchResource.onReload = () => {
      Promise.resolve(this.currentMatchResource.data).then(data => {
        this.setState({currentMatch: data})
      })
    }

  }

  render () {
    let teams = []
    if (this.state.tables.length > 0 && this.state.currentMatch) {
      for (let i = 0; i < this.state.currentMatch.matchTeams.length; i++) {
        let team = []
        team.push(<td>{this.state.tables[i].tableName}</td>)
        team.push(
          <td>{this.state.currentMatch.matchTeams[i].teamNumber ? this.state.currentMatch.matchTeams[i].teamNumber : '---'}</td>)
        team.push(<td>Name will be</td>)
        teams.push(<tr>{team}</tr>)
      }
    }

    let currentMatchRender = ''
    if (this.state.currentMatch) {
      currentMatchRender = <h3>Current Match: #{this.state.currentMatch.matchId}</h3>
    }

    return (
      <div>
        {currentMatchRender}
        <table>
          <thead>
          <tr>
            <th>Table</th>
            <th>Team #</th>
            <th>Team Name</th>
          </tr>
          </thead>
          <tbody>
          {teams}
          </tbody>
        </table>
      </div>
    )
  }
}
