import React, { Component } from "react";
import { connect } from "react-redux";
import { get_profile } from "../../actions/profile";
import { get_experience } from "../../actions/experience";
import { get_education } from "../../actions/education";
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
import Moment from "moment";

class Dashboard extends Component {
  componentDidMount = () => {
    this.props.get_profile();
    this.props.get_experience();
    this.props.get_education();
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
    } = this.props.profile.profile.social_media;

    const { skills } = this.props.profile.profile;

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

    const { interests } = this.props.profile.profile;

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

    const { biography } = this.props.profile.profile;

    return (
      <div className="container dashboard-container mt-50">
        <div className="row valign-wrapper">
          <div className="col m8 offset-m1 s8 offset-s2">
            <div className="component-heading">
              {first_name} {last_name}
            </div>
          </div>
          <div className="col m1 right-align">
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
            {biography ? (
              <p>{biography}</p>
            ) : (
              <p>You haven't created your biography</p>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col m9 offset-m1 s6 offset-s3">
            <div className="profile-subheading">Social Media</div>
            <div className="row mt-50">
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
    const { loading_experience_list } = this.props.experience;

    if (loading_experience_list) {
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
      const { first_name, last_name } = this.props.auth.user;
      const { experience_list } = this.props.experience;
      let experience_output = null;
      if (experience_list.length > 0) {
        experience_output = experience_list.map(item => (
          <div className="row" key={item._id}>
            <div className="col m12 s12 card">
              <div className="card-content">
                <Link to={`/experience/${item._id}`}>
                  <span className="profile-title">{item.title}</span>
                </Link>
                <div className="company">{item.company}</div>
                <div className="job-location">{item.job_location}</div>
                <div className="description">{item.description}</div>
                <div className="era right fw-600">
                  {Moment(item.from_date).format("YYYY")} -
                  {item.to_date
                    ? Moment(item.to_date).format(" YYYY")
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
          <div className="row valign-wrapper">
            <div className="col m8 offset-m1 s6 offset-s3">
              <div className="component-heading">
                {first_name} {last_name}
              </div>
            </div>
            <div className="col m1">
              <Link to={"/experience/create"} className="btn btn-mernbook">
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
    const { loading_education_list } = this.props.education;
    if (loading_education_list) {
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
      const { first_name, last_name } = this.props.auth.user;
      const { education_list } = this.props.education;
      let education_output = null;
      if (education_list.length > 0) {
        education_output = education_list.map(item => (
          <div className="row" key={item._id}>
            <div className="col m12 s12 card">
              <div className="card-content">
                <Link to={`/education/${item._id}`}>
                  <span className="profile-title">{item.institution}</span>
                </Link>
                <div className="company">{item.credential}</div>
                <div className="job-location">{item.field_of_study}</div>
                <div className="description">{item.description}</div>
                <div className="era right">
                  {Moment(item.from_date).format("YYYY")} -
                  {item.to_date
                    ? Moment(item.to_date).format(" YYYY")
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
          <div className="row valign-wrapper">
            <div className="col m8 offset-m1 s6 offset-s3">
              <div className="component-heading">
                {first_name} {last_name}
              </div>
            </div>
            <div className="col m1 right-align">
              <Link to={"/education/create"} className="btn btn-mernbook">
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
  sidenav: state.sidenav,
  experience: state.experience,
  education: state.education
});

export default connect(mapStateToProps, {
  get_profile,
  get_experience,
  get_education
})(Dashboard);
