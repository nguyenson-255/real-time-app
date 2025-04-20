import { Client } from '@stomp/stompjs';
import { toast } from 'react-hot-toast';
import SockJS from 'sockjs-client';

export let stompClient = null;

export const connectStomp = () => {
  return new Promise((resolve, reject) => {
    stompClient = new Client({
      webSocketFactory: () => new SockJS('http://localhost:3002/chat'),
      brokerURL: 'ws://localhost:3002/ws',
      reconnectDelay: 5000,
      onConnect: () => {
        toast.success('✅ STOMP connected');
        resolve();
      },
      onStompError: (frame) => {

        toast.error('STOMP error', frame);
        reject(frame);
      },
    });

    stompClient.activate();
  });
};

export const disconnectStomp = () => {
  if (stompClient && stompClient.connected) {
    stompClient.deactivate();
  }
};
