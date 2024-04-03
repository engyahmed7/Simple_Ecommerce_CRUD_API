const router = require('express').Router()
const userController = require('../controller/user.controller')
const {validateUser} = require('../middleware/validate')

router.get('/' , userController.getAllUsers)

router.get('/:id' , userController.getUserById)

router.post('/' ,validateUser, userController.addUser)

router.post('/login', userController.loginUser)

router.put('/:id' , userController.updateUser)

router.delete('/:id' , userController.deleteUser)

module.exports  = router