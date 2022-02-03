const mongoose = require("mongoose");
require('dotenv').config();

const connectDB = (url) => {
    mongoose    
    .connect(url)
    .then(() => console.log(`connected to DB...`))
    .catch((err) => console.log(err))
}

connectDB(process.env.MONGO_URL);
module.exports = connectDB;