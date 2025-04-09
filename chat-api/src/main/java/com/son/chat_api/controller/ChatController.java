package com.son.chat_api.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;

import com.son.chat_api.entities.Message;
import com.son.chat_api.services.ChatService;

@Controller
// @RequestMapping("/api/v1/chat")
public class ChatController {

    private ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @MessageMapping("/sendMessage/{roomId}")
    @SendTo("/topic/room/{roomId}")
    public Message sendMessage(@PathVariable String roomId) {
       return this.chatService.sendMessage();
    }
}
