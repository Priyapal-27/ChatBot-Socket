# ChatBot-Socket

A real-time chatbot application built with React (frontend) and Node.js + Express + Socket.IO (backend). This project demonstrates a socket-based chat system where users can connect, send messages, and receive real-time responses.

---

## Table of Contents

- [Features](#features)  
- [Project Structure](#project-structure)  
- [Getting Started](#getting-started)  
- [Available Scripts](#available-scripts)  
- [Technologies Used](#technologies-used)  
- [Contributing](#contributing)  
- [License](#license)  

---

## Features

- Real-time communication with Socket.IO
- React frontend with reusable components
- Node.js backend with Express server
- Socket event handlers separated for clarity
- Easy to extend and customize

---

## Project Structure

```
ChatBot-Socket/
│
├── client/               # React frontend
│   ├── public/           # Public assets
│   ├── src/              # React source code
│   │   ├── components/   # Reusable React components
│   │   ├── App.js        # Main React app component
│   │   └── index.js      # React entry point
│   ├── package.json      # Frontend dependencies
│   └── ...
│
├── server/               # Node.js backend
│   ├── controllers/      # Socket event handlers
│   │   └── socketHandler.js
│   ├── app.js            # Express app setup
│   ├── index.js          # Server entry point
│   ├── package.json      # Backend dependencies
│   └── ...
│
├── .gitignore            # Git ignore rules
└── README.md             # Project documentation
```

---

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- npm (comes with Node.js)
- Optional: yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/Priyapal-27/ChatBot-Socket.git
cd ChatBot-Socket
```

2. Install server dependencies

```bash
cd server
npm install
```

3. Install client dependencies

```bash
cd ../client
npm install
```

---

### Running the Application

**Start the backend server**

```bash
cd server
npm start
```

The server will start on `http://localhost:5000` (default port).

**Start the React client**

```bash
cd ../client
npm start
```

The React app will start on `http://localhost:3000` and will connect to the backend automatically.

---

## Available Scripts

### In the `client` directory:

- `npm start` — Runs the app in development mode.
- `npm run build` — Builds the app for production.

### In the `server` directory:

- `npm start` — Starts the Express server.

---

## Technologies Used

- React.js
- Node.js
- Express.js
- Socket.IO
- JavaScript (ES6+)
- HTML5 & CSS3

---

## Contributing

Contributions are welcome! Please fork the repository and create a pull request for any improvements or bug fixes.

