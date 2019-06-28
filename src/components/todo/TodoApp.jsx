import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HeaderComponent from "./HeaderComponent.jsx";
import AuthenticatedRoute from "./AuthenticatedRoute.jsx";
import LoginComponent from "./LoginComponent.jsx";
import ListTodosComponent from "./ListTodosComponent.jsx";
import LogoutComponent from "./LogOutComponent.jsx";
import WelcomeComponent from "./WelcomeComponent.jsx";
import ErrorComponent from "./ErrorComponent.jsx";
import TodoComponent from "./TodoComponent.jsx";

class TodoApp extends Component {
  render() {
    return (
      <div className="TodoApp">
        <Router>
          <>
            <HeaderComponent />
            <Switch>
              <Route path="/" exact component={LoginComponent} />
              <Route path="/login" component={LoginComponent} />
              <AuthenticatedRoute
                path="/welcome/:name"
                component={WelcomeComponent}
              />
              <AuthenticatedRoute path="/todos/:id" component={TodoComponent} />
              <AuthenticatedRoute
                path="/todos"
                component={ListTodosComponent}
              />
              <AuthenticatedRoute path="/logout" component={LogoutComponent} />

              <Route component={ErrorComponent} />
            </Switch>
          </>
        </Router>
      </div>
    );
  }
}

export default TodoApp;
