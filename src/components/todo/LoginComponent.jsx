import React, { Component } from "react";
import AuthenticationService from "./AuthenticationService.js";

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "user",
      password: "",
      hasLoginFailed: false,
      showSuccessMessage: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.loginClicked = this.loginClicked.bind(this);
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  loginClicked() {
    if (this.state.username === "user" && this.state.password === "dummy") {
      AuthenticationService.registerSuccesfulLogin(
        this.state.username,
        this.state.password
      ); // session storage'a kayıt
      this.props.history.push(`/welcome/${this.state.username}`); // go to welcome page
    } else {
      this.setState({ hasLoginFailed: true });
      this.setState({ showSuccessMessage: false });
    }
  }
  render() {
    return (
      <div className="container">
        {this.state.hasLoginFailed && (
          <div className="alert alert-warning">invalid credential</div>
        )}
        {this.state.showSuccessMessage && <div>login successfull</div>}
        <input
          type="text"
          name="username"
          value={this.state.username}
          onChange={this.handleChange}
        />
        Password:{" "}
        <input
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.handleChange}
        />
        <button className="btn" onClick={this.loginClicked}>
          Login
        </button>
      </div>
    );
  }
}
export default LoginComponent;
