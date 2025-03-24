import { io } from "socket.io-client";

export function getSocket(nsp, token) {

    return io(`http://localhost:3001/${nsp}`, {
        auth: {
            authorization: token
        },
        transports: ["websocket"],
        withCredentials: true,
    });
}