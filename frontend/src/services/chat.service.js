import { stompClient } from "../socket/chat.socket";

export const sendMessage = (msg) => {
  console.log(stompClient.connected);
  
  if (stompClient.connected) {
    stompClient.publish({
      destination: `/app/sendMessage/${msg.roomId}`,
      body: JSON.stringify(msg),
    });
  }
};