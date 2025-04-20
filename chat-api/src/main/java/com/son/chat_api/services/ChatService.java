package com.son.chat_api.services;

import org.springframework.stereotype.Service;

import com.son.chat_api.dtos.SendMessageDto;
import com.son.chat_api.entities.Message;
import com.son.chat_api.entities.Room;
import com.son.chat_api.reponsitories.RoomReponsitory;

@Service
public class ChatService {

    private RoomReponsitory roomReponsitory;

    public ChatService(RoomReponsitory roomReponsitory) {
        this.roomReponsitory = roomReponsitory;
    }

    public Message sendMessage(SendMessageDto messageDto, String roomId) {
        Room room = roomReponsitory.findByRoomId(roomId);
        
        if (room != null) {
            Message message = new Message(messageDto.getSender(), messageDto.getContent());
            room.getMessages().add(message);
            roomReponsitory.save(room);
            return message;
        } else {
            throw new RuntimeException("Room not found");
        }
    }


}
