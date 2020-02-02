import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import default_profile from "../../../assets/img/default_profile.png";
import { sidenav_click } from "../../../actions/sidenav";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Sidenav extends Component {
  state = {
    width: 0,
    height: 0
  };

  componentDidMount() {
    const options = {
      inDuration: 250,
      outDuration: 200,
      draggable: true
    };
    M.Sidenav.init(this.Sidenav);

    let instance = M.Sidenav.getInstance(this.Sidenav);
    instance.open();

    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state !== prevState) {
      const { width } = this.state;
      if (width <= 1466) {
      }
    }
  };

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.updateWindowDimensions);
  };

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };

  handle_sidenav_click = e => {
    this.props.sidenav_click(e.target.name);
  };

  render() {
    const { active_component } = this.props.sidenav;

    const { browsing } = this.props;

    return (
      <div>
        <a
          href="#!"
          data-target="mernbook-sidenav"
          className="top-nav sidenav-trigger full hide-on-large-only custom-nav-trigger"
        >
          <i className="material-icons sidenav-icon">menu</i>
        </a>
        <ul
          ref={Sidenav => {
            this.Sidenav = Sidenav;
          }}
          id="mernbook-sidenav"
          className="sidenav sidenav-fixed custom-sidenav-fixed"
        >
          <li className="center-align">
            {browsing ? (
              <img src={default_profile} alt="Avatar" className="image" />
            ) : (
              <div className="sidenav-img-container">
                <img src={default_profile} alt="Avatar" className="image" />
                <div className="sidenav-img-update-wrapper">
                  <Link to={"/profiles/image/update"}>
                    <i className="material-icons add-photo-icon">add_a_photo</i>
                  </Link>
                </div>
              </div>
            )}
          </li>
          <div className="sidenav-section">
            <li>
              <a
                onClick={e => this.handle_sidenav_click(e)}
                className={
                  active_component === "news_feed"
                    ? "waves-effect sidenav-link active-sidenav-link"
                    : "waves-effect sidenav-link"
                }
                name="news_feed"
              >
                News Feed
              </a>
            </li>
          </div>
          <div className="sidenav-section">
            <li>
              <a
                onClick={e => this.handle_sidenav_click(e)}
                className={
                  active_component === "profile"
                    ? "waves-effect sidenav-link active-sidenav-link"
                    : "waves-effect sidenav-link"
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
                  active_component === "experience"
                    ? "waves-effect sidenav-link active-sidenav-link"
                    : "waves-effect sidenav-link"
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
                    ? "waves-effect sidenav-link active-sidenav-link"
                    : "waves-effect sidenav-link"
                }
                name="education"
              >
                Education
              </a>
            </li>
          </div>
          {!browsing && (
            <div className="sidenav-section">
              <li>
                <a
                  onClick={e => this.handle_sidenav_click(e)}
                  className={
                    active_component === "profiles"
                      ? "waves-effect sidenav-link active-sidenav-link"
                      : "waves-effect sidenav-link"
                  }
                  name="profiles"
                >
                  Profiles
                </a>
              </li>
            </div>
          )}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  sidenav: state.sidenav
});

export default connect(mapStateToProps, { sidenav_click })(Sidenav);
