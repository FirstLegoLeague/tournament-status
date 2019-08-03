const Router = require('router')
const fs = require('fs')
const path = require('path')
const cors = require('cors')

const router = Router()

const STAGE = 'qualification'

function mockResponses () {
  const res = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'responses.json'), 'utf8'))
  res.matches.forEach(match => {
    match.startTime = new Date(match.startTime)
    match.endTime = new Date(match.endTime)
  })
  return res
}

router.use(cors())

router.get('/environment.json', (req, res) => {
  const responses = mockResponses()
  res.send(responses.env)
})

router.get('/settings/tournamentStage', (req, res) => {
  res.send(STAGE)
})

router.get('/table/all', (req, res) => {
  const responses = mockResponses()
  res.send(responses.tables)
})

router.get('/match/current', (req, res) => {
  const responses = mockResponses()
  res.send(responses.matches[0])
})

router.get('/match/upcoming/:count', (req, res) => {
  const responses = mockResponses()
  res.send(responses.matches.slice(1, 3))
})

router.get('/match/upcoming', (req, res) => {
  const responses = mockResponses()
  res.send(responses.matches.slice(1, 2))
})

exports.MockAPIRouter = router
