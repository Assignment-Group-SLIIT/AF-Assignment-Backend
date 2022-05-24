const Message = require("../models/message.model");

const getMessages = async (req, res, next) => {
    try {
      const { from, to } = req.body;
      const messages = await Message.find({
        users: {
          $all: [from, to],
        },
      }).sort({ updatedAt: 1 });
  
      const projectedMessages = messages.map((msg) => {
        return {
          fromSelf: msg.sender.toString() === from,
          message: msg.message.text,
        };
      });
      res.json(projectedMessages);
    } catch (ex) {
      next(ex);
    }
  };
  
const addMessage = async (req, res, next) => {
    try {
      const { 
          users, 
          sender, 
          message 
        } = req.body;
      
      const response = await Message.create({
        message: { text: message },
        users,
        sender,
      });
      
      if (response) return res.json({ msg: "Message added successfully." });
      else return res.json({ msg: "Failed to add message to the database" });
    } catch (ex) {
      next(ex);
    }
  };
  
  module.exports ={
      getMessages,
      addMessage
  }