import React, { Component } from 'react';
import Messenger from '../services/messenger.js';
import './teamstable.css';
import Environment from '../services/env.js';
import axios from 'axios';
// import '../../node_modules/react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';


export default class TeamsTable extends Component {

  constructor(props) {
    super(props);
    Messenger.init()

  }

  createTableData(matches) {
    console.log(`Matches are: ${JSON.stringify(matches)}`)

    const headers = []
    headers.push({
      matchField: "matchNumber",
      headerText: "Match Number"
    })
    
    // headers.push({
    //   matchField: "matchStartTime",
    //   headerText: "Start time"
    // })
    this.rawTables.sort((table1, table2) => table1.tableId - table2.tableId).forEach(tournamentTable => {
      headers.push({
        matchField: tournamentTable.tableId,
        headerText: tournamentTable.tableName
      })
    })
    console.log(`headers are ${JSON.stringify(headers)}`)
    let infoRows = matches.map(match => {
      let retval = {}
      retval.matchNumber = match.matchNumber
      retval.matchStartTime = match.matchStartTime
      match.teams.forEach(team => {
        retval[team.table] = team.name;
      })
      return retval
    })
    this.tableData = {"header":headers,"info":infoRows}
  }

  loadTableFromREST() {
    let tablesUrlPromise = Environment.load().then(env => `${env.moduleTournamentUrl}/table/all`);
      tablesUrlPromise.then(url => this.url = url).then(() => axios.get(this.url)).then(response => {
        return response.data;
      }).then(dat => {
        if (Array.isArray(dat)) {
          this.rawTables = dat.map(table => {
            return {
              tableId: table["tableId"],
              tableName: table["tableName"]
            }
          })
          this.tableNum = dat.length;
        }
      })
  }  

  componentDidMount() {
    if (!this.tableNum) {
      let tablesUrlPromise = Environment.load().then(env => `${env.moduleTournamentUrl}/table/all`);
      tablesUrlPromise.then(url => this.url = url).then(() => axios.get(this.url)).then(response => {
        return response.data;
      }).then(dat => {
        if (Array.isArray(dat)) {
          this.rawTables = dat.map(table => {
            return {
              tableId: table["tableId"],
              tableName: table["tableName"]
            }
          })
          this.tableNum = dat.length;
        }
      })

    }
    Messenger.on('tournament:nextmatch', (data, msg) => {
      const matches = data.data;
      let numOfMatches = matches.length;
      if (this.rawTables) {
        this.setState({ 'tableNum': this.rawTables.length, 'matchesNum': numOfMatches });
      }
      if (matches[0]) {
        let numOfTables = matches[0]['teams'].length || this.state.tableNum
        if (numOfTables !== this.state.tableNum) {
          this.setState({
            'tableNum': numOfTables,
            'matchesNum': numOfMatches
          })
        }
      }
      this.createTableData(matches);


      this.render()
      this.forceUpdate();
    });

  }


  render() {
    let toRender = <div></div>;
    if (this.tableData) {
      const headers = this.tableData["header"];
      const rows = [];
      const jsxHeaders = [];
      for (let i = 0; i < headers.length; i++) {
        jsxHeaders.push(<div className="cell auto header">{headers[i].headerText}</div>)
      }
      const info = this.tableData["info"];
      info.forEach(matchInfo => {
        let rowJSX = [];
        headers.forEach(header => {
          rowJSX.push(<div className="cell auto match-cell">{matchInfo[header["matchField"]]}</div>)
        })
        rows.push(<div className="cell grid-x match-row">{rowJSX}</div>);
      })


      toRender =
        // style={{'width': '100%'}}
        <div className="grid-padding-y cell">
          <div className="cell grid-x">
            {jsxHeaders}
          </div>
          {rows}
        </div>
    }
    return toRender;

  }
}
