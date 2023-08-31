const jwt = require('jsonwebtoken');
const crypto = require('crypto')

exports.generateToken = (id,role,name)=>{
    const token = jwt.sign(
        {id,role,name},
        process.env.SECRET_KEY,
        {expiresIn:process.env.SECRET_KEY_EXPIRE}
    )
    return token
}

exports.getResetToken = (user)=>{
    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = crypto.createHash('shs256').update(token).digest('hex');
    user.resetPasswordTokenExpire = Date.now() + 30*60*1000;
    return token;
}