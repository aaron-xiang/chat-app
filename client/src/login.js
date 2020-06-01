import ReactDom from "react-dom";
import React from "react";
import axios from "axios";

const inputStyles = {
  width: "25%",
};

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  onSubmit = (event) => {
    event.preventDefault();
    console.log("logging in");
    // console.log(this.state);
    axios
      .post("http://localhost:8080/user/login", this.state)
      .then((response) => {
        console.log("logined user:", response.data);
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

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="username"
          className="form-control"
          style={inputStyles}
          placeholder="User Name"
          onChange={this.onChange}
        />
        <input
          name="password"
          className="form-control"
          style={inputStyles}
          placeholder="Password"
          onChange={this.onChange}
          type="password"
        />
        <button className="btn btn-primary">Login</button>
      </form>
    );
  }
}

ReactDom.render(<Home />, document.getElementById("app"));
