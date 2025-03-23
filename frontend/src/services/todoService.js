import { io } from "socket.io-client";

const socket = io('http://localhost:3001/todos', {
    auth: {
        authorization: localStorage.getItem('token')
    },
    transports: ["websocket"],
    withCredentials: true,
});

socket.on("connect", () => {
    console.log(socket.id); // true
});

socket.on("data", () => { 

    console.log('ok  ');
    
});



export function sendMessage() {
    socket.emit('message', '1234');
}