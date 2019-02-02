import React, { Component } from 'react'
import Time from 'react-time-format'
import '../../css/components/match.css'
import {upperCaseFirstIfLetter} from '../classes/StringUtil'

export default class Match extends Component {

  constructor (props, context) {
    super(props, context)
  }

  componentDidMount () {

  }

  render () {
    let matchTeams = []
    for (let matchTeam of this.props.match.matchTeams.filter(x => x.teamNumber)) {
      matchTeams.push(
        <div className="cell auto">
          <div className="grid-y">
            <div className="cell small-7 medium-7 large-7 auto">{matchTeam.tableName}</div>
            <div className="cell small-5 medium-5 large-5 auto">{matchTeam.teamNumber}</div>
          </div>
        </div>
      )
    }

    return (
      <div className="match grid-y">
        <div className="cell bold">
          {upperCaseFirstIfLetter(this.props.match.stage)} #{this.props.match.matchId}
        </div>
        <div className="cell italic border bottom">
          <Time value={this.props.match.startTime} format="HH:mm:ss"/>
        </div>
        <div className="cell">
          <div className="grid-x grid-padding-x">
            {matchTeams}
          </div>
        </div>

      </div>
    )
  }

}
