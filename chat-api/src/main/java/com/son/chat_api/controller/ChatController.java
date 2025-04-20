package com.son.chat_api.controller;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;

import com.son.chat_api.dtos.SendMessageDto;
import com.son.chat_api.entities.Message;
import com.son.chat_api.services.ChatService;

@Controller
// @RequestMapping("/api/v1/chat")
@CrossOrigin(origins = "http://localhost:3000")
public class ChatController {

    private ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @MessageMapping("/sendMessage/{roomId}")
    @SendTo("/topic/rooms/{roomId}")
    public Message sendMessage(
        @RequestBody SendMessageDto messageDto,
        @DestinationVariable String roomId
    ) {
       return this.chatService.sendMessage(messageDto, roomId);
    }
}
