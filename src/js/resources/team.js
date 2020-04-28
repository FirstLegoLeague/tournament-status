const { FieldsModel, InvalidEntry } = require('@first-lego-league/synced-resources')

class Team extends FieldsModel {
  fields () {
    return Team.FIELDS
  }

  validate ({ collection }) {
    super.validate({ collection })
    if (collection.filter(team => team.number === this.number).length > 1) {
      throw new InvalidEntry('Duplicate team number')
    }
  }
}

Team.FIELDS = [
  { key: '_id', type: String, defaultValue: undefined },
  { key: 'number', type: Number, required: true },
  { key: 'name', type: String, required: true },
  { key: 'affiliation', type: String },
  { key: 'cityState', type: String },
  { key: 'country', type: String },
  { key: 'coach1', type: String },
  { key: 'coach2', type: String },
  { key: 'judgingGroup', type: String },
  { key: 'pitNumber', type: Number },
  { key: 'pitLocation', type: String },
  { key: 'language', type: String }
]

Team.mockData = [
  { number: 1, name: "The first team", affiliation: "Westworld" },
  { number: 2, name: "Two is always together", affiliation: "Ba-Sing-Se" },
  { number: 8, name: "Magic 8", affiliation: "Naboo" },
  { number: 15, name: "The RoboJars", affiliation: "Gravity Falls" },
  { number: 54, name: "What will you get if you multiply six by nine?", affiliation: "Narnia" },
  { number: 123, name: "Genesis", affiliation: "Rivendell" },
  { number: 132, name: "King of Hearts", affiliation: "Hogwarts" },
  { number: 173, name: "The Society of the Blind Eye", affiliation: "Gotham" },
  { number: 182, name: "The blue dot", affiliation: "Winterfell" },
  { number: 534, name: "The Fellowship of the Ring", affiliation: "Camelot" },
  { number: 856, name: "The Order of the Phoenix", affiliation: "Wanderland" },
  { number: 956, name: "ElectroWreckers", affiliation: "Oz" },
  { number: 981, name: "The Green slime club", affiliation: "Neverland" },
  { number: 2212, name: "The Spikes", affiliation: "Lod" },
  { number: 2468, name: "Even us", affiliation: "Avalon" },
  { number: 8846, name: "Syntax error", affiliation: "Matrix" }
].map(attrs => new Team(attrs))

exports.Team = Team
