const express = require('express')
const router = express.Router()
const movieController = require('../app/controllers/MovieController')
const verifyToken = require('../app/middleware/auth')

router.post('/store', verifyToken, movieController.store)

router.put('/:_id', verifyToken, movieController.update)

router.get('/', verifyToken, movieController.show)

module.exports = router