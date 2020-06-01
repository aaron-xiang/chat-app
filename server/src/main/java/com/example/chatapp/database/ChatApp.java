package com.example.chatapp.database;

import com.example.chatapp.model.User;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

public class ChatApp {
    public static final Set<String> tokens = new HashSet<>();
    public static final Map<String, User> users = new HashMap<>();
    private ChatApp() {}
}
