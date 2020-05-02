const { FieldsModel } = require('@first-lego-league/synced-resources')

class Table extends FieldsModel {
  fields () {
    return Table.FIELDS
  }
}

Table.FIELDS = [
  { key: '_id', type: String, defaultValue: undefined },
  { key: 'name', type: String, defaultValue: '', required: true }
]

Table.mockData = [
  { _id: 1, name: 'table1' },
  { _id: 2, name: 'table2' },
  { _id: 3, name: 'table3' },
  { _id: 4, name: 'table4' },
  { _id: 5, name: 'table5' },
  { _id: 6, name: 'table6' },
  { _id: 7, name: 'table7' },
  { _id: 8, name: 'table8' }
].map(attrs => new Table(attrs))

exports.Table = Table
