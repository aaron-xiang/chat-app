import React, { Component } from 'react';
import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
  border: 1px solid blue;
  border-radius: 10px;
  text-align: center;
  width: 80%;
  margin: 150px auto;
`;
const PageHeader = styled.h2`
  margin: 30px 0
`;
const UserInput = styled.input`
  width: 75%;
  margin 10px auto;
`;

const SubmitButton = styled.button`
  margin: 10px auto;
`;

const inputStyles = {
    width: "75%",
  };

class Registration extends Component {
    render() {
        return (
            <div>
                Registration   
            </div>
        )
    }

    onSubmit = (event) => {
        event.preventDefault();
        console.log("registering");
        // console.log(this.state);
        axios
          .post("http://localhost:8080/user/registration", this.state)
          .then((response) => {
            console.log("registered user:", response.data);
          });
    };

    onChange = (event) => {
        event.preventDefault();
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        const newState = {};
        newState[fieldName] = fieldValue;
        // console.log(newState);
        this.setState({ ...this.state, ...newState });
    };

    onClickLogin = (event) => {
        event.preventDefault();
        const { switchView } = this.props;
        switchView("login");
    }

    render() {
        return (
        <Container>
            <PageHeader>Registration</PageHeader>
            <form onSubmit={this.onSubmit}>
                <UserInput
                    name="firstName"
                    className="form-control"
                    style={inputStyles}
                    placeholder="First Name"
                    onChange={this.onChange}
                />
                <UserInput
                    name="lastName"
                    className="form-control"
                    style={inputStyles}
                    placeholder="Last Name"
                    onChange={this.onChange}
                />
                <UserInput
                    name="username"
                    className="form-control"
                    style={inputStyles}
                    placeholder="User Name"
                    onChange={this.onChange}
                />
                <UserInput
                    name="password"
                    className="form-control"
                    style={inputStyles}
                    placeholder="Password"
                    onChange={this.onChange}
                    type="password"
                />
                <SubmitButton className="btn btn-primary">Register</SubmitButton>
                <SubmitButton className="btn btn-default" onClick={this.onClickLogin}>Login</SubmitButton>
            </form>
        </Container>
        );
    };
}

export default Registration;
