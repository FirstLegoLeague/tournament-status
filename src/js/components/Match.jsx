import React, { Component } from 'react'
import Time from 'react-time-format'
import '../../css/components/match.css'
import {upperCaseFirstIfLetter} from '../classes/StringUtil'
import { Textfit } from 'react-textfit'

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
            <Textfit className="cell small-7 medium-7 large-7 auto text-center" mode="single" max="20" forceSingleModeWidth="false">
              {matchTeam.tableName}
            </Textfit>
            <Textfit className="cell small-7 medium-7 large-7 auto text-center" mode="single" max="20" forceSingleModeWidth="false">
              {matchTeam.teamNumber}
            </Textfit>
          </div>
        </div>
      )
    }

    return (
      <div className="match grid-y">
        <div className="cell bold">
          <Textfit className="cell small-7 medium-7 large-7 auto text-center" mode="single" max="20" forceSingleModeWidth="false">
            {upperCaseFirstIfLetter(this.props.match.stage)} #{this.props.match.matchId}
          </Textfit>
        </div>
        <div className="cell italic border bottom">
          <Textfit className="cell small-7 medium-7 large-7 auto text-center" mode="single" max="20" forceSingleModeWidth="false">
            <Time value={this.props.match.startTime} format="HH:mm:ss"/>
          </Textfit>
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
