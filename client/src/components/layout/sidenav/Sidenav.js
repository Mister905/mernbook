import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import default_profile from "../../../assets/img/default_profile.png";
import { sidenav_click } from "../../../actions/sidenav";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

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
  }

  handle_sidenav_click = e => {
    this.props.sidenav_click(e.target.name);
  };

  render() {
    const { active_component } = this.props.sidenav;

    return (
      <div>
        <ul
          ref={Sidenav => {
            this.Sidenav = Sidenav;
          }}
          id="mernbook-sidenav"
          className="sidenav sidenav-fixed custom-sidenav"
        >
          <li className="center-align">
            <div className="sidenav-img-container">
              <img src={default_profile} alt="Avatar" className="image" />
              <div className="sidenav-img-update-wrapper">
                <Link to={"/profiles/image/update"}>
                  <i className="material-icons add-photo-icon">add_a_photo</i>
                </Link>
              </div>
            </div>
          </li>
          <div className="sidenav-section">
            <li>
              <a
                onClick={e => this.handle_sidenav_click(e)}
                className={
                  active_component === "profile"
                    ? "waves-effect active-sidenav-link"
                    : "waves-effect"
                }
                name="profile"
              >
                Profile
              </a>
            </li>
          </div>
          <div className="sidenav-section">
            <li>
              <a
                onClick={e => this.handle_sidenav_click(e)}
                className={
                  active_component === "posts"
                    ? "waves-effect active-sidenav-link"
                    : "waves-effect"
                }
                name="posts"
              >
                Posts
              </a>
            </li>
          </div>
          <div className="sidenav-section">
            <li>
              <a
                onClick={e => this.handle_sidenav_click(e)}
                className={
                  active_component === "experience"
                    ? "waves-effect active-sidenav-link"
                    : "waves-effect"
                }
                name="experience"
              >
                Experience
              </a>
            </li>
          </div>
          <div className="sidenav-section">
            <li>
              <a
                onClick={e => this.handle_sidenav_click(e)}
                className={
                  active_component === "education"
                    ? "waves-effect active-sidenav-link"
                    : "waves-effect"
                }
                name="education"
              >
                Education
              </a>
            </li>
          </div>
        </ul>
        <a
          href="#!"
          data-target="mernbook-sidenav"
          className="sidenav-trigger hide-on-med-and-up"
        >
          <i className="material-icons">menu</i>
        </a>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  sidenav: state.sidenav
});

export default connect(mapStateToProps, { sidenav_click })(Sidenav);
