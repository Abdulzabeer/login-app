import React, { Component } from "react";
import { database } from "../Firebase";
export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.onChangeLogin = this.onChangeLogin.bind(this);
    this.onSubmitUser = this.onSubmitUser.bind(this);
  }
  onChangeLogin(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  onSubmitUser(e) {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    database.push(user);
    console.log(user);
    this.setState({
      title: "",
      body: ""
    });
  }
  render() {
    return (
      <div>
        <div className="container">
          <form onSubmit={this.onSubmitUser}>
            <h1 className="text-center">Add Users</h1>
            <input
              value={this.state.email}
              type="email"
              name="email"
              ref="email"
              placeholder="Enter Your Email"
              onChange={this.onChangeLogin}
              className="form-control"
            />
            <input
              value={this.state.password}
              type="text"
              name="password"
              ref="password"
              placeholder="Enter Your password"
              onChange={this.onChangeLogin}
              className="form-control"
            />
          </form>
          <button className="btn btn-primary btn-block">Login</button>
        </div>
      </div>
    );
  }
}

export default Login;
