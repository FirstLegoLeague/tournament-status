import React, { Component } from 'react'
import capitalize from 'capitalize'

import createStatusClient from '../services/resource_clients/status_client'
import createSettingsClient from '../services/resource_clients/settings_client'

export default class CurrentMatch extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {}

    createStatusClient().then(statusClient => {
      this.statusClient = statusClient
      this.statusClient.on('reload', () => this.setState({ currentMatch: this.statusClient.data.nextMatchId }))
    })

    createSettingsClient().then(settingsClient => {
      this.settingsClient = settingsClient
      this.settingsClient.on('reload', () => this.setState({ currentStage: this.settingsClient.data.currentStage }))
    })
  }

  render () {
    if (this.state.currentStage && this.state.currentMatch && this.state.currentMatch.matchId > 0) {
      return [
        <div className='current-stage'>{capitalize(this.state.currentStage)}</div>,
        <div className='current-match'>#{this.state.currentMatch}</div>
      ]
    }
    return ''
  }
}
