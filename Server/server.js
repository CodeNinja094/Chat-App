const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});

let waitingUser = null;

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Handle join request for pairing users
    socket.on('join_request', () => {

        socket.username = 0 || 'User';

        // Leave previous room if any
        if (socket.currentRoomId) {
            socket.leave(socket.currentRoomId);
            socket.to(socket.currentRoomId).emit("user_left", { userId: socket.id });
            socket.currentRoomId = null;
        }

        if (waitingUser && waitingUser.id !== socket.id) {
            // Pair the waiting user with the new user
            const roomId = `${waitingUser.id}_${socket.id}`;
            socket.join(roomId);
            waitingUser.join(roomId);

            socket.currentRoomId = roomId;
            waitingUser.currentRoomId = roomId;

            const systemMsgForNew =
                `You are now connected with ${waitingUser.username} (${waitingUser.id})! Say hi 👋`
                ;
            const systemMsgForWaiting =
                `You are now connected with ${socket.username} (${socket.id})! Say hi 👋`
                ;

            socket.emit("room_joined", systemMsgForNew, { roomId, partnerId: waitingUser.id });
            waitingUser.emit("room_joined", systemMsgForWaiting, { roomId, partnerId: socket.id });

            console.log(`Paired ${waitingUser.id} and ${socket.id} in room ${roomId}`);
            waitingUser = null;
        } else {
            // No one is waiting, set this user as waiting
            waitingUser = socket;
            socket.emit('waiting', `Hi ${socket.username || 'User'}, waiting for a partner...`);
            console.log(`${socket.id} is waiting for a partner`);
        }
    });

    // Handle sending messages within a room
    socket.on("send_message", ({ roomId, message }) => {
        if (roomId && message && socket.currentRoomId === roomId) {
            socket.to(roomId).emit("receive_message", { message, senderId: socket.id });
        }
    });

    // Handle leaving a room
    socket.on("leave_room", ({ roomId }) => {
        if (roomId) {
            socket.leave(roomId);
            console.log(`User ${socket.id} left room ${roomId}`);
            socket.to(roomId).emit("user_left", { userId: socket.id });
            socket.currentRoomId = null;
        }
    });

    // Handle user disconnect
    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
        if (waitingUser?.id === socket.id) {
            waitingUser = null;
        }
        if (socket.currentRoomId) {
            socket.to(socket.currentRoomId).emit("user_left", { userId: socket.id });
            socket.leave(socket.currentRoomId);
            socket.currentRoomId = null;
        }
    });
});

server.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});