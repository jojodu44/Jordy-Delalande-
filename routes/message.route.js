// backend/routes/message.route.js
const express = require("express");
const mongoose = require("mongoose");
const Message = require("../models/Message");
const User = require("../models/User");
const { protect } = require("../middleware/auth"); // ✅ Import correct

const router = express.Router();

/**
 * Envoyer un message
 * POST /api/messages
 * body: { recipient: "<userId>", content: "texte" }
 */
router.post("/", protect, async (req, res) => {
  try {
    const { recipient, content } = req.body;
    if (!recipient || !content)
      return res.status(400).json({ message: "recipient and content required" });

    const message = await Message.create({
      sender: req.user.id,
      recipient,
      content,
    });

    const populated = await Message.findById(message._id)
      .populate("sender", "name")
      .populate("recipient", "name");

    res.status(201).json(populated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * Récupérer conversation avec un autre utilisateur
 * GET /api/messages/conversation/:otherUserId
 */
router.get("/conversation/:otherUserId", protect, async (req, res) => {
  try {
    const me = req.user.id;
    const other = req.params.otherUserId;

    const messages = await Message.find({
      $or: [
        { sender: me, recipient: other },
        { sender: other, recipient: me },
      ],
    })
      .sort({ createdAt: 1 })
      .populate("sender", "name")
      .populate("recipient", "name");

    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * Lister les conversations (liste des utilisateurs avec qui j'ai échangé)
 * GET /api/messages/conversations
 */
router.get("/conversations", protect, async (req, res) => {
  try {
    const me = req.user.id;

    const agg = await Message.aggregate([
      { $match: { $or: [{ sender: mongoose.Types.ObjectId(me) }, { recipient: mongoose.Types.ObjectId(me) }] } },
      {
        $project: {
          other: { $cond: [{ $eq: ["$sender", mongoose.Types.ObjectId(me)] }, "$recipient", "$sender"] },
          content: 1,
          createdAt: 1,
        }
      },
      { $sort: { createdAt: -1 } },
      { $group: { _id: "$other", lastMessage: { $first: "$content" }, lastAt: { $first: "$createdAt" } } },
      { $sort: { lastAt: -1 } },
    ]);

    const results = await Promise.all(agg.map(async item => {
      const user = await User.findById(item._id).select("name");
      return {
        userId: item._id,
        name: user ? user.name : "Utilisateur supprimé",
        lastMessage: item.lastMessage,
        lastAt: item.lastAt,
      };
    }));

    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;