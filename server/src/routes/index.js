const userRouter = require('./auth')

function routes (app) {
    app.use('/api/auth', userRouter)
}

module.exports = routes