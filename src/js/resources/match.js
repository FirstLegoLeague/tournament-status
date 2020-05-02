const { FieldsModel } = require('@first-lego-league/synced-resources')
const moment = require('moment')

class Match extends FieldsModel {
  fields () {
    return Match.FIELDS
  }

  offsetTimes (offset) {
    this.startTime = moment(this.startTime).add(offset, 'ms')
    this.endTime = moment(this.endTime).add(offset, 'ms')
  }
}

Match.FIELDS = [
  { key: '_id', type: String, defaultValue: undefined },
  { key: 'matchId', type: String, required: true },
  { key: 'startTime', type: String, required: true },
  { key: 'endTime', type: String, required: true },
  { key: 'stage', type: String, defaultValue: 'practice', required: true },
  { key: 'teams', required: true }
]

Match.mockData = [
  {
    matchId: 1,
    startTime: '2019-01-28T15:30:00.000Z',
    endTime: '2019-01-28T15:32:30.000Z',
    stage: 'qualification',
    teams: [
      { teamNumber: 2468, tableId: "1" },
      { teamNumber: 8, tableId: "2" },
      { teamNumber: 2212, tableId: "3" },
      { teamNumber: 123, tableId: "4" },
      { teamNumber: 173, tableId: "5" },
      { teamNumber: 2, tableId: "6" },
      { teamNumber: 8846, tableId: "7" },
      { teamNumber: 981, tableId: "8" }
    ]
  },{
    matchId: 2,
    startTime: '2019-01-28T15:35:00.000Z',
    endTime: '2019-01-28T15:37:30.000Z',
    stage: 'qualification',
    teams: [
      { teamNumber: 2468, tableId: "1" },
      { teamNumber: 8, tableId: "2" },
      { teamNumber: 2212, tableId: "3" },
      { teamNumber: 123, tableId: "4" },
      { teamNumber: 173, tableId: "5" },
      { teamNumber: 2, tableId: "6" },
      { teamNumber: 8846, tableId: "7" },
      { teamNumber: 981, tableId: "8" }
    ]
  },{
    matchId: 3,
    startTime: '2019-01-28T15:40:00.000Z',
    endTime: '2019-01-28T15:42:30.000Z',
    stage: 'qualification',
    teams: [
      { teamNumber: 2468, tableId: "1" },
      { teamNumber: 8, tableId: "2" },
      { teamNumber: 2212, tableId: "3" },
      { teamNumber: 123, tableId: "4" },
      { teamNumber: 173, tableId: "5" },
      { teamNumber: 2, tableId: "6" },
      { teamNumber: 8846, tableId: "7" },
      { teamNumber: 981, tableId: "8" }
    ]
  },{
    matchId: 4,
    startTime: '2019-01-28T15:45:00.000Z',
    endTime: '2019-01-28T15:47:30.000Z',
    stage: 'qualification',
    teams: [
      { teamNumber: 2468, tableId: "1" },
      { teamNumber: 8, tableId: "2" },
      { teamNumber: 2212, tableId: "3" },
      { teamNumber: 123, tableId: "4" },
      { teamNumber: 173, tableId: "5" },
      { teamNumber: 2, tableId: "6" },
      { teamNumber: 8846, tableId: "7" },
      { teamNumber: 981, tableId: "8" }
    ]
  },{
    matchId: 5,
    startTime: '2019-01-28T15:50:00.000Z',
    endTime: '2019-01-28T15:52:30.000Z',
    stage: 'qualification',
    teams: [
      { teamNumber: 2468, tableId: "1" },
      { teamNumber: 8, tableId: "2" },
      { teamNumber: 2212, tableId: "3" },
      { teamNumber: 123, tableId: "4" },
      { teamNumber: 173, tableId: "5" },
      { teamNumber: 2, tableId: "6" },
      { teamNumber: 8846, tableId: "7" },
      { teamNumber: 981, tableId: "8" }
    ]
  },{
    matchId: 6,
    startTime: '2019-01-28T15:55:00.000Z',
    endTime: '2019-01-28T15:57:30.000Z',
    stage: 'qualification',
    teams: [
      { teamNumber: 2468, tableId: "1" },
      { teamNumber: 8, tableId: "2" },
      { teamNumber: 2212, tableId: "3" },
      { teamNumber: 123, tableId: "4" },
      { teamNumber: 173, tableId: "5" },
      { teamNumber: 2, tableId: "6" },
      { teamNumber: 8846, tableId: "7" },
      { teamNumber: 981, tableId: "8" }
    ]
  }
].map(attrs => new Match(attrs))

exports.Match = Match
