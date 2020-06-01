package com.example.chatapp.model;

public class UserRegistrationForm extends UserLoginForm {
    private String firstName;
    private String LastName;

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        LastName = lastName;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return LastName;
    }
}
