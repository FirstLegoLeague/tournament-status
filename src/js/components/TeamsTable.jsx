import React, { Component } from 'react'

import Match from './Match.jsx'

import Environment from '../services/env.js'
import RestResource from '../classes/RestResource'
import Settings from '../services/settings'

import '../../css/components/teamstable.css'

export default class TeamsTable extends Component {
  envPromise

  constructor (props) {
    super(props)

    this.state = {
      tables: [],
      upcomingMatches: [],
      settings: Settings.settings
    }

    this.envPromise = Environment.load()
    this.tablesResource = new RestResource(Environment.load().then(env => `${env.moduleTournamentUrl}/table/all`), 'tables:reload')
    this.upcomingMatchesResource = new RestResource(Environment.load().then(env => `${env.moduleTournamentUrl}/match/upcoming/${this.state.settings.nextupMatchesAmount}`), 'UpcomingMatches:reload')

    Settings.on('update', () => {
      this.setState({ settings: Settings.settings })
      return Environment.load()
        .then(env => {
          this.upcomingMatchesResource
            .setUrl(`${env.moduleTournamentUrl}/match/upcoming/${Settings.settings.nextupMatchesAmount}`)
          this.upcomingMatchesResource.load()
        })
    })
  }

  componentDidMount () {
    this.tablesResource.onReload = () => {
      this.setState({ tables: this.tablesResource.data })
    }

    this.upcomingMatchesResource.onReload = () => {
      this.setState({ upcomingMatches: this.upcomingMatchesResource.data })
    }
  }

  render () {
    if (!isArrayEmpty(this.state.upcomingMatches) && !isArrayEmpty(this.state.tables)) {
      const matchesRender = []

      for (const match of this.state.upcomingMatches) {
        match.matchTeams = match.matchTeams.map(matchTeam => {
          const table = this.state.tables.find(t => t.tableId === matchTeam.tableId)
          return {
            teamNumber: matchTeam.teamNumber,
            tableName: table ? table.tableName : '--',
            tableId: table.tableId
          }
        })
        matchesRender.push(<div className='column'><Match match={match}/></div>)
      }
      return <div className='ui equal width centered celled padded grid'>
        {matchesRender}
      </div>
    }

    if (isArrayEmpty(this.state.upcomingMatches) && isArrayEmpty(this.state.tables) && this.state.settings.nextupMatchesAmount !== 0) {
      return (<div>No matches found!</div>)
    }

    return (<div />)
  }
}

function isArrayEmpty (arr) {
  if (Array.isArray(arr)) {
    return arr.length === 0 || arr.some(x => !x)
  }
  return false
}
