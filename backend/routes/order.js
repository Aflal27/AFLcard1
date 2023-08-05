const express = require('express');
const { newOrder, getSingleOrder, myOrders, orders, updateOrder, deleteOrder } = require('../controllers/orderConroller');
const router = express.Router();
const {isAuthenticate, authorizeRole} = require('../middleware/authencate')

router.route('/order/new').post(isAuthenticate,newOrder)
router.route('/order/:id').get(isAuthenticate,getSingleOrder)
router.route('/myorders').get(isAuthenticate,myOrders)


// Admin routes
router.route('/admin/orders').get(isAuthenticate,authorizeRole('admin'),orders)
router.route('/admin/order/:id')  .put(isAuthenticate,authorizeRole('admin'),updateOrder)
                            .delete(isAuthenticate,authorizeRole('admin'),deleteOrder)
module.exports = router