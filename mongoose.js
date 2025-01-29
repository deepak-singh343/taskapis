const mongoose = require('mongoose');
require('dotenv').config(); 
// MongoDB connection URI
const uri =  process.env.MONGODB_URI || 'mongodb://localhost:27017/task_db';

// Connect to MongoDB with options
mongoose.connect(uri)

// Handle connection events
const db = mongoose.connection;

// Log connection errors
db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));

// Log successful connection
db.once('open', () => {
    console.log('Connected to MongoDB successfully!');
});
