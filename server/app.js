import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const secretKeyJWT = "assdfgtrsghjkolnvghj";

const port = 3000;
const app = express();
const server = createServer(app);

// CORS initialize
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Fix: Remove trailing slash
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(
  cors({
    origin: "http://localhost:5173", // Fix: Remove trailing slash
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/login", (req, res) => {
  const token = jwt.sign({ _id: "asdfghjklxcvbnerty" }, secretKeyJWT);

  res
    .cookie("token", token, { httpOnly: true, secure: true, sameSite: "none" })
    .json({
      message: "Login Success",
    });
});

io.use((socket, next) => {
  cookieParser()(socket.request, socket.request.res || {}, (err) => {
    if (err) return next(err);

    const token = socket.request.cookies.token;

    if (!token) return next(new Error("Authentication Error"));

    try {
      const decoded = jwt.verify(token, secretKeyJWT);
      socket.user = decoded; // Attach the user to the socket object
      next();
    } catch (error) {
      return next(new Error("Authentication Error"));
    }
  });
});

io.on("connection", (socket) => {
  console.log("User Connected", socket.id);

  // Event creation
  socket.on("message", ({ room, message }) => {
    console.log(room, message);
    socket.to(room).emit("receive-message", message); // Fix: Corrected event name
  });

  socket.on("join-room", (room) => {
    socket.join(room);
    console.log(`User joined room ${room}`); // Fix: Corrected string interpolation
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});