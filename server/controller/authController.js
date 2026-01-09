const User = require("../models/User")
const bcrypt= require("bcrypt")
const jwt = require("jsonwebtoken")
const { MdToken } = require("react-icons/md")

const generateAccessToken=(user)=>{
  return jwt.sign({id:user._id,role:user.role},process.env.ACCESS_SECRET,{expiresIn:"15m"})
}

const generateRefreshToken=(user)=>{
  return jwt.sign({id:user._id,role:user.role},process.env.REFRESH_SECRET,{expiresIn:"7d"})
}

//register logic

const register = async(req,res)=>{ 

  try{
    const {email,password,role}=req.body 
    if(!email ||!password || !role){
      return res.status(422).send("all the fields must required")
    }

     // Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(401).send("Email already registered");
    }

     const hashedpassword = await bcrypt.hash(password,10)
     
    const user = await  User.create({email,password:hashedpassword,role})


     res.status(201).json({
        success: true,
        message: "successfully registered",
        user,
        
      })
  }
  
  catch(err){
     res.status(404).send(err.message)
  }
}

//login 


const login = async(req,res)=>{ 

  try{
    const {email,password,role} = req.body

    if(!email ||!password || !role){
      return res.status(400).send("all the fields are required")
    }
    const user = await User.findOne({email})
    if(!user){
      return res.status(401).send("Invalid credentials")
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        return res.status(401).send("wrong password-Invalid credentials")
    }
  
    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)


   res.status(200).json({
      success: true,
      message: "Successfully logged in",
      accessToken,
      refreshToken
    })  }

   
  catch(err){
         res.status(404).send(err.message)
  }
}
const refresh = (req,res)=>{
    const {refreshToken} = req.body
    if(!refreshToken) return res.status(401).send("refresh token missing")
    jwt.verify(refreshToken,process.env.REFRESH_SECRET,(err,decoded)=>{
    if(err) return res.status(401).send({error:err.message})
    const newToken = generateAccessToken({
        id:decoded.id,
        role:decoded.role
    })
    return res.json({accessToken:newToken})
    })
  }
module.exports= {register,login,refresh}