
const onlineUsers = new Map();
const userSockets = new Map();


module.exports = (io) => {
  io.on("connection", (socket) => {

    // Register user when they connect
    socket.on("register_user", (userId) => {
      onlineUsers.set(userId, socket.id);
      userSockets.set(socket.id, userId);
      io.emit("user_online", { userId, socketId: socket.id });
    });

    // Disconnect user
    socket.on("disconnect", () => {
      const userId = userSockets.get(socket.id);
      if (userId) {
        onlineUsers.delete(userId);
        userSockets.delete(socket.id);
        io.emit("user_offline", { userId });
      }
    });

    // Join conversation room
    socket.on("join_conversation", (conversationId) => {
      socket.join(`conversation_${conversationId}`);
    });

    // Leave conversation room
    socket.on("leave_conversation", (conversationId) => {
      socket.leave(`conversation_${conversationId}`);
    });

    // Send message in real-time
    socket.on("send_message", (data) => {
      const { conversationId, message } = data;
      io.to(`conversation_${conversationId}`).emit("new_message", message);
    });

    // Typing indicator
    socket.on("typing", (data) => {
      const { conversationId, userId, userName } = data;
      socket.broadcast.to(`conversation_${conversationId}`).emit("user_typing", {
        userId,
        userName,
      });
    });

    // Stop typing
    socket.on("stop_typing", (data) => {
      const { conversationId, userId } = data;
      socket.broadcast.to(`conversation_${conversationId}`).emit("user_stop_typing", {
        userId,
      });
    });

    // Mark message as read
    socket.on("mark_message_read", (data) => {
      const { conversationId, messageId, userId } = data;
      io.to(`conversation_${conversationId}`).emit("message_read", {
        messageId,
        userId,
      });
    });

    // User is active (for last seen)
    socket.on("user_active", (userId) => {
      io.emit("user_activity", { userId, timestamp: new Date() });
    });
  })
}