const uuid = require('uuid/v1')

const areas = [
  { name: 'Learning', scores: [], trends: [] },
  { name: 'Speed', scores: [], trends: [] },
  { name: 'Codebase', scores: [], trends: [] },
]

module.exports.new = () => ({ id: uuid(), areas: [...areas] })
