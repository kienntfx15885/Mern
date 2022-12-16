const mongoose = require('mongoose')
const Schema = mongoose.Schema
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const MovieSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxLength: 255
    },
    description: {
        type: String
    },
    videoId: {
        type: String,
    }, 
    image: {
        type: String,
    },
    studio: {
        type: String,
        enum: ['MARVEL', 'DC', 'ANIME']
    },
    slug: {
        type: String,
        slug: "name",
        unique: true
    }, 
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('movies', MovieSchema)