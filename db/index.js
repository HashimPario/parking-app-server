const mongoose = require("mongoose");



const connectDb = () => {
    mongoose
  .connect(
    process.env.MONGO_URI ||
    "mongodb+srv://hashimpario:Hashim123@cluster0.goaqtkk.mongodb.net/parkingapp?retryWrites=true&w=majority&appName=Cluster0",
      
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("MongoDb Connected!");
  })
  .catch((err) => {
    console.log(err.message);
  });
}

module.exports = connectDb;