import React, { Component } from 'react'

import Match from './Match.jsx'

import createTablesClient from '../services/resource_clients/tables_client'
import createStatusClient from '../services/resource_clients/status_client'

import Settings from '../services/settings'

import '../../css/components/teamstable.css'

function isArrayEmpty (arr) {
  if (Array.isArray(arr)) {
    return arr.length === 0 || arr.some(x => !x)
  }
  return false
}

export default class TeamsTable extends Component {
  constructor (props) {
    super(props)

    this.state = {
      tables: [],
      upcomingMatches: [],
      settings: Settings.settings
    }

    createTablesClient().then(tablesClient => {
      this.tablesClient = tablesClient
      this.tablesClient.on('reload', () => this.setState({ tables: tablesClient.data }))
      this.setState({ tables: tablesClient.data })
    })

    createStatusClient().then(statusClient => {
      this.statusClient = statusClient
      this.statusClient.on('reload', () => this.updateNextMatches())
      this.updateNextMatches()
    })


    Settings.on('update', () => {
      this.setState({ settings: Settings.settings })
      return this.updateNextMatches()
    })
  }

  updateNextMatches () {
    this.statusClient.getNextMatches(Settings.settings.nextupMatchesAmount).then(matches => {
      this.setState({ upcomingMatches: matches })
    })
  }

  render () {
    if (!isArrayEmpty(this.state.upcomingMatches) && !isArrayEmpty(this.state.tables)) {
      const matchesRender = []

      for (const match of this.state.upcomingMatches) {
        match.teams = match.teams.map(team => {
          const table = this.state.tables.find(t => t.id() === team.tableId)
          return {
            teamNumber: team.teamNumber,
            tableName: table ? table.tableName : '--',
            tableId: table.id()
          }
        })
        matchesRender.push(<div key={match.matchId} className='column'><Match match={match}/></div>)
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
