import React, { Component } from 'react'
import Time from 'react-time-format'
import '../../css/components/match.css'

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
          {this.upperCaseFirstIfLetter(this.props.match.stage)} #{this.props.match.matchId}
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

  upperCaseFirstIfLetter (string) {
    if (string) {
      let stringRegex = /^\D/
      let regex = new RegExp(stringRegex)

      if (regex.test(string)) {
        let first = string.slice(0, 1)
        let stelse = string.slice(1, string.length)
        return first.toUpperCase() + stelse
      }
      return string
    }
    return ''
  }
}
