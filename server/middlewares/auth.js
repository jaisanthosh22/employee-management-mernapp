const jwt = require("jsonwebtoken")

const auth = (req,res,next) =>{
    const authheader = req.headers.authorization
    if(!authheader){
        res.status(401).send("No token is provided")
    }
    const token = authheader.split(" ")[1]
    jwt.verify(token,process.env.ACCESS_SECRET,(err,decoded)=>{
        if(err){
            return res.status(401).send({error:err.message})
        }
        req.user=decoded
    })

    next()

}

module.exports = auth