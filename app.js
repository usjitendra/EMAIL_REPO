const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cookieParser = require("cookie-parser");
const cors = require("cors")
// const { send_function, send_delhi, send_sunil } = require("./src/controllers/email.send")

const connectDB = require("./src/Config/db");
// const { Socket } = require("dgram");
const app = express();




app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
const server = http.createServer(app);


const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
  }
});

require("./src/socket/socketHandler")(io);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/health", (req, res) => {
  return res.status(200).json({ status: "Ok", message: "All Good." });
});
app.get("/", (req, res) => {
  res.send("🚀 Server is running on port 9096!");
});




app.use("/api/v1", require("./src/routes/main.routes"));


app.use((req, res) => res.status(404).json({ message: "Route not found" }));

async function startServer() {
  try {
    await connectDB();
    const PORT = process.env.PORT || 9696;
    server.listen(PORT, () => console.log(`✅ Server listening on port ${PORT}`));
    // await send_function();
    // await send_delhi();
    // await send_sunil();
  } catch (error) {
    console.error("❌ FATAL: Server setup failed.", error.message);
    process.exit(1);
  }
}

startServer();




