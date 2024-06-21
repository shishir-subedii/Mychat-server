const express = require('express');
const app = express();
const port =  process.env.PORT || 3000;
const cors = require('cors');

app.use(cors());
app.use(express.json());


const server = app.listen(port, () => {
    console.log('Server is running on port: ' + port);

});

const io = require('socket.io')(server, {
    cors: {
        origin: ["https://my-chat-client-flax.vercel.app/"]
    }
});

io.on('connection', socket => {
    socket.on('user-connected', (name) => {
        socket.broadcast.emit('user-joined-info',name);
    });
    socket.on('send-message', (msg, who) => {
        socket.broadcast.emit('receive-message', msg, who);
    });
    socket.on('user-disconnected', (who) => {
        socket.broadcast.emit('user-exit-info', who);
    });
});


