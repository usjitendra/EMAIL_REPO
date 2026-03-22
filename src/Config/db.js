const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = async () => {
  try {
    // console.log("Connecting to the database...");

    const envUrl = process.env.MONGO_URI || "mongodb://localhost:27017/ca_task_manager";
    const options = {
      // You can add options like useNewUrlParser, useUnifiedTopology, etc.
    };

    await mongoose.connect(envUrl, options);
    console.log("Connected to the database.");
    return mongoose.connection;
  } catch (error) {
    console.error(`Database connection error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
