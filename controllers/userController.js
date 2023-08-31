const User = require("../models.js/userModel")
const bcrypt = require('bcrypt')
const { generateToken, getResetToken } = require("../tokens/jwt")
const { sendMail } = require("../tokens/nodemail")

//users sign up
exports.signup = async(req, res)=>{
    try {
        const {email,name,password} = req.body
        let user = await User.findOne({email})
        if(user){
            return res.status(400).json({message:'Given email id already exsits'})
        }

        const salt =await bcrypt.genSalt(10)
        const hashedPassword =await bcrypt.hash(password,salt)
        user= await User.create({
                name,
                email,
                password:hashedPassword
        })

        const token = generateToken(user._id,user.role,user.name)
        res.status(200).json({
            message:"signup successfully",
            token,
            user:user.name
        }) 

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:'Internal server error', error})
    }
}

//users login
exports.login = async(req, res)=>{
    try {
        const {email} = req.body
        //is email valid
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:'user email or password not valid'})
        }

        //is password valid
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        )
        if(!validPassword){
            return  res.status(200).json({message:'user email or password not valid'})
         }
         //generate token for exsiting user
         const token = generateToken(user._id)
         res.status(200).json({
            message:"login successfully",
            token,
            user:user.name
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:'Internal server error', error})
    }
}

//password reset 
exports.forgotPassword = async(req, res)=>{
    try {
        const user = await User.findOne({email:req.body.email})
        if(!user){
            return res.status(400).json({message:'user not found'})
        }

        //create &save the password reset token
        const resetToken = getResetToken(user)
        await user.save();

        //create the resetpasword url
        const resetUrl = `https://3000/reset/password${resetToken}`

        const message = `Your password reset url is as follows \n\n 
        ${resetUrl} \n\n If you have not requested this email, then ignore it.`;

        //nodemailer
        sendMail({
            email:user.email,
            subject:'Reset Password',
            message
        })
        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email}`
        })
    

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:'Internal server error', error})
    }
}