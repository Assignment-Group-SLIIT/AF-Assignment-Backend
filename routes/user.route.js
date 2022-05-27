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
router.delete('/:email', userController.deleteUser);


module.exports = router;