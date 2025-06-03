import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import {
  Button,
  Container,
  Box,
  TextField,
  Typography,
  Stack,
} from "@mui/material";

const App = () => {
  // Initialize Socket.IO connection
  const socket = useMemo(
    () =>
      io("http://localhost:3000", {
        withCredentials: true, // Include cookies for authentication
      }),
    []
  );

  // State variables
  const [messages, setMessages] = useState([]); // Stores all messages
  const [message, setMessage] = useState(""); // Current message input
  const [room, setRoom] = useState(""); // Room to send the message to
  const [socketID, setSocketId] = useState(""); // Socket ID of the client
  const [roomName, setRoomName] = useState(""); // Room name to join

  // Log messages for debugging
  console.log(messages);

  // Handle message submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message && room) {
      socket.emit("message", { message, room }); // Send message to the specified room
      setMessage(""); // Clear the message input
    }
  };

  // Handle joining a room
  const joinRoomHandler = (e) => {
    e.preventDefault();
    if (roomName) {
      socket.emit("join-room", roomName); // Join the specified room
      setRoomName(""); // Clear the room name input
    }
  };

  // Socket.IO event listeners
  useEffect(() => {
    // Connection established
    socket.on("connect", () => {
      setSocketId(socket.id); // Set the socket ID
      console.log("Connected", socket.id);
    });

    // Receive a message
    socket.on("receive-message", (data) => {
      console.log("Received message:", data);
      setMessages((messages) => [...messages, data]); // Add the message to the list
    });

    // Welcome message from the server
    socket.on("welcome", (message) => {
      console.log("Welcome message:", message);
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("Disconnected");
    });

    // Cleanup on component unmount
    return () => {
      socket.disconnect(); // Disconnect the socket when the component unmounts
    };
  }, [socket]);

  return (
    <Container maxWidth="sm">
      <Box sx={{ height: 200 }} />
      <Typography variant="h6" component="div" gutterBottom>
        Socket ID: {socketID}
      </Typography>

      {/* Form to join a room */}
      <form onSubmit={joinRoomHandler}>
        <h5>Join Room</h5>
        <TextField
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          id="room-name"
          label="Room Name"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Join Room
        </Button>
      </form>

      {/* Form to send a message */}
      <form onSubmit={handleSubmit}>
        <TextField
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          id="message"
          label="Message"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          id="room"
          label="Room"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Send Message
        </Button>
      </form>

      {/* Display received messages */}
      <Stack spacing={2} sx={{ marginTop: 4 }}>
        {messages.map((m, i) => (
          <Typography key={i} variant="body1" component="div" gutterBottom>
            {m}
          </Typography>
        ))}
      </Stack>
    </Container>
  );
};

export default App;
