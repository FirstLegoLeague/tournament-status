import React, { Component } from 'react'
import ReactResizeDetector from 'react-resize-detector'
import Clock from 'react-live-clock'
import axios from 'axios'
import '@first-lego-league/user-interface/current/app.js'
import '@first-lego-league/user-interface/current/app.css'

import 'react-circular-progressbar/dist/styles.css'
import { Grid } from 'semantic-ui-react'

import './App.scss'

import TeamsTable from './js/components/TeamsTable.jsx'
import Timer from './js/components/Timer.jsx'
import CurrentMatch from './js/components/CurrentMatch.jsx'
import Environment from './js/services/env'
import SettingsButton from './js/components/SettingsButton.jsx'
import isFullscreen from './js/services/fullscreen'
import Settings from './js/services/settings.js'

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tables: [],
      isFullscreen: isFullscreen(),
      settings: Settings.settings
    }

    Settings.on('update', () => {
      this.setState({ settings: Settings.settings })
    })
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
    return [
      <Grid centered padded className={`full-height ${this.state.isFullscreen ? 'fullscreen' : ''}`}>
        <Grid.Row style={{ height: 'calc(100% - 10rem)' }}>
          <Grid.Column width={1} className='left floated full-height'>
            <SettingsButton />
          </Grid.Column>
          <Grid.Column width={6} className='white-text full-height metadata-column'>
            <Clock className='clock' format={Settings.clockFormat()} ticking />
            <CurrentMatch />
          </Grid.Column>
          <Grid.Column width={8} className='full-height'>
            <Timer />
          </Grid.Column>
          <Grid.Column width={1}>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row style={{ height: '10rem' }}>
          <Grid.Column width={16}>
            <TeamsTable />
          </Grid.Column>
        </Grid.Row>
      </Grid>,
      <ReactResizeDetector handleWidth handleHeight onResize={() => this.setState({ isFullscreen: isFullscreen() })} />
    ]
  }
}
