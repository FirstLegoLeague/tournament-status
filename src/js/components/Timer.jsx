import React, { Component } from 'react'
import CircularProgressbar from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import '../../css/components/times.css'
import Environment from '../services/env'
import MhubResource from '../classes/MhubResource'

const THRESHOLD_IN_MINUTES = 2

class Timer extends Component {

  constructor (props) {
    super(props)

    this.state = {
      upcomingMatches: [],
      millisecondsTillNextMatch: 0,
      timeThreshold: THRESHOLD_IN_MINUTES * 60 * 1000
    }

    this.upcomingMatchesResource = new MhubResource(Environment.load().then(env => `${env.moduleTournamentUrl}/match/upcoming`), 'UpcomingMatches:reload')

    setInterval(this.updateTime.bind(this), 1000)
  }

  componentDidMount () {

    this.upcomingMatchesResource.onReload = () => {
      Promise.resolve(this.upcomingMatchesResource.data).then(data => {
        this.setState({upcomingMatches: data})
      })
    }

  }

  updateTime () {
    const currentTime = new Date()
    let millisecondsTillNextMatch = new Date(this.state.upcomingMatches[0].startTime).getTime() - currentTime.getTime()
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
      return (
        <div className="progress-container">
          <CircularProgressbar className={timerclass}
                               percentage={percentage}
                               text={`${text}`}
                               styles={{
                                 text: {
                                   fontSize: '12px'
                                 }
                               }}
          />
        </div>
      )

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
