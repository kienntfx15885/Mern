
const Movie = require('../../resources/models/Movie')

const MovieController = {
    show: function (req, res, next) {
        Movie.find({})
            .then(movies => {
                res.send(movies)
            })
            .catch(next)
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
    }
}

module.exports = MovieController