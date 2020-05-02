import React, { Component } from 'react'
import moment from 'moment'
import capitalize from 'capitalize'
import { Textfit } from 'react-textfit'

import '../../css/components/match.css'
import Settings from '../services/settings'

export default class Match extends Component {
  componentDidMount () {}

  render () {
    const teams = []
    for (const team of this.props.match.teams.filter(x => x.teamNumber)) {
      teams.push(
        <div key={team.teamNumber} className='column'>
          <Textfit className='row text-center' mode='single' max={20} forceSingleModeWidth={false}>
            {team.tableName}
          </Textfit>
          <Textfit className='row text-center' mode='single' max={20} forceSingleModeWidth={false}>
            {team.teamNumber}
          </Textfit>
        </div>
      )
    }

    return (
      <div className='match'>
        <div className='row bold'>
          <Textfit className='column text-center' mode='single' max={20} forceSingleModeWidth={false}>
            {capitalize(this.props.match.stage)} #{this.props.match.matchId}
          </Textfit>
        </div>
        <div className='row italic'>
          <Textfit className='column text-center' mode='single' max={20} forceSingleModeWidth={false}>
            {moment(this.props.match.startTime).format(Settings.clockFormat())}
          </Textfit>
        </div>
        <div className='row'>
          <div className='ui equal width grid'>
            {teams}
          </div>
        </div>
      </div>
    )
  }
}
