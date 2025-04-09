package com.son.chat_api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.son.chat_api.dtos.CreateRoomDto;
import com.son.chat_api.services.RoomSerivce;



@RestController
@RequestMapping("/api/v1/rooms")
@CrossOrigin("http://localhost:80")
public class RoomController {

    private RoomSerivce roomSerivce;

    public RoomController(RoomSerivce roomSerivce) {
        this.roomSerivce = roomSerivce;
    }

    @PostMapping
    public ResponseEntity<?> createRoom(@RequestBody() CreateRoomDto createRoomDto) {
        return this.roomSerivce.createRoom(createRoomDto.getRoomId());
    }

    // get room by id : join
    @GetMapping("/{roomId}")
    public ResponseEntity<?> getRoomById(@PathVariable String roomId) {
        return this.roomSerivce.getRoomById(roomId);

    }
    // get all messages of room

    @GetMapping("/{roomId}/messages")
    public ResponseEntity<?> getAllMessages(
        @PathVariable String roomId,
        @RequestParam(value = "page", defaultValue = "0", required = false) int page,
        @RequestParam(value = "size", defaultValue = "10", required = false) int size
    ) {
        return this.roomSerivce.getAllMessages(roomId, page, size);
    }
}
