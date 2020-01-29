import React, { Component } from "react";
import { connect } from "react-redux";
import { get_current_profile } from "../../actions/profile";
import default_logo from "../../assets/img/default_profile.png";
import M from "materialize-css";
import { Link } from "react-router-dom";
import Loader from "../layout/loader/Loader";
import Sidenav from "../layout/sidenav/Sidenav";
import { IconContext } from "react-icons";
import {
  FaYoutubeSquare,
  FaTwitterSquare,
  FaFacebookSquare,
  FaLinkedin,
  FaInstagram
} from "react-icons/fa";

class Dashboard extends Component {
  componentDidMount = () => {
    this.props.get_current_profile();
    M.Tabs.init(this.Tabs);
  };

  display_dashboard_component = () => {
    const { loading_profile } = this.props.profile;

    if (loading_profile) {
      return (
        <div className="container mt-50">
          <div className="row">
            <div className="col m12 center-align">
              <Loader />
            </div>
          </div>
        </div>
      );
    } else {
      const { active_component } = this.props.sidenav;

      switch (active_component) {
        case "profile":
          return this.output_profile();

        default:
          break;
      }
    }
  };

  output_profile = () => {
    const { first_name, last_name } = this.props.auth.user;
    const {
      youtube,
      twitter,
      facebook,
      linkedin,
      instagram
    } = this.props.profile.active_profile.social_media;
    const { skills } = this.props.profile.active_profile;
    const skill_items = skills.map((skill, i) => (
      <li key={i} className="collection-item">
        {skill}
      </li>
    ));
    const { interests } = this.props.profile.active_profile;
    const interest_items = interests.map((interest, i) => (
      <li key={i} className="collection-item">
        {interest}
      </li>
    ));
    return (
      <div className="container mt-50">
        <div className="row">
          <div className="col m9 offset-m1">
            <div className="component-heading">
              {first_name} {last_name}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col m9 offset-m1">
            <div className="profile-subheading">Skills</div>
            {/* https://codepen.io/RobotsPlay/pen/zNQKmd */}
            <ul className="comma-list">{skill_items}</ul>
          </div>
          <div className="col m2 center-align">
            <Link to={"/edit-profile"} className="btn btn-mernbook">
              <i className="material-icons">mode_edit</i>
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col m9 offset-m1">
            <div className="profile-subheading">Interests</div>
            {/* https://codepen.io/RobotsPlay/pen/zNQKmd */}
            <ul className="comma-list">{interest_items}</ul>
          </div>
        </div>
        <div className="row">
          <div className="col m9 offset-m1">
            <div className="profile-subheading">Social Media</div>
            <div className="row mt-15">
              <div className="col m1">
                <a href={youtube}>
                  <IconContext.Provider
                    value={{
                      className: "social-media-icon youtube-icon"
                    }}
                  >
                    <div>
                      <FaYoutubeSquare />
                    </div>
                  </IconContext.Provider>
                </a>
              </div>
              <div className="col m1">
                <a href={twitter}>
                  <IconContext.Provider
                    value={{
                      className: "social-media-icon twitter-icon"
                    }}
                  >
                    <div>
                      <FaTwitterSquare />
                    </div>
                  </IconContext.Provider>
                </a>
              </div>
              <div className="col m1">
                <a href={facebook}>
                  <IconContext.Provider
                    value={{
                      className: "social-media-icon facebook-icon"
                    }}
                  >
                    <div>
                      <FaFacebookSquare />
                    </div>
                  </IconContext.Provider>
                </a>
              </div>
              <div className="col m1">
                <a href={linkedin}>
                  <IconContext.Provider
                    value={{
                      className: "social-media-icon linkedin-icon"
                    }}
                  >
                    <div>
                      <FaLinkedin />
                    </div>
                  </IconContext.Provider>
                </a>
              </div>
              <div className="col m1">
                <a href={instagram}>
                  <IconContext.Provider
                    value={{
                      className: "social-media-icon instagram-icon"
                    }}
                  >
                    <div>
                      <FaInstagram />
                    </div>
                  </IconContext.Provider>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  output_experience = () => {
    const { loading_profile } = this.props.profile;
    if (loading_profile) {
      return (
        <div className="row">
          <div className="col m12 center-align">
            <Loader />
          </div>
        </div>
      );
    } else {
      const { experience } = this.props.profile.active_profile;
      const experience_items = experience.map(item => (
        <div className="row">
          <div className="col m12 card">
            <div className="card-content">
              <span className="card-title">{item.title}</span>
              <div className="company">{item.company}</div>
              <div className="job-location">{item.job_location}</div>
              <div className="description">{item.description}</div>
              <div className="from-date">{item.from_date}</div>
              <div className="to-date">{item.to_date}</div>
            </div>
          </div>
        </div>
      ));
      return experience_items;
    }
  };

  output_education = () => {
    return <div>EDUCATION</div>;
  };

  output_social_media = () => {
    return <div>SOCIAL MEDIA</div>;
  };

  render() {
    return (
      <div>
        {this.display_dashboard_component()}
        <Sidenav />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  sidenav: state.sidenav
});

export default connect(mapStateToProps, { get_current_profile })(Dashboard);
