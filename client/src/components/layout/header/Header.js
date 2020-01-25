import React, { Component } from "react";
import logo_nav from "../../../assets/img/mernbook_nav.PNG";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { logout_user } from "../../../actcions/auth";

class Header extends Component {
  handle_logout = () => {
    this.props.logout_user(this.props.history);
  };

  render() {
    const { is_authenticated } = this.props.auth;
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
                  <a onClick={this.handle_logout}>Logout</a>
                </li>
              </ul>
            ) : (
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li>
                  <Link to={"/register"}>Register</Link>
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
