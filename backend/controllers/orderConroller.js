const catchAsyncError = require('../middleware/catchAsyncError')
const Order = require('../models/orderModel')
const Product  = require('../models/productModel')
const ErrorHandler = require('../utils/errorHandler')

// create new order - /api/v1/order/new
exports.newOrder = catchAsyncError(async (req,res,next)=>{
    const {
        shippingInfo,
        orderItems,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
    } = req.body

    const order = await Order.create({
        shippingInfo,
        orderItems,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt:Date.now(),
        user:req.user.id
    })
    res.status(200).json({
        success:true,
        order
    })

})

// get single order - /api/v1/order/:id
exports.getSingleOrder = catchAsyncError(async (req,res,next)=>{
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler(`Order not found with this id :${req.params.id}`,404))
    }
    res.status(200).json({
        success:true,
        order
    })
})

//Get Loggeding User Orders - /api/v1/myorders
exports.myOrders = catchAsyncError(async (req,res,next)=>{
    const orders =  await Order.find({user:req.user.id})

    res.status(200).json({
        success:true,
        orders
    })
})

// Admin: Get All Orders - /api/v1/orders
exports.orders = catchAsyncError(async (req,res,next)=>{
    const orders =  await Order.find()

    let totelAmount = 0
    orders.forEach(order => {
        totelAmount += order.totelPrice
    });

    res.status(200).json({
        success:true,
        totelAmount,
        orders
    })
})

// Admin : Update Order / order status - /api/v1/order:id
exports.updateOrder = catchAsyncError(async (req,res,next)=>{
    const order =  await Order.findById(req.params.id)

    if (order.orderStatus == 'Delivered') {
        return next(new ErrorHandler('Order has been all ready deliverd!',400))
    }
    // updating the product stock of each item
    order.orderItems.forEach(async orderItems => {
        await updateStock(orderItems.product,orderItems.quantity)
    });

    order.orderStatus = req.body.orderStatus;
    order.deliverdAt = Date.now()
    order.save();

    res.status(200).json({
        success:true
    })
})

async function updateStock (productId,quantity){
    const product = await Product.findById(productId);
    product.stock = product.stock - quantity;
    product.save({validateBeforeSave: false})
}

// Admin : Delete Order - /api/v1/order/:id
exports.deleteOrder = catchAsyncError(async (req,res,next) =>{
   const order =  await Order.findById(req.params.id)


   if (!order) {
    return next(new ErrorHandler(`Order not found with this id :${req.params.id}`,404))
    }

    await order.deleteOne();

    res.status(200).json({
        success:true
    })
})