import React, { Component } from "react";
import styled from "styled-components";

const ConversationContainer = styled.div`
  border: 1px solid black;
  /* margin: 10px 50px; */
  margin-right: 150px;
  height: 200px;
  /* text-align: left; */
  padding-left: 10px;
`;

export default class Conversation extends Component {
  render() {
    const { history } = this.props;
    return (
      <ConversationContainer>
        {history.map((text, idx) => (
         <p key={idx}>{text}</p>
        ))}
      </ConversationContainer>
    );
  }
}
