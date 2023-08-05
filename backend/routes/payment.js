const express = require('express');
const router = express.Router();
const {isAuthenticate} = require('../middleware/authencate');
const { processPayment, sendStripeApi } = require('../controllers/paymentConroller');

router.route('/payment/process').post(isAuthenticate,processPayment)
router.route('/stripeapi').get( isAuthenticate, sendStripeApi);

module.exports = router