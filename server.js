const express = require('express')
const cors = require('cors')
const connectDb = require("./db");
const app = express()


app.use(express.json())
app.use(cors())

//Routes
app.use('/', require('./routes/userRouter'))

// Database Connection
connectDb();

// app.use('/',(req,res,next)=>{
//     res.json({msg: "Hello World"})
//     console.log("hello")
// })

const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log('Server is running on port',PORT)
})