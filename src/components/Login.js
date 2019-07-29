import React, { Component } from "react";
import { Users } from "../Firebase";
import _ from "lodash";
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
    Users.push(user);
    console.log(user);
    this.setState({
      email: "",
      password: ""
    });
  }
  componentDidMount() {
    Users.on("value", snapshot => {
      this.setState({
        Users: snapshot.val()
      });
    });
  }
  //render post from firebase
  onrenderpost() {
    return _.map(this.state.Users, (user, key) => {
      return (
        <div key={key}>
          <div className="container">
            <div className="card">
              <div className="card-body">
                <h1 className="card-title">{user.email}</h1>
                <p className="card-text">{user.password}</p>
                <button className="btn btn-danger m-2">Delete</button>
                <button className="btn btn-warning">Update</button>
              </div>
            </div>
            <br />
          </div>
        </div>
      );
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
            <br />
            <input
              value={this.state.password}
              type="text"
              name="password"
              ref="password"
              placeholder="Enter Your password"
              onChange={this.onChangeLogin}
              className="form-control"
            />
            <br />
            <button className="btn btn-primary btn-block">Login</button>
          </form>
          <br />
          {this.onrenderpost()}
        </div>
      </div>
    );
  }
}

export default Login;
