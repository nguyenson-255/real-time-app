package com.son.chat_api.entities;

import java.time.LocalDateTime;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Document(collection = "messages")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Message {

    private String sender;

    private String content;

    private LocalDateTime dateTime;

    public Message(String sender, String content) {
        this.sender = sender;
        this.content = content;
        this.dateTime = LocalDateTime.now();
    }

}
