import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthenticationService from "./AuthenticationService.js";

class AuthenticatedRoute extends Component {
  render() {
    if (AuthenticationService.isUserLoggedIn()) {
      return <Route {...this.props} />;
    } else {
      return <Redirect to="/login" />;
      // isUserLoggedIn false ise /login sayfasına yönlendir
    }
  }
}

export default AuthenticatedRoute;
