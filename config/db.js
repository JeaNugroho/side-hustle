require("dotenv").config();
const mongoose = require("mongoose");
// const config = require("config");
const db = process.env.MONGOURI;

const connectDB = async () => {
    try {

        mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

        console.log("MongoDB Connected...");

    } catch (err) {

        console.log("err.message");

        // Exit process with failure
        process.exit(1);

    }
}

module.exports = connectDB;