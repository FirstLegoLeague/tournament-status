import React, { Component } from 'react'
import ReactResizeDetector from 'react-resize-detector'
import Clock from 'react-live-clock'
import axios from 'axios'
import '@first-lego-league/user-interface/current/assets/js/app.js'
import '@first-lego-league/user-interface/current/assets/css/app.css'

import 'react-circular-progressbar/dist/styles.css'
import './App.scss'

import TeamsTable from './js/components/TeamsTable.jsx'
import Timer from './js/components/Timer.jsx'
import CurrentMatch from './js/components/CurrentMatch.jsx'
import Environment from './js/services/env'
import SettingsButton from './js/components/SettingsButton.jsx'
import isFullscreen from './js/services/fullscreen'

export default class App extends Component {

  constructor (props) {
    super(props)
    this.state = {
      tables: [],
      isFullscreen: isFullscreen()
    }
  }

  componentDidMount () {
    let tablesUrlPromise = Environment.load().then(env => `${env.moduleTournamentUrl}/table/all`)
    tablesUrlPromise.then(url => this.url = url).then(() => axios.get(this.url)).then(response => {
      this.setState({tables: response.data})
    })
  }

  render () {
    return (
      <div className={`wrapper ${this.state.isFullscreen ? 'fullscreen' : ''}`}>
        <div className="grid-y">
          <div className="cell small-2 medium-2 large-2">
            <div className="grid-x">
              <div className="cell medium-6 white-text left">
                <div className="grid-y">
                  <div className="cell medium-6">
                    <h4><Clock format={'HH:mm:ss'} ticking={true}/></h4>
                  </div>
                  <div className="cell medium-6">
                    <CurrentMatch/>
                  </div>
                </div>
              </div>
              <div className="cell medium-6 grid-x align-right">
                <div className="grid-y">
                  <div className="cell medium-6">
                    <SettingsButton/>
                  </div>
                  <div className="cell medium-6">
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div className="cell small-8 medium-8 large-8 grid-x align-center">
            <Timer/>
          </div>
          <div className="cell small-2 medium-2 large-2 grid-x align-center">
            <TeamsTable/>
          </div>
        </div>
        <ReactResizeDetector handleWidth handleHeight onResize={() => this.setState({isFullscreen: isFullscreen()})}/>
      </div>
    )
  }
}
