const Router = require('router')
const fs = require('fs')
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
const { MockCollectionServer, MockEntityServer } = require('@first-lego-league/synced-resources')

const router = Router()

const { Match } = require('../src/js/resources/match')
const { Settings } = require('../src/js/resources/settings')
const { Status } = require('../src/js/resources/status')
const { Table } = require('../src/js/resources/table')
const { Team } = require('../src/js/resources/team')

const MOCK_ENV = {
  "mhubUri": "ws://localhost:13900",
  "moduleTournamentUrl": "http://localhost:8080",
  "mhubNode": "default"
}

router.use(bodyParser.json({ limit: '50mb' }))
router.use(bodyParser.urlencoded({ extended: true }))

router.use(cors())

router.get('/environment.json', (req, res) => res.send(MOCK_ENV))

router.use('/matches', new MockCollectionServer(Match))
router.use('/settings', new MockEntityServer(Settings))
router.use('/status', new MockEntityServer(Status))
router.use('/status/next', (req, res) => res.status(200).json(Match.mockData.slice(0, req.query.limit || Match.mockData.length)))
router.use('/tables', new MockCollectionServer(Table))
router.use('/teams', new MockCollectionServer(Team))

exports.MockAPIRouter = router
