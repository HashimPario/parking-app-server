// const mongoose = require("mongoose");



// const connectDb = () => {
//     mongoose
//   .connect(
//     process.env.MONGO_URI ||
//     "mongodb+srv://hashimpario:Hashim123@cluster0.goaqtkk.mongodb.net/parkingapp?retryWrites=true&w=majority&appName=Cluster0",
      
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     }
//   )
//   .then(() => {
//     console.log("MongoDb Connected!");
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });
// }

// module.exports = connectDb;



// db.js
const mongoose = require("mongoose");

// Securely get the MongoDB URI from environment variables
const mongoURI = process.env.MONGO_URI || "your-default-mongo-uri-here";

const connectDb = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      poolSize: 10, // Adjust the pool size as needed
    });
    console.log("MongoDB Connected!");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
  }
};

const disconnectDb = async () => {
  try {
    await mongoose.disconnect();
    console.log("MongoDB Disconnected!");
  } catch (err) {
    console.error("Error disconnecting from MongoDB:", err.message);
  }
};

module.exports = { connectDb, disconnectDb };
