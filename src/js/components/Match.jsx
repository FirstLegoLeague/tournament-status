import React, { Component } from 'react'
import Time from 'react-time-format'

import '../../css/components/match.css'
import { Textfit } from 'react-textfit'

import { upperCaseFirstIfLetter } from '../classes/StringUtil'

export default class Match extends Component {
  componentDidMount () {}

  render () {
    const matchTeams = []
    for (const matchTeam of this.props.match.matchTeams.filter(x => x.teamNumber)) {
      matchTeams.push(
        <div className='column'>
          <Textfit className='row text-center' mode='single' max={20} forceSingleModeWidth={false}>
            {matchTeam.tableName}
          </Textfit>
          <Textfit className='row text-center' mode='single' max={20} forceSingleModeWidth={false}>
            {matchTeam.teamNumber}
          </Textfit>
        </div>
      )
    }

    return (
        <div className='match'>
          <div className='row bold'>
            <Textfit className='column text-center' mode='single' max={20} forceSingleModeWidth={false}>
              {upperCaseFirstIfLetter(this.props.match.stage)} #{this.props.match.matchId}
            </Textfit>
          </div>
          <div className='row italic'>
            <Textfit className='column text-center' mode='single' max={20} forceSingleModeWidth={false}>
              <Time value={this.props.match.startTime} format='HH:mm:ss'/>
            </Textfit>
          </div>
          <div className='row'>
            <div className='ui equal width grid'>
              {matchTeams}
            </div>
          </div>
        </div>
    )
  }
}
