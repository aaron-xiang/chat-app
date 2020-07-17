package com.example.chatapp.controller;

import com.example.chatapp.model.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Date;

@Controller
@CrossOrigin
public class MessageController {
    @MessageMapping("/chat")
    @SendTo("/topic/messages")
    public Message send(Message message) {
        message.setTimestamp(new Date());
        System.out.println(">>>>" + message);
        return message;
    }
}
