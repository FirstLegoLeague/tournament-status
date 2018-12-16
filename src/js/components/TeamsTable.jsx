import React, { Component } from 'react'
import '../../css/components/teamstable.css'
import Environment from '../services/env.js'
import RestResource from '../classes/RestResource'
import MhubResource from '../classes/MhubResource'
import Match from './Match.jsx'

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
    if (!isArrayEmpty(this.state.upcomingMatches) && !isArrayEmpty(this.state.tables)) {
      let matches = []

      for (let match of this.state.upcomingMatches) {
        let newMatchTeam = match.matchTeams.map((matchTeam) => {
          let table = this.state.tables.find(table => table.tableId === matchTeam.tableId)
          return {
            teamNumber: matchTeam.teamNumber,
            tableName: table ? table.tableName : ''
          }
        })
        match.matchTeams = newMatchTeam
        matches.push(<div className="cell shrink"><Match match={match}/></div>)
      }
      return (<div className='grid-x grid-margin-x'>{matches}</div>)
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
