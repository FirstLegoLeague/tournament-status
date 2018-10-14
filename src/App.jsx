import React, { Component } from 'react';
import '@first-lego-league/user-interface/current/assets/js/app.js'
import '@first-lego-league/user-interface/current/assets/css/app.css'
import './App.scss';
import 'react-circular-progressbar/dist/styles.css';

import TeamsTable from './js/components/TeamsTable.jsx';
import Timer from './js/components/Timer.jsx';

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

            <TeamsTable numOfTables={ 2 } matchWanted={ 2 }>
            </TeamsTable>
          </div>

        </div>
      </div>
    );
  }
}

export default App
