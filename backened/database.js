const mongoose = require('mongoose')
const mongoURI = 'mongodb://localhost:27017'

// mongoose return promises
const connectToMongo = async () => {
    mongoose.connect(mongoURI, () => {
        console.log("Connected to mongoose successfully");
        console.log("database directory")
    })
}

module.exports = connectToMongo;