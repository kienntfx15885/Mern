require('dotenv').config();

const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

async function connect() {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@movies-trailer.ohcumnp.mongodb.net/?retryWrites=true&w=majority`,
        );
        console.log('Connect Successfully');
    } catch (err) {
        console.log(err.message);
    }
}

module.exports = { connect };
