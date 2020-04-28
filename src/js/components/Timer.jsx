import React, { Component } from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'

import 'react-circular-progressbar/dist/styles.css'
import '../../css/components/timer.css'

import Environment from '../services/env'
import createStatusClient from '../services/resource_clients/status_client'

const COLOR_THRESHOLD = 2 * 60 * 1000 // 2 minutes

class Timer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      nextMatchTime: undefined,
      millisecondsTillNextMatch: 0
    }

    createStatusClient().then(statusClient => {
      this.statusClient = statusClient
      this.statusClient.on('reload', () => {
        if (statusClient.data.nextMatchTime) {
          this.setState({ nextMatchTime: statusClient.data.nextMatchTime })
        } else {
          this.setState({ millisecondsTillNextMatch: undefined })
        }
      })
    })

    setInterval(this.updateTime.bind(this), 1000)
  }

  updateTime () {
    const currentTime = new Date()
    if (this.state.nextMatchTime) {
      this.setState({ millisecondsTillNextMatch: new Date(this.state.nextMatchTime).getTime() - currentTime.getTime() })
    } else {
      this.setState({ millisecondsTillNextMatch: undefined })
    }
  }

  calculatePercent () {
    let fullCircleSeconds = 1000 * 60 * 5 // 5 minutes default

    if (this.state.millisecondsTillNextMatch < 0) {
      fullCircleSeconds = -fullCircleSeconds
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

  render () {
    if (this.state) {
      const percentage = this.calculatePercent()
      const text = this.getTimeText(this.state.millisecondsTillNextMatch)

      let timerclass = 'greenTime'
      if (this.state.millisecondsTillNextMatch >= 0 && this.state.millisecondsTillNextMatch <= COLOR_THRESHOLD) {
        timerclass = 'yellowTime'
      } else if (this.state.millisecondsTillNextMatch < 0) {
        timerclass = 'redTime'
      } else if (this.state.millisecondsTillNextMatch > COLOR_THRESHOLD) {
        timerclass = 'greenTime'
      }

      return (
        <div className='timer-container full-height full-width'>
          <div className='row'>
            <CircularProgressbar
              className={timerclass}
              value={percentage}
              text={`${text}`}
              strokeWidth={12}
              styles={{
                text: { fontSize: '0.9rem' }
              }}
            />
          </div>
          <div className='white-text'>Time to scheduled start of next match</div>
        </div>
      )
    } else {
      return (
        <div>Problems!</div>
      )
    }
  }
}

export default Timer
