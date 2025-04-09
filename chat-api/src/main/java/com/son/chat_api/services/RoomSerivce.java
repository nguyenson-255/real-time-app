package com.son.chat_api.services;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.son.chat_api.entities.Room;
import com.son.chat_api.reponsitories.RoomReponsitory;

@Service
public class RoomSerivce {

    private RoomReponsitory roomReponsitory;

    public RoomSerivce(RoomReponsitory roomReponsitory) {
        this.roomReponsitory = roomReponsitory; 
    }

    public ResponseEntity<?> createRoom(String roomId) {
        if (this.roomReponsitory.findByRoomId(roomId) == null) {
            Room room = new Room();
            room.setRoomId(roomId);
            this.roomReponsitory.save(room);
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(room);
        } else {
            return ResponseEntity.badRequest().body("Room already exists");
        }
    }

    public ResponseEntity<?> getRoomById(String roomId) {

        Room room = this.roomReponsitory.findByRoomId(roomId);
        if (room != null) {
            return ResponseEntity.status(HttpStatus.OK).body(room);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Room not found");
        }
        
    }

    public ResponseEntity<?> getAllMessages(String roomId, int page, int size) {
        Room room = this.roomReponsitory.findByRoomId(roomId);
        if (room != null) {
            int start = page * size;
            int end = Math.min(start + size, room.getMessages().size());
            return ResponseEntity.status(HttpStatus.OK).body(room.getMessages().subList(start, end));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Room not found");
        }
    }
}
