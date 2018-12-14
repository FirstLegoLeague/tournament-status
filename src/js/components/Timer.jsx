import React, { Component } from 'react'
import CircularProgressbar from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import '../../css/components/times.css'
import Messenger from '../services/messenger'
import Environment from '../services/env'
import axios from 'axios'

const THRESHOLD_IN_MINUTES = 2

class Timer extends Component {

  constructor (props) {
    super(props)

    this.state = {
      nextUpMatches: [],
      millisecondsTillNextMatch: 0,
      timeThreshold: THRESHOLD_IN_MINUTES * 60 * 1000
    }

    this.upcomingMatchesPromise = Environment.load().then(env => `${env.moduleTournamentUrl}/match/upcoming`).then(url => this.upcomingUrl = url).then(() => axios.get(this.upcomingUrl))

    setInterval(this.updateTime.bind(this), 1000)
  }

  componentDidMount () {

    Promise.resolve(this.upcomingMatchesPromise).then(response => {
      this.setState({nextUpMatches: response.data.sort(this.sortMatchesByTime)})
    })

    Messenger.on('UpcomingMatches:reload', (data, msg) => {
      this.setState({nextUpMatches: data.data.sort(this.sortMatchesByTime)})
      this.updateTime()
    })

  }

  updateTime () {
    const currentTime = new Date()
    let millisecondsTillNextMatch = new Date(this.state.nextUpMatches[0].startTime).getTime() - currentTime.getTime()
    this.setState({millisecondsTillNextMatch})
  }

  render () {

    if (this.state) {
      let percentage = Math.abs(this.state.millisecondsTillNextMatch / 300.0 * 100.0)

      let text = this.getTimeText(this.state.millisecondsTillNextMatch)

      let timerclass = 'greenTime'
      if (this.state.millisecondsTillNextMatch <= this.state.timeThreshold && this.state.millisecondsTillNextMatch > -this.state.timeThreshold) {
        timerclass = 'yellowTime'
      } else if (this.state.millisecondsTillNextMatch <= -this.state.timeThreshold) {
        timerclass = 'redTime'
      } else if (this.state.millisecondsTillNextMatch > this.state.timeThreshold) {
        timerclass = 'greenTime'
      }

      if (percentage <= 100.0) {
        return (
          <div className="progress-container">
            <CircularProgressbar className={timerclass}
                                 percentage={percentage}
                                 text={`${text}`}
            />
          </div>
        )
      } else {
        return (
          <div className="progress-container">
            <CircularProgressbar className={timerclass}
                                 percentage={100}
                                 text={`${text}`}
            />
          </div>
        )
      }
    } else {
      return (
        <div>Problems!</div>
      )
    }

  }

  padNumber (number, size) {
    let s = String(number)
    while (s.length < (size || 2)) {s = '0' + s}
    return s
  }

  getTimeText (value) {
    if (value) {
      let milliseconds = value
      let delta = Math.abs(milliseconds) / 1000
      let days = Math.floor(delta / 86400)
      delta -= days * 86400
      let hours = Math.floor(delta / 3600) % 24
      delta -= hours * 3600
      let minutes = Math.floor(delta / 60) % 60
      delta -= minutes * 60
      let seconds = Math.floor(delta % 60)

      let daysString = days !== 0 ? `${this.padNumber(days, 2)}:` : ''
      return `${milliseconds < 0 ? '-' : ''}  ${daysString}${this.padNumber(hours, 2)}:${this.padNumber(minutes, 2)}:${this.padNumber(seconds, 2)}`
    }

    return 'Unknown'
  }

  sortMatchesByTime (match1, match2) {
    return new Date(match1.startTime).getTime() - new Date(match2.startTime).getTime()
  }
}

export default Timer
