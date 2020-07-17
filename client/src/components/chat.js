import React, { Component, createRef } from "react";
import styled from "styled-components";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import Sidebar from "./side-bar";
import { getConversationHistory, getCurrentUser } from "../services/chat";
import MessageDisplay from "./message";

const Container = styled.div`
  display: grid;
  width: 100vw;
  height: 100vh;
  grid-template-columns: 20% auto;
  grid-template-rows: 4rem auto 3rem;
  grid-gap: 1em;
  grid-template-areas:
    "header header"
    "sidebar content"
    "sidebar input-box";
`;

const Header = styled.div`
  grid-area: header;
  background-color: lightblue;
  text-align: center;
  vertical-align: center;
  font-weight: bold;
  font-size: larger;
  padding-top: 15px;
`;

const Content = styled.div`
  grid-area: content;
  border: 1px solid black;
  margin-right: 10px;
  border-radius: 5px;
  height: 85vh;
  overflow: scroll;
  padding-left: 10px;
`;

const InputBox = styled.form`
  grid-area: input-box;
  display: flex;
`;

const UserInput = styled.input`
  flex-grow: 1;
  /* margin 50% auto; */
  /* margin-top:  */
`;

const SendButton = styled.button`
  /* margin: 10px auto; */
  margin-right: 10px;
  width: 5rem;
  border-radius: 5px;
`;

const LogoutButton = styled.button.attrs({
  className: "btn btn-primary",
})`
  position: absolute;
  left: 90%;
`;

const sockjsUrl = "http://192.168.0.100:8080/chat";

export default class Chat extends Component {
  constructor(props) {
    super(props);
    const sockjs = new SockJS(sockjsUrl);
    const stompClient = Stomp.over(sockjs);
    this.state = {
      conversationHistory: [],
      users: [],
      userInput: "",
      title: "Chat",
      stompClient,
      user: null,
    };
  }
  messagesEnd = createRef();

  onInputChange = (event) => {
    const userInput = event.target.value;
    this.setState({ userInput });
  };

  onSend = (event) => {
    event.preventDefault();
    let { userInput } = this.state;
    this.state.stompClient.send('/app/chat', {token: 123}, JSON.stringify({
      from: this.state.user,
      text: userInput,
      timestampe: new Date(),
    }));
    // conversationHistory.push(new Message(userInput, "Aaron", new Date()));
    userInput = "";
    this.setState({ userInput });
  };

  onLogout = (event) => {
    const { switchView } = this.props;
    event.preventDefault();
    switchView("login");
  };

  scrollToBottom = () => {
    this.messagesEnd.current.scrollIntoView({
      behavior: "auto",
      block: "end",
      inline: "nearest",
    });
  };

  handleIncomingMessage = (message) => {
    let { conversationHistory } = this.state;
    console.log('####', message);
    conversationHistory.push(message);
    this.setState({ conversationHistory });
  }

  componentDidMount() {
    const conversationHistory = getConversationHistory();
    const user = getCurrentUser();
    this.setState({ conversationHistory, user });
    this.scrollToBottom();
    const that = this;
    this.state.stompClient.connect({}, (frame) => {
      console.log('Connected:\n', frame);
      stompClient.subscribe('/topic/messages', that.handleIncomingMessage)
    });
    console.log("did mount");
  }

  componentDidUpdate() {
    this.scrollToBottom();
    console.log("did update");
  }

  render() {
    const { user } = this.state;
    return (
      <Container>
        <Header>
          {user ? user.firstName : ''}
          <LogoutButton onClick={this.onLogout}>Logout</LogoutButton>
        </Header>
        <Sidebar />
        <Content>
          {this.state.conversationHistory.map((msg, i) => (
            <MessageDisplay key={i} message={msg} />
          ))}
          <div ref={this.messagesEnd}></div>
        </Content>
        <InputBox onSubmit={this.onSend}>
          <UserInput
            onChange={this.onInputChange}
            value={this.state.userInput}
          ></UserInput>
          <SendButton classname="btn btn-primary" onClick={this.onSend}>
            Send
          </SendButton>
        </InputBox>
      </Container>
    );
  }
}
