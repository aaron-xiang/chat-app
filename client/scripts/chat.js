const SockJS = require('sockjs-client');
const Stomp = require('stompjs');

const sockjs = new SockJS('http://localhost:8080/chat')
const stompClient = Stomp.over(sockjs);

stompClient.connect({}, (frame) => {
  console.log('Connected:\n', frame);
  stompClient.subscribe('/topic/messages', (message) => {
    console.log(JSON.parse(message.body));
  })
});

console.log('after connect');

setTimeout(() => {
  console.log('sending message...');
  stompClient.send('/app/chat', {token: 123}, JSON.stringify({
    from: {
      firstName: 'Aaron',
      lastName: 'Xiang',
    },
    text: 'Hello from Aaron',
    timestampe: new Date(),
  }));
}, 1000);

console.log('after send');

setTimeout(() => { 
  console.log('disconnect');
  stompClient.disconnect();
}, 5000);
