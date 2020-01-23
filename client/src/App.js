import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { transitions, positions, Provider as AlertProvider } from "react-alert";

// COMPONENTS
import Header from "./components/layout/header/Header";
import Landing from "./components/landing/Landing";
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/auth/login/Login";
import Register from "./components/auth/register/Register";
import Alert from "./components/layout/alert/Alert";

// https://www.npmjs.com/package/react-alert
const options = {
  position: positions.TOP_CENTER,
  timeout: 5000,
  offset: "30px",
  transition: transitions.SCALE
};

const AlertTemplate = props => {
  const { type } = props.options;
  if (type === "error") {
    return (
      <div className="card custom-alert custom-error bold-text">
        <i className="material-icons alert-icon">error_outline</i>
        {props.message}
      </div>
    );
  } else if (type === "success") {
    return (
      <div className="card custom-alert custom-success">
        <i className="material-icons alert-icon">check_circle</i>
        {props.message}
      </div>
    );
  }
};

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <AlertProvider template={AlertTemplate} {...options}>
            <Header />
            <Alert />
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
            </Switch>
          </AlertProvider>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(App);
