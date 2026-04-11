const mongoose = require("mongoose");
const mongoURI = process.env.MONGO_URI

const connectDB = async()=> await mongoose.connect(mongoURI);

module.exports = connectDB;
