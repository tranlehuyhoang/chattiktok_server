import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import { WebcastPushConnection } from 'tiktok-live-connector';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ['https://tranlehuyhoang.github.io', 'https://tranlehuyhoang.github.io/chattiktok_client', 'http://localhost:3000'],
        credentials: true
    }
});

app.use(cors({
    origin: ['https://tranlehuyhoang.github.io/chattiktok_client', 'https://tranlehuyhoang.github.io', 'http://localhost:3000'],
    credentials: true
}));

let tiktokUsername = "giangtran135";
let tiktokLiveConnection = new WebcastPushConnection(tiktokUsername);
tiktokLiveConnection.connect().then(state => {
    console.info(`Connected to roomId ${state.roomId}`);
}).catch(err => {
    console.error('Failed to connect', err);
});

tiktokLiveConnection.on('chat', data => {
    console.log(`${data.uniqueId} (userId:${data.userId}) writes: ${data.comment}`);
    io.emit('like', { img: data.profilePictureUrl, username: data.nickname, top: Math.random(), left: Math.random(), comment: data.comment }); // emit the like event to all connected clients
});

tiktokLiveConnection.on('like', data => {
    console.log(`${data.nickname}  likes the video`);
    // io.emit('like', { img: data.profilePictureUrl, username: data.nickname, top: Math.random(), left: Math.random() }); // emit the like event to all connected clients

});

tiktokLiveConnection.on('user_leave', data => {
    console.log(`${data.uniqueId} (userId:${data.userId}) left the chat`);
});

server.listen(5000, () => {
    console.log("SERVER RUNNING");
});