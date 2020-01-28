import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import default_profile from "../../../assets/img/default_profile.png";

class Sidenav extends Component {
  componentDidMount() {
    const options = {
      inDuration: 250,
      outDuration: 200,
      draggable: true
    };
    M.Sidenav.init(this.Sidenav);

    let instance = M.Sidenav.getInstance(this.Sidenav);
    instance.open();
    console.log(instance.isOpen);
  }
  render() {
    return (
      <div>
        <ul
          ref={Sidenav => {
            this.Sidenav = Sidenav;
          }}
          id="slide-out"
          className="sidenav sidenav-fixed custom-sidenav"
        >
          <li className="center-align">
            <img src={default_profile} className="responsive-img " />
          </li>
          <div className="sidenav-section">
            <li>
              <div className="divider" />
            </li>
            <li>
              <a href="#!" className="waves-effect">
                Profile
              </a>
            </li>
            <li>
              <div className="divider" />
            </li>
          </div>
          <div className="sidenav-section">
            <li>
              <div className="divider" />
            </li>
            <li>
              <a href="#!" className="waves-effect">
                Posts
              </a>
            </li>
            <li>
              <div className="divider" />
            </li>
          </div>
          <div className="sidenav-section">
            <li>
              <div className="divider" />
            </li>
            <li>
              <a href="#!" className="waves-effect">
                Skills
              </a>
            </li>
            <li>
              <div className="divider" />
            </li>
          </div>
          <div className="sidenav-section">
            <li>
              <div className="divider" />
            </li>
            <li>
              <a href="#!" className="waves-effect">
                Interests
              </a>
            </li>
            <li>
              <div className="divider" />
            </li>
          </div>
          <div className="sidenav-section">
            <li>
              <div className="divider" />
            </li>
            <li>
              <a href="#!" className="waves-effect">
                Experience
              </a>
            </li>
            <li>
              <div className="divider" />
            </li>
          </div>
          <div className="sidenav-section">
            <li>
              <div className="divider" />
            </li>
            <li>
              <a href="#!" className="waves-effect">
                Education
              </a>
            </li>
            <li>
              <div className="divider" />
            </li>
          </div>
          <div className="sidenav-section">
            <li>
              <div className="divider" />
            </li>
            <li>
              <a href="#!" className="waves-effect">
                Social Media
              </a>
            </li>
            <li>
              <div className="divider" />
            </li>
          </div>
        </ul>
        <a
          href="#!"
          data-target="slide-out"
          className="sidenav-trigger hide-on-med-and-up"
        >
          <i className="material-icons">menu</i>
        </a>
      </div>
    );
  }
}

export default Sidenav;
