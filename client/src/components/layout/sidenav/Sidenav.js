import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import default_profile from "../../../assets/img/default_profile.png";
import { sidenav_click } from "../../../actions/sidenav";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import LoaderMini from "../loader_mini/LoaderMini";

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

    // this.updateWindowDimensions();
    // window.addEventListener("resize", this.updateWindowDimensions);
  }

  handle_sidenav_click = e => {
    this.props.sidenav_click(e.target.name);
  };

  render_news_feed_label = () => {
    const { browsing } = this.props;

    const { loading_profile } = this.props.profile;

    if (loading_profile) {
      return "News Feed";
    } else {
      if (browsing) {
        const { first_name, last_name } = this.props.profile.profile.user;
        return `${first_name} ${last_name}`;
      } else {
        return "News Feed";
      }
    }
  };

  render_profile_image = () => {
    const { profile_image_id } = this.props.profile.profile;
    if (this.props.browsing) {
      return (
        <img
          className="responsive-img"
          src={`/api/profile/profile_image/${profile_image_id}`}
          alt="Profile Image"
        />
      );
    } else {
      return (
        <div className="sidenav-img-container">
          <img
            className="responsive-img"
            src={`/api/profile/profile_image/${profile_image_id}`}
            alt="Profile Image"
          />
          <div className="sidenav-img-update-wrapper">
            <Link to={"/profile/image/update"}>
              <i className="material-icons add-photo-icon">add_a_photo</i>
            </Link>
          </div>
        </div>
      );
    }
  };

  render() {
    const { active_component } = this.props.sidenav;
    const { loading_profile } = this.props.profile;
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
            {loading_profile ? <LoaderMini /> : this.render_profile_image()}
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
                {this.render_news_feed_label()}
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
          {!this.props.browsing && (
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
  sidenav: state.sidenav,
  profile: state.profile
});

export default connect(mapStateToProps, { sidenav_click })(Sidenav);
