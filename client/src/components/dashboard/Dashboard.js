import React, { Component } from "react";
import { connect } from "react-redux";
import { get_current_profile } from "../../actions/profile";
import default_logo from "../../assets/img/default_profile.png";
import M from "materialize-css";
import { Link } from "react-router-dom";
import Loader from "../layout/loader/Loader";
import Sidenav from "../layout/sidenav/Sidenav";

class Dashboard extends Component {

  componentDidMount = () => {
    this.props.get_current_profile();
    M.Tabs.init(this.Tabs);
  };

  output_skills = () => {
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
      const { skills } = this.props.profile.active_profile;
      const list_items = skills.map(skill => (
        <li className="collection-item">{skill}</li>
      ));
      return (
        <div className="row">
          <div className="col m12">
            {/* https://codepen.io/RobotsPlay/pen/zNQKmd */}
            <ul className="comma-list">{list_items}</ul>
          </div>
        </div>
      );
    }
  };

  output_interests = () => {
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
      const { interests } = this.props.profile.active_profile;
      const interest_items = interests.map(interest => (
        <li className="collection-item">{interest}</li>
      ));
      return (
        <div className="row">
          <div className="col m12">
            {/* https://codepen.io/RobotsPlay/pen/zNQKmd */}
            <ul className="comma-list">{interest_items}</ul>
          </div>
        </div>
      );
    }
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
            <div class="card-content">
              <span class="card-title">{item.title}</span>
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
        <div className="container mt-50">
          {/* <div className="row">
          <div className="col m12">
            <div className="row">
              <div className="col m3">
                <img
                  src={default_logo}
                  alt="Profile Image"
                  className="responsive-img"
                />
              </div>
              <div className="col m9">
                <div className="row">
                  <div className="col m10">
                    <div className="component-heading">
                      {first_name} {last_name}
                    </div>
                  </div>
                  <div className="col m2 center-align">
                    <Link to={"edit-profile"}>
                      <button className="btn btn-mernbook btn-edit-profile">
                        <i className="material-icons">mode_edit</i>
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="row">
                  <div className="col m12">
                    <ul
                      ref={Tabs => {
                        this.Tabs = Tabs;
                      }}
                      id="dashboard-tabs"
                      className="tabs"
                    >
                      <li className="tab col m2">
                        <a href="#test-swipe-1">Skills</a>
                      </li>
                      <li className="tab col m2">
                        <a href="#test-swipe-2">Interests</a>
                      </li>
                      <li className="tab col m2">
                        <a href="#test-swipe-3">Experience</a>
                      </li>
                      <li className="tab col m2">
                        <a href="#test-swipe-4">Education</a>
                      </li>
                      <li className="tab col m2">
                        <a href="#test-swipe-5">Social Media</a>
                      </li>
                    </ul>

                    <div id="test-swipe-1" className="col m12">
                      {this.output_skills()}
                    </div>
                    <div id="test-swipe-2" className="col m12">
                      {this.output_interests()}
                    </div>
                    <div id="test-swipe-3" className="col m12">
                      <div className="row mt-25">
                        <div className="col m6 offset-m2 center-align">
                          <div className="tab-body-heading">Experience</div>
                        </div>
                        <div className="col m2 center-align">
                          <Link
                            to={"/create-experience"}
                            className="btn btn-mernbook"
                          >
                            <i className="material-icons">add</i>
                          </Link>
                        </div>
                      </div>
                      {this.output_experience()}
                    </div>
                    <div id="test-swipe-4" className="col m12">
                      <div className="row mt-25">
                        <div className="col m6 offset-m2 center-align">
                          <div className="tab-body-heading">Education</div>
                        </div>
                        <div className="col m2 center-align">
                          <Link
                            to={"/create-education"}
                            className="btn btn-mernbook"
                          >
                            <i className="material-icons">add</i>
                          </Link>
                        </div>
                      </div>
                      {this.output_education()}
                    </div>
                    <div id="test-swipe-5" className="col m12">
                      {this.output_social_media()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        </div>
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
