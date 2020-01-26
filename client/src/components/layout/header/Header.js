import React, { Component } from "react";
import logo_nav from "../../../assets/img/mernbook_nav.png";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { logout_user } from "../../../actions/auth";

class Header extends Component {
  handle_logout = () => {
    this.props.logout_user(this.props.history);
  };

  render() {
    const { is_authenticated } = this.props.auth;
    const { first_name } = this.props.auth.user;

    return (
      <nav className="landing-nav">
        <div className="container">
          <div className="nav-wrapper">
            <Link
              className="brand-logo"
              to={is_authenticated ? "/dashboard" : "/"}
            >
              <img className="logo-nav" src={logo_nav} alt="" />
            </Link>
            {is_authenticated ? (
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li>
                  <Link to={"/dashboard"} className="mr-35">
                    Dasboard
                  </Link>
                </li>
                <li>
                  <div className="valign-wrapper mr-35">
                    <i className="material-icons">account_circle</i>
                    <span className="nav-name">{first_name}</span>
                  </div>
                </li>
                <li>
                  <a onClick={this.handle_logout}>Logout</a>
                </li>
              </ul>
            ) : (
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li>
                  <Link to={"/register"} className="mr-35">Register</Link>
                </li>
                <li>
                  <Link to={"/login"}>Login</Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default compose(
  connect(mapStateToProps, { logout_user }),
  withRouter
)(Header);
