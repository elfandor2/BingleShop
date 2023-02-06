const router = require('express').Router();
const { OrdersController } = require('../controllers/orders.controller');
const verifyToken = require('../helpers/decode.helper');
const loginAuth = require('../helpers/decode.helper');
const ordersController = new OrdersController


router.get('/orders', ordersController.getOrders)
router.post('/orders', loginAuth, ordersController.CreateOrder)
router.patch('/orders/:id', loginAuth, ordersController.PayOrder)


module.exports = router