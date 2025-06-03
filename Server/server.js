const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

let app = express();
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        method: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('send_message', (data) => {
        // Broadcast message to all other users
        socket.broadcast.emit('receive_message', data);
    });
    // socket.on('send_message', (data) => {
    //     socket.broadcast.emit('receive_message', data);
    //     // Broadcast to *all except* sender
    // });


    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

app.get('/', (req, res) => {
    res.send('Socket.IO server is running');
});

server.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});