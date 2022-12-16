const express = require('express')
const router = express.Router()
const movieController = require('../app/controllers/MovieController')
const verifyToken = require('../middleware/auth')

router.post('/store', verifyToken, movieController.store)

router.get('/', movieController.show)

module.exports = router