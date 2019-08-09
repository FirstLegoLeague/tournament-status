import React, { Component } from 'react'
import ReactResizeDetector from 'react-resize-detector'
import Clock from 'react-live-clock'
import axios from 'axios'
import '@first-lego-league/user-interface/current/app.js'
import '@first-lego-league/user-interface/current/app.css'

import 'react-circular-progressbar/dist/styles.css'
import './App.scss'

import TeamsTable from './js/components/TeamsTable.jsx'
import Timer from './js/components/Timer.jsx'
import CurrentMatch from './js/components/CurrentMatch.jsx'
import Environment from './js/services/env'
import SettingsButton from './js/components/SettingsButton.jsx'
import isFullscreen from './js/services/fullscreen'
import { Grid } from 'semantic-ui-react'

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tables: [],
      isFullscreen: isFullscreen()
    }
  }

  componentDidMount () {
    return Environment.load()
      .then(env => `${env.moduleTournamentUrl}/table/all`)
      .then(url => { this.url = url })
      .then(() => axios.get(this.url))
      .then(response => {
        this.setState({ tables: response.data })
      })
  }

  render () {
    return (
      <div className={`wrapper ${this.state.isFullscreen ? 'fullscreen' : ''}`}>
        <Grid centered>
              <Grid.Column width={3} className='left floated white-text'>
                <h4><Clock format={'HH:mm:ss'} ticking /></h4>
                <CurrentMatch />
              </Grid.Column>
              <Grid.Column width={10}>
                <Timer />
              </Grid.Column>
              <Grid.Column width={3} className='right floated right aligned'>
                <SettingsButton />
              </Grid.Column>
        </Grid>
          <div>
            <TeamsTable />
          </div>
        <ReactResizeDetector handleWidth handleHeight onResize={() => this.setState({ isFullscreen: isFullscreen() })} />
      </div>
    )
  }
}
