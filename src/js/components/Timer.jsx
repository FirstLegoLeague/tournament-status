import React, { Component } from 'react';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import '../../css/components/times.css'
import Messenger from '../services/messenger';

class Timer extends Component {


  constructor(props) {
    super(props);
    this.updateTime = this.updateTime.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.counter = 0;
    this.prevDiff = 0;
    this.numberOfMatchesSent = 2;
    this.nextUpData = {};
    setInterval(this.updateTime, 100);

  }

  getNumOfMatches() {
    return this.numberOfMatchesSent;
  }

  /*
  * MHub "data" is of the form
  * [{
  *    matchNumber: number,
  *    matchStartTime: string,
  *    teams: Array {
  *       number:number,
  *       name:string,
  *       table:number
  *    }
  * }]
  * nextMatchTime has to be of the format "hh:mm"
  *
  */

  componentDidMount() {

    Messenger.on('CurrentMatch:reload', (data, msg) => {
      console.info(data)
      this.nextUpData = data.data;
      this.updateTime()
    });

    Messenger.on('clock:time', (data, msg) => {
      this.clockTime = data.data.time
    })

  }

  /*
   * Update the display
  */
  updateTime() {
    this.numberOfMatchesSent = this.nextUpData.length;
    if (this.nextUpData[0]) {
      let nextMatch = this.nextUpData.sort((match1, match2) => match1.matchNumber - match2.matchNumber)[0]
      const nextMatchTimeDate = new Date(nextMatch['matchStartTime']);
      let timeString = '00:00';
      if (nextMatch['matchStartTime']) {
        const parts1 = nextMatchTimeDate.toTimeString().split(' ');
        const timePart = parts1[0].split(':').slice(0, 2);
        timeString = `${timePart[0]}:${timePart[1]}`;
      }

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
    } else {
      return 0;
    }

  }

  render() {

    if (this.state) {
      let percentage = Math.abs(this.state.diffCircle / 300.0 * 100.0);


      //console.log(this.state.diffTime % 60);
      const seconds = (Math.floor(Math.abs(this.state.diffTime % 60)));
      let secondsString = `${seconds.toFixed(0)}`;
      let minutes = (Math.floor(Math.abs(this.state.diffTime / 60)));
      let minuteString = `${minutes.toFixed(0)}`;
      if (Math.abs(this.state.diffTime) > 3600) {
        minutes = (Math.floor(Math.abs(this.state.diffTime / 60) % 60));
        minuteString = `${minutes.toFixed(0)}`;
      }

      if (Math.abs(seconds) < 10) {
        secondsString = `0${seconds}`
      }
      if (Math.abs(minutes) < 10) {
        minuteString = `0${minutes}`
      }
      let text = `+${minuteString}:${secondsString}`;
      if (this.state.diffTime > 3600) {
        text = `+${Math.floor(Math.abs(this.state.diffTime / 3600))}:${minuteString}:${secondsString}`;
      }

      if (this.state.diffTime < 0) {
        text = `-${Math.floor(Math.abs(this.state.diffTime / 60))}:${secondsString}`;
      }
      if (this.state.diffTime < -3600) {
        text = `-${Math.floor(Math.abs(this.state.diffTime / 3600))}:${minuteString}:${secondsString}`;
      }
      let timerclass = "greenTime";
      if (Math.floor(Math.abs(this.state.diffTime)) <= 30 && this.state.diffTime > 0) {
        timerclass = "yellowTime";
      } else if (this.state.diffTime <= 0) {
        timerclass = "redTime";
      } else if (this.state.diffTime > 30) {
        timerclass = "greenTime";
      }
      /*<div style={{ width: '25em' }} id="jello" className="cell">*/      // </div>
      if (percentage <= 100.0) {
        return (
          <div className="progress-container">
            <CircularProgressbar className={timerclass}
              percentage={percentage}
              text={`${text}`}
            />
          </div>
        );
      } else {
        return (
          <div className="progress-container">
            <CircularProgressbar className={timerclass}
              percentage={100}
              text={`${text}`}
            />
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
