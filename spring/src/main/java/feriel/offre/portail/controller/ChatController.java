package feriel.offre.portail.controller;

import feriel.offre.portail.entity.ChatMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;


@CrossOrigin(origins = "*")
@Controller
public class ChatController {
    @Autowired
    private SimpMessagingTemplate messagingTemplate;


    @MessageMapping("/chat.sendMessage")
    public void sendMessage(@Payload ChatMessage chatMessagePojo) {
        String recipientId = chatMessagePojo.getRec();
        String senderId = chatMessagePojo.getSender();
        // Send the message to the specified recipient
        messagingTemplate.convertAndSend("/topic/"+recipientId, chatMessagePojo);
        messagingTemplate.convertAndSend("/topic/"+senderId, chatMessagePojo);
    }

    @MessageMapping("/chat.addUser")
    @SendTo("/topic/public")
    public ChatMessage addUser(@Payload ChatMessage chatMessagePojo, SimpMessageHeaderAccessor headerAccessor) {

        // Add username in web socket session
        headerAccessor.getSessionAttributes().put("username", chatMessagePojo.getSender());
        return chatMessagePojo;
    }

}
