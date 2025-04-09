package com.son.chat_api.config;

import java.net.http.WebSocket;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer{

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/topic"); // nơi client subscribe
        registry.setApplicationDestinationPrefixes("/app"); // nơi client gửi message
    }
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/chat") // endpoint WebSocket
                .setAllowedOriginPatterns("http://localhost:80") // cho phép client từ localhost:3000
                .withSockJS(); // hỗ trợ fallback cho client không hỗ trợ websocket
    }

    

    
    
}
