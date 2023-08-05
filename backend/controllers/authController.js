const catchAsyncError = require('../middleware/catchAsyncError')
const User = require('../models/userModel');
const sendEmail = require('../utils/email');
const ErrorHandler = require('../utils/errorHandler');
const sendToken = require('../utils/jwt');
const crypto = require('crypto')

// registerUser
exports.registerUser = catchAsyncError(async (req,res,next)=>{
    const {name,email,password} = req.body

    let avatar;

    let BASE_URL = process.env.BACKEND_URL;
    if(process.env.NODE_ENV === "production"){
        BASE_URL = `${req.protocol}://${req.get('host')}`
    }

    if (req.file) {
        avatar = `${BASE_URL}/uploads/user/${req.file.originalname}`
    }
    const user = await User.create({
        name,
        email,
        password,
        avatar
    });

    sendToken(user,201,res)

})
// login user - /api/v1/login
exports.loginUser = catchAsyncError(async (req,res,next)=>{
    const {email,password} = req.body

    if (!email || !password) {
       return next(new ErrorHandler('please enter email & password',400))      
    }

    // finding the user database
    const user = await User.findOne({email}).select('+password')

    if (!user) {
        return next(new ErrorHandler('Invalid email or password',401))      
    }

    if (!await user.isValidPassword(password)) {
        return next(new ErrorHandler('Invalid email or password',401))      
    }

    sendToken(user,201,res)

})
// logout user - /api/v1/logout
exports.logoutUser = (req,res,next)=>{
    res.cookie('token',null,{
        expires: new Date(Date.now()),
        httpOnly:true
    })
    .status(200)
    .json({
        success:true,
        message:"Loggedout"
    })
}
// forgot user - /api/v1/password/forgot
exports.forgetPassword = catchAsyncError(async (req,res,next)=>{
    const user =  await User.findOne({email : req.body.email})

    if (!user) {
        next(new ErrorHandler('user not found with this email',404))
    }

    const resetToken = user.getResetToken();
    await user.save({validateBeforeSave:false})

    let BASE_URL = process.env.FRONTEND_URL;
    if(process.env.NODE_ENV === "production"){
        BASE_URL = `${req.protocol}://${req.get('host')}`
    }

    // create reset Url
    const resetUrl = `${BASE_URL}/password/reset/${resetToken}`

    const message = `your password reset url is as follows \n\n
    ${resetUrl} \n\n if you have not requseted this email, then ignore it.`

    try {
        
        sendEmail({
            email:user.email,
            subject:"AFLcart password recovery",
            message
        })
        
        res.status(200).json({
            success:true,
            message:`Email sent to ${user.email}`
        })

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpire = undefined;
        await user.save({validateBeforeSave:false})
        return next(new ErrorHandler(error.message),500)
    }
    
})

// reset user - /api/v1/password/reset/:token 
exports.resetPassword = catchAsyncError(async (req,res,next)=>{
    const resetPasswordToken =  crypto.createHash('sha256').update(req.params.token).digest('hex')

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordTokenExpire:{
            $gt :Date.now()
        }
    })

    if (!user) {
       return next(new ErrorHandler('password reset token is invalid or expire'))
    }
    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('password does not match'))
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpire = undefined;
    await user.save({validateBeforeSave:false})

    sendToken(user,201,res)
})

// get user profile - /api/v1/myprofile
exports.getUserProfile = catchAsyncError(async (req,res,next)=>{
    const user =  await User.findById(req.user.id)

    res.status(200).json({
        success:true,
        user
    })
})

// change password - /api/v1/password/change
exports.changePassword = catchAsyncError(async (req,res,next)=>{
    const user =  await User.findById(req.user.id).select('+password')

    // check old password
    if (! await user.isValidPassword(req.body.oldPassword)) {
        next(new ErrorHandler('old password is incorrect',401));
    }
    // assigning new password
    user.password = req.body.oldPassword;
    await user.save();
    res.status(200).json({
        suceess:true,
    })
})

// update profile
exports.updateProfile = catchAsyncError(async (req,res,next)=>{
    let  newUserData = {
        name : req.body.name,
        email:req.body.email
    }

    let avatar;
    let BASE_URL = process.env.BACKEND_URL;
    if(process.env.NODE_ENV === "production"){
        BASE_URL = `${req.protocol}://${req.get('host')}`
    }

    if (req.file) {
        avatar = `${BASE_URL}/uploads/user/${req.file.originalname}`
        newUserData = {...newUserData,avatar}
    }

   const user =  await User.findByIdAndUpdate(req.user.id , newUserData ,{
        new:true,
        runValidators:true
    })
    res.status(200).json({
        success:true,
        user
    })
})

// Admin : Get  All Users - /api/v1/admin/users
exports.getAllUser = catchAsyncError(async (req,res,next)=>{
    const users =  await User.find();
    res.status(200).json({
        success:true,
        users
    })
})
//Admin:Get Spacific Users - /api/v1/admin/user/:id
exports.getUser = catchAsyncError(async (req,res,next)=>{
    const user = await User.findById(req.params.id);

    if (!user) {
       return next(new ErrorHandler(`user not found with id ${req.params.id} `))
    }
    res.status(200).json({
        success:true,
        user
    })
})
// Admin:Update User - /api/v1/admin/user/:id
exports.updateUser = catchAsyncError(async (req,res,next)=>{
    const newUserData = {
        name : req.body.name,
        email:req.body.email,
        role:req.body.role
    }
    const user = await User.findByIdAndUpdate(req.params.id,newUserData,{
        new:true,
        runValidators:true
    })
    res.status(200).json({
        success:true,
        user
        
    })
})
// Admin:Delete user - /api/v1/admin/user/:id
 exports.deleteUser = catchAsyncError(async (req,res,next)=>{
    const user = await User.findById(req.params.id)
    
    if (!user) {
        return next(new ErrorHandler(`user not found with id ${req.params.id} `))
    }
    await user.deleteOne()
    res.status(200).json({
        success:true,
    })
 })
