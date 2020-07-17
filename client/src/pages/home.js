import React, { Component } from 'react';
import Login from '../components/login';
import Registration from '../components/registration';
import Chat from '../components/chat';

class Home extends Component {
    state = {
        status: "authorized", // "login", "registration", or "authorized"
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
                return <Chat switchView={this.switchView} />
            default:
                return <Login switchView={this.switchView} />;
        }
    }
}

export default Home; 
