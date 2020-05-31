# Technical Design For Chat Application

## Domain Classes
```
ChatApp {
    // attr
    User[] users
    Group[] groups

    // methods
    User registerUser(UserInfo info)
    Token loginUser(User user)
    Group[] searchGroup(String query)
    Group[] listUserGroup(User user)

}
```

```
User {
    // attr
    String firstName
    String lastName
    String userId
    String password
    Group[] joinedGroups

    Response sendMessage(User u, Message msg) // private message
    Response sendMessage(Group g, Message msg) // group message
    void joinGroup(Group g)
    Group createGroup(String groupName)
}
```

```
Group {
    // attr
    String groupName
    User groupLeader
    User[] users
}
```

```
Message {
    String type
    Datetime timestamp
    User from
    Group toGroup
    User toUser
    String text
}
```