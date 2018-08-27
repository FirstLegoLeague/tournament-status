import React, { Component } from 'react';
import logo from './logo.svg';
import Timer from './components/Timer.jsx';
import 'react-circular-progressbar/dist/styles.css';
import './App.scss';
import TeamsTable from './components/TeamsTable.jsx';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <Timer>
          </Timer>
        </div>
        <TeamsTable>

        </TeamsTable>
      </div>
    );
  }
}

export default App;
