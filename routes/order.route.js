const router = require('express').Router()
const orderController = require('../controller/order.controller')
const {validateOrder} = require('../middleware/validate')


router.post('/:id',validateOrder, orderController.addNewOrders)

router.get('/' ,orderController.getAllOrders);

router.get('/:id' ,orderController.getOrderById)

router.delete('/:id' ,orderController.deleteOrder)

router.put('/:id' ,orderController.updateOrder)

module.exports  = router