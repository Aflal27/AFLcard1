const express = require('express')
const multer = require('multer');
const path = require('path')

const upload = multer({storage: multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join( __dirname,'..' , 'uploads/user' ) )
    },
    filename: function(req, file, cb ) {
        cb(null, file.originalname)
    }
}) })

const { registerUser, 
    loginUser, 
    logoutUser, 
    forgetPassword, 
    resetPassword, 
    getUserProfile, 
    changePassword, 
    updateProfile,
    getAllUser,
    getUser,
    updateUser,
    deleteUser
} = require('../controllers/authController')

const router = express.Router()
const {isAuthenticate, authorizeRole} = require('../middleware/authencate')

router.route('/register').post(upload.single('avatar') ,registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(logoutUser)
router.route('/password/forgot').post(forgetPassword)
router.route('/password/reset/:token').post(resetPassword)
router.route('/password/change').put(isAuthenticate,changePassword)
router.route('/myprofile').get(isAuthenticate,getUserProfile)
router.route('/update').put(isAuthenticate, upload.single('avatar'), updateProfile)

// Admin route
router.route('/admin/users').get(isAuthenticate,authorizeRole('admin'),getAllUser)
router.route('/admin/user/:id') .get(isAuthenticate,authorizeRole('admin'),getUser)
                                .put(isAuthenticate,authorizeRole('admin'),updateUser)
                                .delete(isAuthenticate,authorizeRole('admin'),deleteUser)



module.exports = router