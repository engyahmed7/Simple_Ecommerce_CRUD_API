const router = require('express').Router()
const itemController = require('../controller/item.controller')
const {validateItem} = require('../middleware/validate')


router.post('/' ,validateItem,itemController.addItem )
router.get('/' ,itemController.getAllItems)
router.get('/:id' ,itemController.getItemById)
router.put('/:id' ,itemController.updateItem)
router.delete('/:id' ,itemController.deleteItem)

module.exports  = router