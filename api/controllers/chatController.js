const Chat = require("../models/chat");

const getChatMessages = async (req, res) => {
    try {
      const messages = await Chat.find().sort({ createdAt: -1 });
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch chat messages" });
    }
  };

  const postChatMessage = async (req, res) => {
    const { userId, text, createdAt } = req.body;
  
    try {
      const message = new Chat({
        userId,
        text,
        createdAt,
      });
  
      await message.save();
      res.status(201).json(message);
    } catch (error) {
      res.status(500).json({ error: "Failed to send chat message" });
    }
  };

  module.exports = {
    getChatMessages,
    postChatMessage,
  };
