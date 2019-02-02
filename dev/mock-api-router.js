const express = require('express')
const fs = require('fs')
const path = require('path')
const cors = require('cors')
const router = express.Router()

const STAGE = 'qualification'

function mockResponses() {
	const res = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'responses.json'), 'utf8'))
	res.matches.forEach(match => {
		match.startTime = new Date(match.startTime)
		match.endTime = new Date(match.endTime)
	})
	return res
}

router.use(cors())

router.get('/environment.json', (req, res, next) => {
	let responses = mockResponses()
	res.send(responses.env)
})

router.get('/settings/tournamentStage', (req, res, next) => {
	res.send(STAGE)
})

router.get('/table/all', (req, res, next) => {
	let responses = mockResponses()
	res.send(responses.tables)
})

router.get('/match/current', (req, res, next) => {
	let responses = mockResponses()
	res.send(responses.matches[0])
})

router.get('/match/upcoming/:count', (req, res, next) => {
	let responses = mockResponses()
	res.send(responses.matches.slice(1, req.params.count + 1))
})

router.get('/match/upcoming', (req, res, next) => {
	let responses = mockResponses()
	res.send(responses.matches.slice(1, 2))
})

router.use(express.static(path.resolve(__dirname, '../dist')))

exports.MockAPIRouter = router
