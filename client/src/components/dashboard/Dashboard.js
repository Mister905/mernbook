import React, { Component } from "react";
import { connect } from "react-redux";
import { get_current_profile } from "../../actions/profile";
import default_logo from "../../assets/img/default_profile.png";
import M from "materialize-css";
import { Link } from "react-router-dom";

class Dashboard extends Component {
  componentDidMount = () => {
    this.props.get_current_profile();

    M.Tabs.init(this.Tabs);
  };

  componentDidUpdate = prevProps => {};

  render() {
    const { first_name, last_name } = this.props.auth.user;
    const { profile } = this.props.profile;
    return (
      <div className="container mt-50">
        <div className="row">
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
                      Skills
                    </div>
                    <div id="test-swipe-2" className="col m12">
                      Interests
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
                    </div>
                    <div id="test-swipe-5" className="col m12">
                      Social Media
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { get_current_profile })(Dashboard);
