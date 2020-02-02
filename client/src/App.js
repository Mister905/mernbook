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
import CreateExperience from "./components/profile/experience/create_experience/CreateExperience";
import EditExperience from "./components/profile/experience/edit_experience/EditExperience";
import CreateEducation from "./components/profile/education/create_education/CreateEducation";
import EditEducation from "./components/profile/education/edit_education/EditEducation";
import Sidenav from "./components/layout/sidenav/Sidenav";
import UpdateProfileImage from "./components/profile/update_profile_image/UpdateProfileImage";
import ViewExperience from "./components/profile/experience/view_experience/ViewExperience";
import ViewEducation from "./components/profile/education/view_education/ViewEducation";
import Account from "./components/account/Account";
import ViewProfile from "./components/profile/view_profile/ViewProfile";
import CreatePost from "./components/post/create_post/CreatePost";
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
            <PrivateRoute exact path="/edit-profile" component={EditProfile} />
            <PrivateRoute
              exact
              path="/experience/create"
              component={CreateExperience}
            />
            <PrivateRoute
              exact
              path="/experience/:id/edit"
              component={EditExperience}
            />
            <PrivateRoute
              exact
              path="/experience/:id"
              component={ViewExperience}
            />
            <PrivateRoute
              exact
              path="/education/create"
              component={CreateEducation}
            />
            <PrivateRoute
              exact
              path="/education/:id/edit"
              component={EditEducation}
            />
            <PrivateRoute
              exact
              path="/education/:id"
              component={ViewEducation}
            />

            <PrivateRoute
              exact
              path="/profile-image"
              component={UpdateProfileImage}
            />

            <PrivateRoute
              exact
              path="/profile/:profile_id"
              component={ViewProfile}
            />

            <PrivateRoute exact path="/post/create" component={CreatePost} />

            <PrivateRoute exact path="/account" component={Account} />
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
