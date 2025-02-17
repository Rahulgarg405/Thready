const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("DB Connected.....");
}

module.exports = connectDB;