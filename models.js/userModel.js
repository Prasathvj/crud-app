const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        requitrd:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    avatar:{
        type:String
    },
    role :{
        type:Number,
        default:2
    },
    resetPasswordToken: String,
    resetPasswordTokenExpire: Date,
    createdAt :{
        type: Date,
        default: Date.now
    }

})

const User = mongoose.model('User',userSchema);

module.exports = User;