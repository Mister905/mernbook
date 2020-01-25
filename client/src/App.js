import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import { load_user } from "./actions/auth";

// COMPONENTS
import LoadingScreen from './components/layout/loading_screen/LoadingScreen';
import Header from "./components/layout/header/Header";
import Landing from "./components/landing/Landing";
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/auth/login/Login";
import Register from "./components/auth/register/Register";
import Alert from "./components/layout/alert/Alert";
import PrivateRoute from './components/private_route/PrivateRoute';

// https://www.npmjs.com/package/react-alert
const options = {
  position: positions.MIDDLE_RIGHT,
  timeout: 5000,
  offset: "30px",
  transition: transitions.SCALE
};

const AlertTemplate = props => {
  const { type } = props.options;
  if (type === "error") {
    return (
      <div className="card custom-alert custom-error">
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
  componentDidMount = () => {
    this.props.load_user();
  };

  render() {
    const { loading_user } = this.props.auth;
    return (
      <div>
        <AlertProvider template={AlertTemplate} {...options}>
          <BrowserRouter>
            <Header />
            <Alert />
            <Switch>
              { loading_user && <LoadingScreen /> }
              <Route exact path="/" component={Landing} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
          </BrowserRouter>
        </AlertProvider>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { load_user} )(App);
