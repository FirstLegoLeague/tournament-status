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
          {matchTeam.tableName}
          <br/>
          {matchTeam.teamNumber}
        </div>
      )
    }

    return (
      <div className="match grid-y">
        <div className="cell">
          {upperCaseFirstIfLetter(this.props.match.stage)} #{this.props.match.matchId}
        </div>
        <div className="cell">
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
