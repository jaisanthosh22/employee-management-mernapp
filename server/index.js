//using express

const express = require("express")
const dotenv = require("dotenv");
const connectdb = require("./config/db.js")
const authRoutes = require("./route/authRoutes.js")
const userRoutes = require("./route/userRoute.js")
const adminRoutes = require("./route/adminRoutes.js")

dotenv.config()
connectdb()

const app = express()
app.use(express.json())

//routes
app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/user",userRoutes)
app.use("/api/v1/admin",adminRoutes)
    


const port= process.env.PORT 
app.listen(port,()=>{
    console.log(`port is running sucessfully ${port}`)
})
