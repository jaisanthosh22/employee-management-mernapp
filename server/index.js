//using express

const express = require("express")
const dotenv = require("dotenv");
const connectdb = require("./config/db.js")
const authRoutes = require("./route/authRoutes")

dotenv.config()
connectdb()

const app = express()
app.use(express.json())

//routes
app.use("/api/v1/auth",authRoutes)



const port= process.env.PORT 
app.listen(port,()=>{
    console.log(`port is running sucessfully ${port}`)
})
