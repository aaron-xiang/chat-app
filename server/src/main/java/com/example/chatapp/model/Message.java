package com.example.chatapp.model;

import java.util.Date;

public class Message {
    private String type;
    private Date timestamp;
    private User from;
    private User toUser;
    private Group toGroup;
    private String text;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public User getFrom() {
        return from;
    }

    public void setFrom(User from) {
        this.from = from;
    }

    public User getToUser() {
        return toUser;
    }

    public void setToUser(User toUser) {
        this.toUser = toUser;
    }

    public Group getToGroup() {
        return toGroup;
    }

    public void setToGroup(Group toGroup) {
        this.toGroup = toGroup;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
