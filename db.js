const mongoose = require('mongoose'); //mongoose improt

//Define the mongoDB connection URl
const mongoURL = 'mongodb://localhost:27017/hotels' // Replace 'mydatabase' with your database name


mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// get the default connection
//Mongoose maintains a default connection object representing the MongoDB connection
const db = mongoose.connection;

//Define event listeners for database connection

db.on('connected', () => {
    console.log('Connected to MongoDB server');
});

db.on('error', (err) => {
    console.error('MongoDB connection error:',err);
});

db.on('disconnected', () => {
    console.log('MongoDB Disconnected');
});

//Export the Database connection
module.exports = db;