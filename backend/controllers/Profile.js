const User = require("../models/user");
const zod = require("zod");

const updatedSchema = zod.object({
  firstName:zod.string().optional(),
  lastName : zod.string().optional(),
  password:zod.string().optional()
})


exports.updateProfile = async(req,res) => {
  try{
    const {success} = updatedSchema.safeParse(req.body);
    if(!success){
      return res.status(400).json({
        message:"Error while updating information"
      })
    }
    await User.updateOne({
      _id:req.userId
    },req.body);
     res.status(200).json({
      success:true,
      message:"Profile Updated successfully"
    })
  }catch(err){
    return res.status(500).json({
      success:false,
      message:"profile update failed,try again"
    })
  }
}

exports.getMatchingUsers = async(req,res)=>{
  try{
    const filter = req.query.filter || "";
    console.log(req.query.filter);
    const users = await User.find({
      $or : [{
        firstName : {
          "$regex" : filter,
          // "$options" : "i"
        }
      }, {
        lastName : {
          "$regex" : filter,
          // "$options" : "i"
        }
      }]
    })
    console.log(users);
  
     res.status(200).json({
      success:true,
      user : users.map(user=>({
        userName:user.userName,
        firstName : user.firstName,
        lastName : user.lastName,
        _id : user._id
      }))
    })
  } catch(err){
    return res.status(500).json({
      success:false,
      message:"Can't find user with this input query"
    })
  }
}