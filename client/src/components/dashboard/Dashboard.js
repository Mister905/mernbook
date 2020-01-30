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
import moment from "moment";

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
        case "experience":
          return this.output_experience();
        case "education":
          return this.output_education();
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

    let skills_output = null;

    if (skills.length > 0) {
      skills_output = skills.map((skill, i) => (
        <li key={i} className="collection-item">
          {skill}
        </li>
      ));
    } else {
      skills_output = "You haven't defined any skills";
    }

    const { interests } = this.props.profile.active_profile;

    let interests_output = null;

    if (interests.length > 0) {
      interests_output = interests.map((interest, i) => (
        <li key={i} className="collection-item">
          {interest}
        </li>
      ));
    } else {
      interests_output = "You haven't defined any interests";
    }

    const { biography } = this.props.profile.active_profile;

    return (
      <div className="container dashboard-container mt-50">
        <div className="row">
          <div className="col m8 offset-m1 s8 offset-s2">
            <div className="component-heading">
              {first_name} {last_name}
            </div>
          </div>
          <div className="col">
            <Link to={"/edit-profile"} className="btn btn-mernbook">
              <i className="material-icons">mode_edit</i>
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col m9 offset-m1 s6 offset-s3">
            <div className="profile-subheading">Skills</div>
            {/* https://codepen.io/RobotsPlay/pen/zNQKmd */}
            <ul className="comma-list">{skills_output}</ul>
          </div>
        </div>
        <div className="row">
          <div className="col m9 offset-m1 s6 offset-s3">
            <div className="profile-subheading">Interests</div>
            {/* https://codepen.io/RobotsPlay/pen/zNQKmd */}
            <ul className="comma-list">{interests_output}</ul>
          </div>
        </div>
        <div className="row">
          <div className="col m9 offset-m1 s6 offset-s3">
            <div className="profile-subheading">Biography</div>
            <p>{biography}</p>
          </div>
        </div>
        <div className="row">
          <div className="col m9 offset-m1 s6 offset-s3">
            <div className="profile-subheading">Social Media</div>
            <div className="row mt-15">
              <div className="col m2 offset-m1 s12 social-media-col">
                <a href={youtube} target="_blank">
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
              <div className="col m2 s12 social-media-col">
                <a href={twitter} target="_blank">
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
              <div className="col m2 s12 social-media-col">
                <a href={facebook} target="_blank">
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
              <div className="col m2 s12 social-media-col">
                <a href={linkedin} target="_blank">
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
              <div className="col m2 s12 social-media-col">
                <a href={instagram} target="_blank">
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
      const { first_name, last_name } = this.props.auth.user;
      const { experience } = this.props.profile.active_profile;
      let experience_output = null;
      if (experience.length > 0) {
        experience_output = experience.map(item => (
          <div className="row" key={item._id}>
            <div className="col m12 s12 card">
              <div className="card-content">
                <Link to={`/edit-experience/${item._id}`}>
                  <span className="card-title profile-title">{item.title}</span>
                </Link>
                <div className="company">{item.company}</div>
                <div className="job-location">{item.job_location}</div>
                <div className="description">{item.description}</div>
                <div className="era right">
                  {moment(item.from_date).format("YYYY")} -
                  {item.to_date
                    ? moment(item.to_date).format(" YYYY")
                    : " Current"}
                </div>
              </div>
            </div>
          </div>
        ));
      } else {
        experience_output = "You haven't defined your experience";
      }
      return (
        <div className="container dashboard-container mt-50">
          <div className="row">
            <div className="col m8 offset-m1 s6 offset-s3">
              <div className="component-heading">
                {first_name} {last_name}
              </div>
            </div>
            <div className="col">
              <Link to={"/create-experience"} className="btn btn-mernbook">
                <i className="material-icons">add</i>
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col m9 offset-m1 s6 offset-s3">
              {experience_output}
            </div>
          </div>
        </div>
      );
    }
  };

  output_education = () => {
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
      const { first_name, last_name } = this.props.auth.user;
      const { education } = this.props.profile.active_profile;
      let education_output = null;
      if (education.length > 0) {
        education_output = education.map(item => (
          <div className="row" key={item._id}>
            <div className="col m12 s12 card">
              <div className="card-content">
                <Link to={`/edit-education/${item._id}`}>
                  <span className="card-title profile-title">{item.institution}</span>
                </Link>
                <div className="company">{item.credential}</div>
                <div className="job-location">{item.field_of_study}</div>
                <div className="description">{item.description}</div>
                <div className="era right">
                  {moment(item.from_date).format("YYYY")} -
                  {item.to_date
                    ? moment(item.to_date).format(" YYYY")
                    : " Current"}
                </div>
              </div>
            </div>
          </div>
        ));
      } else {
        education_output = "You haven't defined your education";
      }

      return (
        <div className="container dashboard-container mt-50">
          <div className="row">
            <div className="col m8 offset-m1 s6 offset-s3">
              <div className="component-heading">
                {first_name} {last_name}
              </div>
            </div>
            <div className="col">
              <Link to={"/create-education"} className="btn btn-mernbook">
                <i className="material-icons">add</i>
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col m9 offset-m1 s6 offset-s3">
              {education_output}
            </div>
          </div>
        </div>
      );
    }
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
