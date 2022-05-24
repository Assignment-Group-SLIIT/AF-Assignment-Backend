const express = require('express');
const router = express.Router();

let messageController = require('../controllers/message.controller');


router.post("/addmsg/", messageController.addMessage);
router.post("/getmsg/", messageController.getMessages);

module.exports = router;