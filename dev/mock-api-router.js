const express = require('express')
const fs = require('fs')
const path = require('path')
const cors = require('cors')
const router = express.Router()


function mockResponses() {
	return JSON.parse(fs.readFileSync(path.resolve(__dirname, 'responses.json'), 'utf8'))
}

router.use(cors())

router.get('/environment.json', (req, res, next) => {
	let responses = mockResponses()
	res.send(responses.env)
})

// router.use(express.static(path.resolve(__dirname, '../dist')))

exports.MockAPIRouter = router
