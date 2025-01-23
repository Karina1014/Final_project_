import express from 'express'
import htpp from 'http'
import { Server as SocketServer } from 'socket.io'

// Configuration cors - Middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', ['*']); 
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE'); 
    res.header('Access-Control-Allow-Headers', 'Content-Type'); 
    next();
  });

const app = express()
const server = htpp.createServer(app)
const io = new SocketServer(server)

io.on("connection", socket => {
    console.log(socket.id)

    socket.on("message", (body) =>  {
        socket.broadcast.emit("message",{
            body,
            from: socket.id.slice(6),
        });
    });
});

server.listen(3000);
console.log('server on port', 3000);