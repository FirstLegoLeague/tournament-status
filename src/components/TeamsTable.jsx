import React, { Component } from 'react';
import Messenger from '../services/messenger.js';
import Foundation from 'react-foundation';
import '../../node_modules/react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
export default class TeamsTable extends Component {

    constructor(props) {
        super(props);
        Messenger.init()
        this.teams = [{
            "Table 1": "no team",
            "Table 2": "no team"
        }];
    }


    componentDidMount() {

        Messenger.on('tournament:nextmatch', (data, msg) => {
            console.log(this.teams)
            this.teams = [{
                "Table 1": data.data.nextTeams[0],
                "Table 2": "no team"
            }];
            this.render()
        });

    }


    render() {
        if (this.teams) {
            return <BootstrapTable keyField data={this.teams} columns={["Table 1", "Table 2"]} />
        } else {
            return (
                <div></div>
            )
        }
    }
}