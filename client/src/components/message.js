import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment';

const MessageBox = styled.div`
  position: relative;
  margin: 5px 0;
  &:hover {
    background-color: lightgrey;
  }
`;
const Sender = styled.span`
  display: inline-block;
  font-weight: bold;
  font-size: 1.1rem;
`;
const TimeStamp = styled.span`
  display: inline-block;
  position: absolute;
  right: 2rem;
  font-size: 0.7rem;
  font-style: italic;
`;
const Text = styled.div``;


export default class Message extends Component {
  render() {
    const { message } = this.props;
    const timestamp = moment(message.timestamp).format('ddd, MMM Do YYYY, hh:mm:ss a');
    return (
      <MessageBox>
        <Sender>{message.from.firstName}</Sender>
        <TimeStamp>{timestamp}</TimeStamp>
        <Text>{message.text}</Text>
      </MessageBox>
    )
  }
}
