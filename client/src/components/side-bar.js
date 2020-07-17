import React, { Component } from 'react';
import styled from 'styled-components';
import {getAllChannels, getAllContacts} from '../services/chat';

// const channels = ['News', 'Movies', 'Random Stuff', 'Life Style'];
// const contacts = ['Alex', 'Brian', 'Cindy', 'David', 'Ellen'];
// const selectedChannel = 'News';

const SideBarDiv = styled.div`
  grid-area: sidebar;
  border-right: 1px solid black;
`;

const ListHeader = styled.div`
  font-weight: bold;
  font-size: larger;
  background-color: lightblue;
  padding: 5px;
`;

const ListBox = styled.ul`
  list-style: none;
  padding: 2px;
`;

const ListItem = styled.li`
  display: block;
  background-color: ${props => props.active ? 'blue' : 'white'};
  color: ${props => props.active ? 'white' : 'black'};
  &:hover {
    background-color: lightcoral;
  }
`;

const AddButton = styled.button`
  background-color: lightblue;
  /* border: none; */
  /* border-radius: 5px; */
  border: none;
  &:hover {
    /* color: lightcoral; */
    background-color: lightgray;
  }
`;

export default class SideBar extends Component {
  state = {
    channels: [],
    contacts: [],
    selectedChannel: 'News',
  }

  componentDidMount() {
    const channels = getAllChannels();
    const contacts = getAllContacts();
    this.setState({ channels, contacts })
  }

  render() {
    const { channels, contacts } = this.state;
    return (
      <SideBarDiv>
        <ListHeader>Channels <AddButton>+</AddButton></ListHeader>
        <ListBox key="channel">
          {
            channels.map((c, i) => <ListItem key={c} active={c === this.state.selectedChannel}>{c}</ListItem>)
          }
        </ListBox>
        <ListHeader>Contacts <AddButton>+</AddButton></ListHeader>
        <ListBox key="contacts">
          {
            contacts.map((c, i) => <ListItem key={c} active={c === this.state.selectedChannel}>{c.firstName}</ListItem>)
          }
        </ListBox>
      </SideBarDiv>
    )
  }
}
