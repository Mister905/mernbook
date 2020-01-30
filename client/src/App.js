import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { load_user } from "./actions/auth";

// COMPONENTS
import LoadingScreen from "./components/layout/loading_screen/LoadingScreen";
import Header from "./components/layout/header/Header";
import Landing from "./components/landing/Landing";
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/auth/login/Login";
import Register from "./components/auth/register/Register";
import Alert from "./components/layout/alert/Alert";
import EditProfile from "./components/profile/edit_profile/EditProfile";
import CreateExperience from "./components/profile/create_experience/CreateExperience";
import CreateEducation from "./components/profile/create_education/CreateEducation";
import Sidenav from "./components/layout/sidenav/Sidenav";
import UpdateProfileImage from "./components/profile/update_profile_image/UpdateProfileImage";
import PrivateRoute from "./components/private_route/PrivateRoute";

class App extends Component {
  componentDidMount = () => {
    this.props.load_user();
  };

  componentDidUpdate = prevProps => {
    if (this.props.auth.is_authenticated !== prevProps.auth.is_authenticated) {
      if (this.props.auth.is_authenticated) this.props.load_user();
    }
  };

  render() {
    const { loading_user, is_authenticated } = this.props.auth;
    return (
      <div>
        <BrowserRouter>
          <Header />
          <Alert />
          <Switch>
            {loading_user && <LoadingScreen />}
            <Route
              exact
              path="/"
              component={is_authenticated ? Dashboard : Landing}
            />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            {/* <PrivateRoute exact path="/dashboard" component={Dashboard} /> */}
            <PrivateRoute exact path="/edit-profile" component={EditProfile} />
            <PrivateRoute
              exact
              path="/create-experience"
              component={CreateExperience}
            />
            <PrivateRoute
              exact
              path="/create-education"
              component={CreateEducation}
            />
            <PrivateRoute
              exact
              path="/profiles/image/update"
              component={UpdateProfileImage}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { load_user })(App);
