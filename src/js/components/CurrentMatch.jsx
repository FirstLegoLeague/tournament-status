import React, { Component } from 'react'

import MhubResource from '../classes/MhubResource'
import Environment from '../services/env'
import { upperCaseFirstIfLetter } from '../classes/StringUtil'

export default class CurrentMatch extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {}

    this.currentMatchResource = new MhubResource(Environment.load().then(env => `${env.moduleTournamentUrl}/match/current`), 'CurrentMatch:reload')
    this.currentStageResource = new MhubResource(Environment.load().then(env => `${env.moduleTournamentUrl}/settings/tournamentStage`), 'tournamentStage:updated')

    this.currentMatchResource.onReload = () => {
      this.setState({ currentMatch: this.currentMatchResource.data })
    }

    this.currentStageResource.onReload = () => {
      const data = this.currentStageResource.data

      if (data.value) {
        this.setState({ currentStage: data.value })
      } else {
        this.setState({ currentStage: data })
      }
    }
  }

  render () {
    let currentMatchRender = ''
    if (this.state.currentMatch && this.state.currentMatch.matchId > 0 && this.state.currentStage) {
      currentMatchRender = <h1 className='ui huge inverted header current-match'>{upperCaseFirstIfLetter(this.state.currentStage)} #{this.state.currentMatch.matchId}</h1>
    }

    return (<span>{currentMatchRender}</span>)
  }
}
