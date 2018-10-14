import React, { Component } from 'react';
import '@first-lego-league/user-interface/current/assets/js/app.js'

import '@first-lego-league/user-interface/current/assets/css/app.css'

import 'react-circular-progressbar/dist/styles.css';
import './App.scss';



import TeamsTable from './components/TeamsTable.jsx';
import Timer from './components/Timer.jsx';
import axios from 'axios'
import Environment from './services/env'

class App extends Component {
  render() {

    return (
      <div className="App">
        <div className="grid-container">
          <div className="grid-padding-y align-center">
            <div className="cell grid-x align-center">
              <Timer>
              </Timer>
            </div>

            <TeamsTable numOfTables={2} matchWanted={2}>
            </TeamsTable>
          </div>

        </div>
      </div>
    )
      ;
  }
}

export default App;
