const express = require('express');

const router = express.Router();

let userController = require('../controllers/user.controller')


router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/', userController.getAllUsers);
router.get('/name/:name', userController.searchName);
router.get('/:email', userController.getOneUser);
router.put('/:email', userController.updateUser);
router.put('/:email/:pwd', userController.updateUserPassword);
router.put('/supervisor/:name/:supervisor', userController.updateSupervisor);
router.put('/co/supervisor/:name/:cosupervisor', userController.updateCoSupervisor);
router.delete('/:email', userController.deleteUser);
router.get('/allusers/:id/:groupId', userController.getAllUsersChat)


module.exports = router;