const express = require('express')
const router = express.Router()
const userController = require('../app/controllers/UserController')

router.get('/register', userController.register)

module.exports = router