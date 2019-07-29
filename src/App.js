import React, { Component } from "react";
import Login from "./components/Login";
import NavbarComponent from "./components/NavbarComponent";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Posts from "./components/Posts";
import AllLogin from "./components/AllLogin";
import Home from "./components/Home";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <NavbarComponent />

          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/post" component={Posts} />
            <Route path="/login" component={AllLogin} />
            <Route path="/adduser" component={Login} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
