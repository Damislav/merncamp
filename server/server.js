import express from "express";
import cors from "cors";
import mongoose from "mongoose";
const morgan = require("morgan");
import dotenv from "dotenv";
import { readdirSync } from "fs";

dotenv.config();

const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-type"],
  },
});

// ¸db
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log(err);
  });

// ¸middlewares
app.use(morgan("dev"));
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [process.env.CLIENT_URL],
  })
);

// autoload routes
readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));
// socket io

io.on("connect", (socket) => {
  // console.log("SOCKET>IO", socket.id);
  socket.on("new-post", (newPost) => {
    // console.log("socketio new post => ", newPost);
    socket.broadcast.emit("new-post", newPost);
  });
});

const port = process.env.PORT || 8000;

http.listen(port, () => console.log(`Server running on port ${port}`));
