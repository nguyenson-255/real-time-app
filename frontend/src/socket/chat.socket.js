// socket.js
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import toast from "../../node_modules/react-hot-toast/dist/index";

export const stompClient = new Client({
  webSocketFactory: () => new SockJS("http://localhost:3002/chat"),
  reconnectDelay: 5000,
  onConnect: () => {
    toast.success("✅ Connected!");
  },
  onDisconnect: () => {
    toast.error("❌ Disconnected!");
  },
});

export const connectStomp = () => stompClient.activate();
export const disconnectStomp = () => stompClient.deactivate();


export const subscribeToRoomId = (roomId, callback) => {
  if (stompClient.connected) {
    stompClient.subcribe(`/topic/rooms/${roomId}`, (message) => {
        const msg = JSON.parse(message.body);
        callback(msg);
    });
  }
}
