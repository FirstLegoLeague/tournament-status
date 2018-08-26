const express = require('express')
const fs = require('fs')
const path = require('path')
const cors = require('cors')
const router = express.Router()

const PORT = 3000
//const STAGE = 'qualification'

function mockResponses() {
	return JSON.parse(fs.readFileSync(path.resolve(__dirname, 'responses.json'), 'utf8'))
}

router.use(cors())

router.get('/environment.json', (req, res, next) => {
	let responses = mockResponses()
	res.send(responses.env)
})

// router.get('/settings/tournamentTitle', (req, res, next) => {
// 	let responses = mockResponses()
// 	res.send(responses.title)
// })

// router.get('/image/all', (req, res, next) => {
// 	let responses = mockResponses()
// 	res.send(responses.logos)
// })

// router.get('/rankings.json', (req, res, next) => {
// 	let responses = mockResponses()
// 	res.send(responses.rankings[STAGE])
// })

// router.use('/images', express.static(path.resolve(__dirname, 'images')))

router.use(express.static(path.resolve(__dirname, '../dist')))

exports.MockAPIRouter = router