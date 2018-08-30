import React, {Component} from 'react';
import Messenger from '../services/messenger.js';
import './teamstable.css';
// import '../../node_modules/react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';


export default class TeamsTable extends Component {

  constructor(props) {
    super(props);
    this.tableNum = props.numOfTables;
    this.matchesToShow = props.matchWanted;
    this.state = {'tableNum': this.tableNum, 'matchesNum': this.matchesToShow};
    this.columns = [{
      dataField: 'num',
      text: 'Match Number'
    }];
    if (this.tableNum) {
      for (let i = 0; i < this.tableNum; i++) {
        this.columns.push({
          dataField: 'table'.concat('' + (i + 1)).concat('Team'),
          text: 'Table '.concat('' + (i + 1))
        })
      }
    }

    this.tableData = [{
      'num': 23,
      'table1Team': 'spikes',
      'table2Team': ' ',
      'table3Team': 'GA',
      'table4Team': ' '
    }, {
      'num': 24,
      'table1Team': 'Beach Bots',
      'table2Team': ' ',
      'table3Team': 'Simbotics',
      'table4Team': ' '
    }]
    Messenger.init()

  }

  createTableData(matchNumbers, nextMatchTeamsArr, nextNextMatchTeamsArr) {

    let tableData = [];
    let rowEntry = {};
    this.columns.forEach((entry, index) => {

      if (entry.dataField === 'num') {
        rowEntry['num'] = matchNumbers[0];
      }
      else if (entry.dataField !== 'num') {
        console.log(nextMatchTeamsArr[index - 1])
        rowEntry[entry.dataField] = nextMatchTeamsArr[index - 1].name;
      }
    });

    tableData.push(rowEntry);
    rowEntry = {};
    this.columns.forEach((entry, index) => {

      if (entry.dataField === 'num') {
        rowEntry['num'] = matchNumbers[1];
      }
      else if (entry.dataField !== 'num') {
        console.log(nextMatchTeamsArr[index - 1])
        rowEntry[entry.dataField] = nextNextMatchTeamsArr[index - 1].name;
      }
    });
    tableData.push(rowEntry);
    this.tableData = tableData;
  }

  componentDidMount() {

    Messenger.on('tournament:nextmatch', (data, msg) => {
      const nextMatchTeams = data.data.nextTeams;
      const nextNextMatchTeams = data.data.nextNextTeams;
      const nextMatch = data.data.nextMatch;
      const nextMatches = [];
      for (let i = nextMatch; i < nextMatch + this.state.matchesNum; i++) {
        nextMatches.push(i);
      }
      this.createTableData(nextMatches, nextMatchTeams, nextNextMatchTeams);
      this.render()
      this.forceUpdate();
    });

  }


  render() {
    console.log(this.tableData);
    let toRender = <div></div>;
    if (this.tableData) {
      const headers = [];
      const rows = [];
      for (let i = 0; i < this.tableNum + 1; i++) {
        headers.push(<div className="cell auto header">{this.columns[i].text}</div>)
      }
      for (let j = 0; j < this.state.matchesNum; j++) {
        let rowTemp = this.tableData[j];
        let rowJSX = [];
        for (let i = 0; i < this.tableNum + 1; i++) {
          rowJSX.push(<div className="cell auto match-cell">{rowTemp[this.columns[i].dataField]}</div>)
        }
        rows.push(<div className="cell grid-x match-row">{rowJSX}</div>);
      }


      toRender =
          // style={{'width': '100%'}}
          <div className="grid-padding-y cell">
            <div className="cell grid-x">
              {headers}
            </div>
            {rows}
          </div>
    }
    return toRender;

  }
}
