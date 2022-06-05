const express = require('express')

const OrderCtrl = require('../controllers/order.controller');
const {createOrder, getAllOrder, getOrder, getUserLearingOrder, updateOrder, deleteOrder} = OrderCtrl;
const router = express.Router()

router.post('/order', createOrder);
router.get('/orders/', getAllOrder);
router.get('/order/:id', getOrder);
router.get('/order/userprogram/:id', getUserLearingOrder);
router.put('/order', updateOrder);
router.delete('/order', deleteOrder);


module.exports = router;