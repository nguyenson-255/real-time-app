package com.son.chat_api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@SpringBootApplication
public class ChatApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(ChatApiApplication.class, args);
	}

	@GetMapping("path")
	public String getMethodName() {
		return "alo12dss4";
	}
	

}
