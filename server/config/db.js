const mongoose = require("mongoose")

const connectdb = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_DB)
        console.log("Mongodb is connected")
    }
    catch(err){
        console.log(err.message)
        process.exit(1)
    }
}

module.exports=connectdb;