import React from "react";
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

class Login extends React.Component {
  state = {
    username: "",
    password: "",
  };

  onLogin = (event) => {
    event.preventDefault();
    const { switchView } = this.props; 
    console.log("logging in");
    // console.log(this.state);
    axios
      .post("http://localhost:8080/user/login", this.state)
      .then((response) => {
            console.log("logined user:", response.data);
            const { data } = response;
            if (data !== null && data.authToken !== null) {
                switchView("authorized")
            }
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

  onRegistration = (event) => {
      const { switchView } = this.props;
      event.preventDefault();
      switchView("registration");
  }

  render() {
    return (
      <Container>
        <PageHeader>User Login</PageHeader>
        <form onSubmit={this.onSubmit}>
          <UserInput
            name="username"
            className="form-control"
            placeholder="User Name"
            onChange={this.onChange}
          />
          <UserInput
            name="password"
            className="form-control"
            placeholder="Password"
            onChange={this.onChange}
            type="password"
          />
          <SubmitButton className="btn btn-primary" onClick={this.onLogin}>Login</SubmitButton>
          <SubmitButton className="btn btn-default" onClick={this.onRegistration}>Register</SubmitButton>
        </form>
      </Container>
    );
  }
}

export default Login;
