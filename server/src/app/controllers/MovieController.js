
const Movie = require('../../resources/models/Movie')

const MovieController = {
    show: async function (req, res, next) {
        try {
            const movies = await Movie.find({user: req.userId}).populate('user', ['username'])
            res.json({success: true, movies})
        } catch (err) {
            console.log(err)
            res.status(500).json({success: false, message: 'Internal server error'})
        }
    },

    store: async function (req, res) {
        const {name, description, videoId, image, studio} = req.body

        // Simple validation
        if (!name) {
            return res.status(400).json({success: false, message: 'Name is required'})
        }

        try {
            const newMovie = new Movie({
                name,
                description,
                videoId,
                image,
                studio: studio || 'MARVEL',
                user: req.userId
            })

            await newMovie.save()

            res.json({success: true, message: 'Happy watch', movie: newMovie})
        } catch (err) {
            console.log(err)
            res.status(500).json({success: false, message: 'Internal server error'})
        }
    },

    update: async function (req, res) {
        const {name, description, videoId, image, studio} = req.body

        // Simple validation
        if (!name) {
            return res.status(400).json({success: false, message: 'Name is required'})
        }

        try {
            let updatedMovie = {
                name,
                description: description || '',
                videoId,
                image,
                studio: studio || 'MARVEL',

            }

            const movieUpdateCondition = {_id: req.params._id, user: req.userId}

            updatedMovie = await Movie.findOneAndUpdate(movieUpdateCondition, updatedMovie, {updated: true})

            // User not authorized to update movie or movie not found
            if (!updatedMovie) {
                return res.status(401).json({success: false, message: 'Movie not found or user not authorize'})
            }

            res.json({success: true, message: 'Excellent progress', movie: updatedMovie})
        } catch (err) {
            console.log(err)
            res.status(500).json({success: false, message: 'Internal server error'})
        }
    }
}

module.exports = MovieController