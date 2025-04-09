package com.son.chat_api.reponsitories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Component;

import com.son.chat_api.entities.Room;

public interface RoomReponsitory extends MongoRepository<Room, String> {
    
    Room findByRoomId(String roomId);


}
