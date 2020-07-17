import faker from 'faker';

const contacts = [];
const channels = ['News', 'Movies', 'Random Stuff', 'Life Style'];

export class Message {
  constructor(text = '', from = '', timestamp = '') {
    this.text = text;
    this.from = from;
    this.timestamp = timestamp;
  }
}

export const getAllChannels = () => channels;

export const getAllContacts = () => {
  if (contacts.length > 0) return contacts;
  for (let i = 0; i < 5; i++) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName()
    contacts.push({ firstName, lastName });
  }
  return contacts;
}

export const getConversationHistory = (subject) => {
  const conversations = [];
  const contacts = getAllContacts();
  for (let i = 0; i < 100; i++) {
    const c = Math.floor(Math.random() * 5)
    const text = faker.lorem.sentence();
    conversations.push(new Message(text, contacts[c], new Date()));
  }
  return conversations;
}

export const getCurrentUser = (token) => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  return { firstName, lastName };
}