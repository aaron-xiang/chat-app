import React, { Component } from 'react';
import Login from '../components/login';
import Registration from '../components/registration';
import Chat from '../components/chat';

class Home extends Component {
    state = {
        status: "login", // "login", "registration", or "authorized"
    }

    switchView = (status) => {
        this.setState({ status });
    }

    render() {
        const { status } = this.state;
        switch (status) {
            case "registration":
                return <Registration switchView={this.switchView} />;
            case "authorized":
                return <Chat />
            default:
                return <Login switchView={this.switchView} />;
        }
    }
}

export default Home; 
