const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const participantsSchema = new mongoose.Schema(
  {
    conversationId: {
      type: ObjectId,
      ref: "Conversation",
      required: true
    },
    userId: {
      type: ObjectId,
      ref: "User",
      required: true
    },

    lastSeen: {
      type: ObjectId,
      ref: "Message"
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Participants", participantsSchema);