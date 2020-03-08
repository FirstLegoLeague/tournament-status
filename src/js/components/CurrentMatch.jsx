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
    if (this.state.currentMatch && this.state.currentMatch.matchId > 0 && this.state.currentStage) {
      return [
        <div className='current-stage'>{upperCaseFirstIfLetter(this.state.currentStage)}</div>,
        <div className='current-match'>#{this.state.currentMatch.matchId}</div>
      ]
    }
    return ''
  }
}
