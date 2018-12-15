import React, { Component } from 'react'
import '@first-lego-league/user-interface/current/assets/js/app.js'
import '@first-lego-league/user-interface/current/assets/css/app.css'

import 'react-circular-progressbar/dist/styles.css'
import './App.scss'

import TeamsTable from './js/components/TeamsTable.jsx'
import Timer from './js/components/Timer.jsx'
import CurrentMatch from './js/components/CurrentMatch.jsx'
import Clock from 'react-live-clock'
import axios from 'axios'
import Environment from './js/services/env'

export default class App extends Component {

  constructor (props) {
    super(props)
    this.state = {
      tables: []
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
      <div className="App">
        <div className="callout">

          <div className="grid-container">
            <div className="grid-padding-y align-center">
              <div className="cell medium-8">
                <div className="cell grid-x align-center">
                  <div className="cell medium-6">
                    <Clock format={'HH:mm:ss'} ticking={true}/>
                    <div>
                      <CurrentMatch/>
                    </div>
                  </div>
                  <div className="cell medium-6">
                    <Timer/>
                  </div>
                </div>
              </div>
              <div className="cell medium-4">
                <h3>Next Up</h3>
                <TeamsTable/>
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }
}
