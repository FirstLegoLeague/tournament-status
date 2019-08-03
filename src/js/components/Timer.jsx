import React, { Component } from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'

import 'react-circular-progressbar/dist/styles.css'
import '../../css/components/timer.css'
import { Textfit } from 'react-textfit'

import Environment from '../services/env'
import MhubResource from '../classes/MhubResource'

const THRESHOLD_IN_MINUTES = 2

class Timer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      upcomingMatches: [],
      millisecondsTillNextMatch: 0,
      colorThreshold: THRESHOLD_IN_MINUTES * 60 * 1000
    }

    this.upcomingMatchesResource = new MhubResource(Environment.load().then(env => `${env.moduleTournamentUrl}/match/upcoming`), 'UpcomingMatches:reload')
    this.currentMatchResource = new MhubResource(Environment.load().then(env => `${env.moduleTournamentUrl}/match/current`), 'CurrentMatch:reload')

    setInterval(this.updateTime.bind(this), 1000)
  }

  componentDidMount () {
    this.upcomingMatchesResource.onReload = () => {
      this.setState({ upcomingMatches: this.upcomingMatchesResource.data })
    }

    this.currentMatchResource.onReload = () => {
      this.setState({ currentMatch: this.currentMatchResource.data })
    }
  }

  updateTime () {
    const currentTime = new Date()
    if (this.state.upcomingMatches.length > 0) {
      const millisecondsTillNextMatch = new Date(this.state.upcomingMatches[0].startTime).getTime() - currentTime.getTime()
      this.setState({ millisecondsTillNextMatch })
    } else {
      this.setState({ millisecondsTillNextMatch: undefined })
    }
  }

  render () {
    if (this.state) {
      const percentage = this.calculatePercent()
      const text = this.getTimeText(this.state.millisecondsTillNextMatch)

      let timerclass = 'greenTime'
      if (this.state.millisecondsTillNextMatch >= 0 && this.state.millisecondsTillNextMatch <= this.state.colorThreshold) {
        timerclass = 'yellowTime'
      } else if (this.state.millisecondsTillNextMatch < 0) {
        timerclass = 'redTime'
      } else if (this.state.millisecondsTillNextMatch > this.state.colorThreshold) {
        timerclass = 'greenTime'
      }

      return (
        <div className='ui grid centered'>
          <div className='row'>
            <CircularProgressbar className={timerclass}
              value={percentage}
              text={`${text}`}
              strokeWidth={4}
              styles={{
                text: { fontSize: '0.9rem' }
              }}
            />
          </div>
          <Textfit className='row text-center white-text' mode='single' max={25} forceSingleModeWidth={false}>
            Time to scheduled start of next match
          </Textfit>
        </div>
      )
    } else {
      return (
        <div>Problems!</div>
      )
    }
  }

  calculatePercent () {
    let fullCircleSeconds = 1000 * 60 * 5 // 5 minutes default

    if (!this.state.currentMatch) {
      return 100
    }

    if (this.state.upcomingMatches.length > 0) {
      if (this.state.millisecondsTillNextMatch < 0) {
        fullCircleSeconds = -fullCircleSeconds
      }
    }

    return ((this.state.millisecondsTillNextMatch) / fullCircleSeconds) * 100
  }

  padNumber (number, size) {
    let s = String(number)
    while (s.length < (size || 2)) { s = '0' + s }
    return s
  }

  getTimeText (value) {
    if (value) {
      const milliseconds = value
      let delta = Math.abs(milliseconds) / 1000
      const days = Math.floor(delta / 86400)
      delta -= days * 86400
      const hours = Math.floor(delta / 3600) % 24
      delta -= hours * 3600
      const minutes = Math.floor(delta / 60) % 60
      delta -= minutes * 60
      const seconds = Math.floor(delta % 60)

      const daysString = days !== 0 ? `${this.padNumber(days, 2)}:` : ''
      const hoursString = hours !== 0 ? `${this.padNumber(hours, 2)}:` : ''
      const minutesPad = hours !== 0 ? 2 : 1
      return `${milliseconds < 0 ? '-' : '+'}${daysString}${hoursString}${this.padNumber(minutes, minutesPad)}:${this.padNumber(seconds, 2)}`
    }

    return '--:--'
  }

  sortMatchesByTime (match1, match2) {
    return new Date(match1.startTime).getTime() - new Date(match2.startTime).getTime()
  }
}

export default Timer
