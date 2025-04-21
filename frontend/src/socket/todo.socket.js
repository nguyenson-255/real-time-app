import { io } from "socket.io-client";

let socket = null;

export const connectSocket = (nsp, token, port) => {
    if (!socket) {
        socket = io(`http://localhost:${port}/${nsp}`, {
            auth: { authorization: token },
            transports: ["websocket"],
            withCredentials: true,
        });

        socket.on("connect", () => console.log("✅ Connected to socket"));
        socket.on("disconnect", () => console.log("❌ Disconnected from socket"));
    }
    return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};
