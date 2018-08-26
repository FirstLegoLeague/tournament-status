import React, {Component} from 'react';
import logo from './logo.svg';
import Timer from './components/Timer.jsx';
import 'react-circular-progressbar/dist/styles.css';
import './App.scss';

class App extends Component {
  render() {
    return (
        <div className="App">
          <Timer nextUp={"18:28"}>
          </Timer>
        </div>
    );
  }
}

export default App;
