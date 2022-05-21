const express = require('express');
const router = express.Router();

let groupController = require('../controllers/group.controller');


router.post('/',groupController.createGroup)
router.get('/',groupController.getAllGroup)
router.delete('/:id' ,groupController.removeGroup)
router.get('/:id',groupController.getOneGroup)

module.exports = router;