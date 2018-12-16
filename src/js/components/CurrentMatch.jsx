import React, { Component } from 'react'
import MhubResource from '../classes/MhubResource'
import Environment from '../services/env'

export default class CurrentMatch extends Component {

  constructor (props, context) {
    super(props, context)
    this.state = {}

    this.currentMatchResource = new MhubResource(Environment.load().then(env => `${env.moduleTournamentUrl}/match/current`), 'CurrentMatch:reload')
    this.currentStageResource = new MhubResource(Environment.load().then(env => `${env.moduleTournamentUrl}/settings/tournamentStage`), 'tournamentStage:updated')

    this.currentMatchResource.onReload = () => {
      Promise.resolve(this.currentMatchResource.data).then(data => {
        this.setState({currentMatch: data})
      })
    }

    this.currentStageResource.onReload = ()=>{
      Promise.resolve(this.currentStageResource.data).then(data => {
        let stage = data;
        if(data.value){
          stage = data.value
        }
        this.setState({currentStage: stage})
      })
    }

  }

  render () {
    let currentMatchRender = ''
    if (this.state.currentMatch && this.state.currentStage) {
      currentMatchRender = <h3>{this.state.currentStage} #{this.state.currentMatch.matchId}</h3>
    }

    return (
      <div>
        {currentMatchRender}
      </div>
    )
  }
}
