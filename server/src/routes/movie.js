const express = require('express')
const router = express.Router()
const movieController = require('../app/controllers/MovieController')

router.get('/', movieController.show)

module.exports = router