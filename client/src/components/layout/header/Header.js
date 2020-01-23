import React, { Component } from "react";
import logo_nav from '../../../assets/img/mernbook_nav.PNG';


class Header extends Component {
  render() {
    return (
      <nav className="landing-nav">
        <div className="container">
          <div class="nav-wrapper">
            <a href="#" class="brand-logo">
              <img className="logo-nav" src={logo_nav} alt=""/>
            </a>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
              <li>
                <a href="sass.html">Login</a>
              </li>
              <li>
                <a href="badges.html">Register</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
