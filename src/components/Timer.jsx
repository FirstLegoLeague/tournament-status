import React, { Component } from 'react';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './times.css'
import Messenger from '../services/messenger';

class Timer extends Component {
  counter = 0;
  prevDiff = 0;

  nextUpData = {};

  constructor(props) {
    super(props);
    this.updateTime = this.updateTime.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    setInterval(this.updateTime, 100);

    Messenger.init()


    // let self=this;
    // axios.get("http://localhost:3001/match/current").then((res) => {
    //   self.setState({mNum: res.data.matchId});
    //   console.log(self.state);
    // }, (err) => {
    //   console.error(err);
    // });
  }


  /*
  * MHub "data" is of the form 
  * {
  *    nextMatch: number, 
  *    nextMatchTime: string,
  *    nextTeams: Array { 
  *       number:string, 
  *       name:string
  *    }, 
  *    nextNextTeams: Array { 
  *       number:string, 
  *       name:string
  *    }
  * }
  * nextMatchTime has to be of the format "hh:mm"
  * 
  */

  componentDidMount() {
    Messenger.on('tournament:nextmatch', (data, msg) => {
      console.log(data)
      this.nextUpData = data;
    });

  }

  /*
   * Update the display
  */
  updateTime() {
    const timeString = (this.nextUpData.nextMatchTime) ? this.nextUpData.nextMatchTime : '00:00';
    const d = new Date();


    let diff = 0;
    const splitTime = timeString.split(":");
    if (splitTime.length === 2) {

      let nextHour = Number.parseInt(splitTime[0], 10);
      const nextMinute = Number.parseInt(splitTime[1], 10);
      const nextUpDate = new Date(d.getFullYear(), d.getMonth(), d.getDate(), nextHour, nextMinute);
      diff = (nextUpDate - d) / 1000;
    }
    if (this.counter === 10) {
      this.setState({ diffTime: diff, diffCircle: diff });
      this.prevDiff = diff;
      this.counter = 0;
    } else {
      this.setState({ diffTime: this.prevDiff, diffCircle: diff });
    }
    this.counter++;
    return diff;
  }

  render() {

    if (this.state) {
      let percentage = Math.abs(this.state.diffCircle / 150.0 * 100.0);
      console.log(this.state.diffTime % 60);
      const seconds = (Math.floor(Math.abs(this.state.diffTime % 60)));
      let secondsString = `${seconds.toFixed(0)}`;
      if (Math.abs(seconds) < 10) {
        secondsString = `0${seconds}`
      }

      let text = `+${Math.floor(Math.abs(this.state.diffTime / 60))}:${secondsString}`;
      if (this.state.diffTime < 0) {
        text = `-${Math.floor(Math.abs(this.state.diffTime / 60))}:${secondsString}`;
      }
      let timerclass = "greenTime";
      if (Math.floor(Math.abs(this.state.diffTime)) <= 30 && this.state.diffTime > 0) {
        timerclass = "yellowTime";
      } else if (this.state.diffTime <= 0) {
        timerclass = "redTime";
      } else if (this.state.diffTime > 30) {
        timerclass = "greenTime";
      }
      if (percentage <= 100.0) {
        return (
          <div style={{ width: '400px' }}>
            <CircularProgressbar className={timerclass}
              percentage={percentage}
              text={`${text}`}
            />
          </div>
        );
      } else {
        return (
          <div>
            It's too much!
            </div>
        );
      }
    } else {
      return (
        <div>Problems!</div>
      )
    }

  }
}

export default Timer;
