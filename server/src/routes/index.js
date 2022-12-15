const userRouter = require('./auth')
const movieRouter = require('./movie')

function routes (app) {
    app.use('/api/auth', userRouter)

    app.use('/api/movies', movieRouter)
}

module.exports = routes