const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types

const conversationSchema = new mongoose.Schema(
  {
    isGroup: {
      type: Boolean,
      default: false,
      index: true
    },
    groupAdmin: [
      {
        type: ObjectId,
        ref: "User"
      }
    ],
    createdBy: {
      type: ObjectId,
      ref: "User"
    },
    groupName: {
      type: String,
      trim: true,
    },
    lastMessage: {
      text: String,
      senderId: { type: ObjectId, ref: "User" },
      createdAt: { type: Date },
      messageId: { type: ObjectId, ref: "Message" }
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Conversation", conversationSchema);