package com.example.chatapp.controller;

import com.example.chatapp.database.ChatApp;
import com.example.chatapp.model.User;
import com.example.chatapp.model.UserLoginForm;
import com.example.chatapp.model.UserRegistrationForm;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class UserController {
    @RequestMapping(value = "/user/login", method = RequestMethod.POST)
    public User loginUser(@RequestBody UserLoginForm userLoginForm) {
        User u = ChatApp.users.get(userLoginForm.getUsername());
        if (u != null && u.getPassword().equals(userLoginForm.getPassword())) {
            String token = String.format("%s:%s", userLoginForm.getUsername(), Math.random());
            ChatApp.tokens.add(token);
            u.setAuthToken(token);
            return u;
        }
        return null;
    }

    @RequestMapping(value = "/user/register", method = RequestMethod.POST)
    public User registerUser(@RequestBody UserRegistrationForm userRegistrationForm) {
        User u = new User(
            userRegistrationForm.getUsername(),
            userRegistrationForm.getPassword(),
            userRegistrationForm.getFirstName(),
            userRegistrationForm.getLastName()
        );
        ChatApp.users.put(u.getUsername(), u);
        return u;
    }

    @RequestMapping(value = "/user/{token}", method = RequestMethod.GET)
    public User getCurrentUser(@PathVariable String token) {
        // TODO: get the current logged in user with a token
        return null;
    }

    @RequestMapping(value = "/chat/home", method = RequestMethod.GET)
    public String index(@RequestHeader("x-auth-token") String token) {
        if (ChatApp.tokens.contains(token)) {
            return "You are OK to access this page";
        } else {
            return "You don't have access to this page";
        }
    }
}
