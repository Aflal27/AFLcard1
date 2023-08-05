const express = require('express');
const { getProducts, newProduct, getSingleProducts, updateProducts, deleteProduts, createReview, getReviews, deleteReview, getAdminProducts } = require('../controllers/productController');
const router = express.Router();
const {isAuthenticate, authorizeRole} = require('../middleware/authencate')
const multer = require('multer');
const path = require('path')

const upload = multer({storage: multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join( __dirname,'..' , 'uploads/product' ) )
    },
    filename: function(req, file, cb ) {
        cb(null, file.originalname)
    }
}) })

router.route('/products').get( getProducts);
router.route('/product/:id')
                                .get(getSingleProducts)
                                // .put(updateProducts)
                                // .delete(deleteProduts)

router.route('/review').put(isAuthenticate,createReview)  
                       
                              

// Admin route
router.route('/admin/products/new').post(isAuthenticate,authorizeRole('admin'),upload.array('images'),newProduct);
router.route('/admin/products').get(isAuthenticate,authorizeRole('admin'),getAdminProducts)
router.route('/admin/products/:id').delete(isAuthenticate,authorizeRole('admin'),deleteProduts)
router.route('/admin/products/:id').put(isAuthenticate,authorizeRole('admin'),upload.array('images'),updateProducts)
router.route('/admin/reviews').get(isAuthenticate, authorizeRole('admin'),getReviews)
router.route('/admin/review').delete(isAuthenticate, authorizeRole('admin'),deleteReview)



module.exports = router;