import React, { Component } from "react";
import logo_nav from "../../../assets/img/mernbook_nav.png";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { logout_user } from "../../../actions/auth";

class Header extends Component {
  state = {
    show_dropdown: false
  };

  handle_logout = () => {
    this.props.logout_user(this.props.history);
  };

  render() {
    const { is_authenticated } = this.props.auth;
    console.log(is_authenticated)
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
              <div className="dropdown right hide-on-med-and-down">
                <ul className="dropdown_menu">
                  <li className="dropdown_menu-item">
                    <a className="dropdown-link valign-wrapper fw-600">
                      {first_name}
                      <i className="material-icons right account-icon">
                        account_circle
                      </i>
                    </a>
                    <div>
                      <ul className="dropdown_submenu">
                        <li className="dropdown_submenu-item ">
                          <a>
                            <i className="material-icons left account-icon">
                              menu
                            </i>
                            Dashboard
                          </a>
                        </li>
                        <li className="dropdown_submenu-item ">
                          <a>
                            <i className="material-icons left account-icon">
                              settings
                            </i>
                            Account
                          </a>
                        </li>
                        <li className="dropdown_submenu-item ">
                          <a onClick={this.handle_logout}>
                            <i className="material-icons left account-icon">
                              exit_to_app
                            </i>
                            Logout
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            ) : (
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li>
                  <Link to={"/register"} className="mr-35 fw-600">
                    Register
                  </Link>
                </li>
                <li>
                  <Link to={"/login"} className="fw-600">
                    Login
                  </Link>
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
