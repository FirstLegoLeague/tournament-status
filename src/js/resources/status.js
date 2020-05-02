const { Model } = require('@first-lego-league/synced-resources')

class Status extends Model { }

Status.initialValue = {
  nextMatchId: 0,
  nextMatchTime: '05/02/2020 15:00:00'
}

Status.mockData = Status.initialValue

exports.Status = Status
