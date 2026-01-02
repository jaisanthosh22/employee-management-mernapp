//using express

const express = require("express")
const dotenv = require("dotenv");
const connectdb = require("./config/db.js")

dotenv.config()
connectdb()

const app = express()


const port= process.env.PORT 
app.listen(port,()=>{
    console.log(`port is running sucessfully ${port}`)
})
