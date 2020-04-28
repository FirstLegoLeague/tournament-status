const { Model } = require('@first-lego-league/synced-resources')

class Settings extends Model { }

Settings.initialValue = {
  tournamentTitle: '',
  scheduleTimeOffset: { },
  currentStage: undefined,
  numberOfPracticeRounds: 0,
  numberOfRankingRounds: 0
}

Settings.mockData = Settings.initialValue

exports.Settings = Settings
