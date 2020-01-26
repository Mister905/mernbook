import React, { Component } from "react";
import { connect } from "react-redux";
import { get_current_profile } from "../../actions/profile";
import default_logo from "../../assets/img/default_profile.png";
import M from "materialize-css";
import { Link } from 'react-router-dom';

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
            <div className="card">
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
                      <Link to={'edit-profile'}>
                        <button className="btn btn-mernbook btn-edit-profile"><i className="material-icons">mode_edit</i></button>
                      </Link>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col m12">
                      <ul
                        ref={Tabs => {
                          this.Tabs = Tabs;
                        }}
                        id="tabs-swipe-demo"
                        className="tabs"
                      >
                        <li className="tab col s3">
                          <a href="#test-swipe-1">Test 1</a>
                        </li>
                        <li className="tab col s3">
                          <a href="#test-swipe-2">Test 2</a>
                        </li>
                        <li className="tab col s3">
                          <a href="#test-swipe-3">Test 3</a>
                        </li>
                      </ul>

                      <div id="test-swipe-1" className="col s12 blue">
                        Test 1
                      </div>
                      <div id="test-swipe-2" className="col s12 red">
                        Test 2
                      </div>
                      <div id="test-swipe-3" className="col s12 green">
                        Test 3
                      </div>
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
