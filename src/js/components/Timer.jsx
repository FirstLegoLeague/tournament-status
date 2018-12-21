import React, { Component } from 'react'
import CircularProgressbar from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import '../../css/components/timer.css'
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
    this.currentMatchResource = new MhubResource(Environment.load().then(env => `${env.moduleTournamentUrl}/match/current`), 'CurrentMatch:reload')

    setInterval(this.updateTime.bind(this), 1000)
  }

  componentDidMount () {

    this.upcomingMatchesResource.onReload = () => {
      Promise.resolve(this.upcomingMatchesResource.data).then(data => {
        this.setState({upcomingMatches: data})
      })
    }

    this.currentMatchResource.onReload = () => {
      Promise.resolve(this.currentMatchResource.data).then(data => {
        this.setState({currentMatch: data})
      })
    }

  }

  updateTime () {
    const currentTime = new Date()
    if (this.state.upcomingMatches.length > 0) {
      let millisecondsTillNextMatch = new Date(this.state.upcomingMatches[0].startTime).getTime() - currentTime.getTime()
      this.setState({millisecondsTillNextMatch})
    }
  }

  render () {

    if (this.state) {

      let percentage = this.calculatePercent()
      let text = this.getTimeText(this.state.millisecondsTillNextMatch)

      let timerclass = 'greenTime'
      if (this.state.millisecondsTillNextMatch <= this.state.timeThreshold && this.state.millisecondsTillNextMatch > -this.state.yellowThreshold) {
        timerclass = 'yellowTime'
      } else if (this.state.millisecondsTillNextMatch <= 0) {
        timerclass = 'redTime'
      } else if (this.state.millisecondsTillNextMatch > this.state.timeThreshold) {
        timerclass = 'greenTime'
      }
      return (
        <div className="progress-container">
          <div className="text-center">Time to scheduled start of next match</div>
          <CircularProgressbar className={timerclass}
                               percentage={percentage}
                               text={`${text}`}
                               styles={{
                                 text: {
                                   fontSize: '12px'
                                 },
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

  calculatePercent () {
    let fullCircleSeconds = 1000 * 60 * 60 * 5 // 5 minutes default

    if (!this.state.currentMatch) {
      return 100
    }

    if (this.state.upcomingMatches.length > 0) {
      if (this.state.millisecondsTillNextMatch >= 0) {
        fullCircleSeconds = (new Date(this.state.upcomingMatches[0].startTime) - new Date(this.state.currentMatch.startTime))
      } else {
        fullCircleSeconds = (new Date(this.state.currentMatch.startTime) - new Date(this.state.upcomingMatches[0].startTime))
      }
    }

    return ((this.state.millisecondsTillNextMatch) / fullCircleSeconds) * 100
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
      let hoursString = hours !== 0 ? `${this.padNumber(hours, 2)}:` : ''
      let minutesPad = hours !== 0 ? 2 : 1
      return `${milliseconds < 0 ? '-' : '+'}  ${daysString}${hoursString}${this.padNumber(minutes, minutesPad)}:${this.padNumber(seconds, 2)}`
    }

    return '--:--'
  }

  sortMatchesByTime (match1, match2) {
    return new Date(match1.startTime).getTime() - new Date(match2.startTime).getTime()
  }
}

export default Timer
