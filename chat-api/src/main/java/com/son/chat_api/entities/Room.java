package com.son.chat_api.entities;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Document(collection = "rooms")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
/**
 * Represents a chat room entity.
 * 
 * @author Son
 */
public class Room {

    @Id
    private String id;

    private String roomId;

    private List<Message> messages = new ArrayList<>();

}
