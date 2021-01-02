const mongoose = require('mongoose');

const connectDB = async () => {
    const conn = await mongoose.connect("mongodb://localhost:27017/urlshort", {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });
    console.log(`MongoDb connected: ${conn.connection.host}`);
}


module.exports = connectDB;
