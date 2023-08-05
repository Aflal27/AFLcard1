const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const userShema = new mongoose.Schema({
    name: {
        type:String,
        required:[true,"please Enter Name"]
    },
    email:{
        type:String,
        required:[true,"Please Enter Email"],
        unique:true,
        validate:[validator.isEmail,"please enter valid email"]
    },
    password:{
        type:String,
        required:[true,"please password enter"],
        maxlength:[6,"password cannot exceed 6 characters"],
        select:false
    },
    avatar:{
        type:String,
       
    },
    role:{
        type:String,
        default:'user'
    },
    resetPasswordToken:String,
    resetPasswordTokenExpire:Date,
    createAt:{
        type:Date,
        default:Date.now
    }
})

userShema.pre('save', async  function(next){
    if (!this.isModified('password')) {
        next()
    }
    this.password = await bcrypt.hash(this.password,10)
})

userShema.methods.getJwtToken = function(){
    return jwt.sign({id:this.id}, process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_TIME
    })
}

userShema.methods.isValidPassword = async function(enterdpassword){
    return bcrypt.compare(enterdpassword,this.password)
}

userShema.methods.getResetToken = function(){
    // Generate Token
    const token =  crypto.randomBytes(20).toString('hex');

    // Generate hash and set resetpasswordtoken
    this.resetPasswordToken =  crypto.createHash('sha256').update(token).digest('hex');

    // set token expire time
    this.resetPasswordTokenExpire = Date.now() + 30 * 60 * 1000;

    return token;
}

let model = mongoose.model('User',userShema)
module.exports = model;