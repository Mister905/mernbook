import React, { Component } from "react";
import logo_nav from "../../../assets/img/mernbook_nav.png";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <nav className="landing-nav">
        <div className="container">
          <div className="nav-wrapper">
            <Link className="brand-logo" to={"/"}>
              <img className="logo-nav" src={logo_nav} alt="" />
            </Link>

            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li>
                <Link to={"/register"}>Register</Link>
              </li>
              <li>
                <Link to={"/login"}>Login</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
