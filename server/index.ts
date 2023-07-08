import express from 'express';
import http from 'http';

import { Server } from 'socket.io';


const server = http.createServer(express());

const io = new Server(server, {
    cors: {
        origin: '*',
    },
},
);

type Point = {
    x: number;
    y: number;
}

type DrawLine = {
    previousPoint: Point | null;
    currentPoint: Point;
    color: string;
}


io.on('connection', (socket) => {
    console.log('Drawing socket connected')
    socket.on('draw-line', ({ previousPoint, currentPoint, color }: DrawLine) => {
        socket.broadcast.emit('draw-line', { previousPoint, currentPoint, color });
    })

    socket.on('clear-canvas', () => {
        io.emit('clear-canvas');
    })

});



server.listen(3001, () => {
    console.log('listening on *:3001');
}
);