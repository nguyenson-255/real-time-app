import { stompClient } from "../socket/chat.socket";

export const subscribeToRoomId = (roomId, callback) => {  
  if (stompClient.connected) {
    stompClient.subscribe(`/topic/rooms/${roomId}`, (message) => {
        const msg = JSON.parse(message.body);
        callback(msg);
    });
  }
}

export const sendMessage = (msg) => {
  
  if (stompClient.connected) {
    stompClient.publish({
      destination: `/app/sendMessage/${msg.roomId}`,
      body: JSON.stringify(msg),
    });
  }
};