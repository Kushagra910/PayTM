const User = require("../models/user");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const Account = require("../models/account");
const dotenv = require("dotenv");
dotenv.config();

const signupSchema = zod.object({
  userName: zod.string(),
  firstName : zod.string(),
  lastName : zod.string(),
  password: zod.string()
})

const singinSchema = zod.object({
  userName:zod.string().email(),
  password:zod.string()
})
exports.signUp = async (req,res) => {
  try{

    const body = req.body;
    const {success} = signupSchema.safeParse(req.body);
    if(!success){
      return res.status(400).json({
        success:false,
        message:"Email already taken / Incorrect inputs"
      })
    }
    const existingUser = await User.findOne({
      userName: body.userName
    })

    if(existingUser){
      return res.status(200).json({
        success:false,
        message:"Email already taken / Incorrect inputs"
      })
    }

    const dbUser = await User.create({
      userName:body.userName,
      firstName:body.firstName,
      lastName:body.lastName,
      password:body.password
    });

    await Account.create({
      userId : dbUser._id,
      balance : 1 + Math.random()*10000
    })
    const token = jwt.sign({
      userId:dbUser._id
    },process.env.JWT_SECRET);

    res.status(200).json({
      success:true,
      message:"user created successfully",
      token:token
    })
  } catch(err){
    console.error(err);
    return res.status(500).json({
      success:false,
      messgae:"Error while signUp"
    })
  }
}

exports.signIn = async (req,res) => {
  try{
    const {success} = singinSchema.safeParse(req.body);
    if(!success){
      return res.status(400).json({
        message:"Incorrect inputs"
      })
    }

    const user = await User.findOne({
      userName:req.body.userName,
      password:req.body.password
    });

    if(user){
      const token = jwt.sign({
        userId:user._id,
      },process.env.JWT_SECRET);
     res.status(200).json({
        success:true,
        token:token
      })
    }
  } catch(err){
    return res.status(500).json({
      message:"Error while logging in"
    })
  }
}