// const express = require('express')
// const cors = require('cors')
// const connectDb = require("./db");
// const app = express()


// app.use(express.json())
// app.use(cors())

// app.use('/', require('./routes/userRouter'))

// connectDb();


// const PORT = process.env.PORT || 5000
// app.listen(PORT,()=>{
//     console.log('Server is running on port',PORT)
// })



// server.js
const express = require('express');
const cors = require('cors');
const { connectDb, disconnectDb } = require("./db");

const app = express();

app.use(express.json());
app.use(cors());

app.use('/', require('./routes/userRouter'));

// Connect to the database
connectDb();

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});

// Graceful shutdown function
const gracefulShutdown = async (signal) => {
  console.log(`${signal} received. Shutting down gracefully...`);
  server.close(async () => {
    console.log("Closing server...");
    await disconnectDb();
    process.exit(0);
  });
};

// Handle termination signals
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
