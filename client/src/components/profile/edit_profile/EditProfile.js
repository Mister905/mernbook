import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter, Link } from "react-router-dom";
import { withFormik, Form, Field } from "formik";
import { get_profile, update_profile } from "../../../actions/profile";
import Autocomplete from "../../../components/helpers/autocomplete/Autocomplete";
import ProfileStatusSelect from "../../../components/helpers/profile_status_select/ProfileStatusSelect";
import { IconContext } from "react-icons";
import {
  FaYoutubeSquare,
  FaTwitterSquare,
  FaFacebookSquare,
  FaLinkedin,
  FaInstagram
} from "react-icons/fa";
import M from "materialize-css";
import Loader from "../../layout/loader/Loader";

class EditProfileForm extends Component {
  componentDidMount = () => {
    const biography = document.getElementById("biography");
    M.textareaAutoResize(biography);
  };

  render() {
    return (
      <div className="container mt-50">
        <div className="row">
          <div className="col m2 center-align">
            <Link to={"/"} className="btn btn-mernbook">
              <i className="material-icons">arrow_back</i>
            </Link>
          </div>
          <div className="col m6 offset-m1 center-align">
            <div className="component-heading">Edit Profile</div>
          </div>
        </div>
        <Form>
          <div className="row mt-50">
            <div className="col m10 offset-m1 s12">
              <div className="row">
                <div className="col m6 offset-m3 s12">
                  <div className="custom-input-field">
                    <label
                      htmlFor="user_location"
                      className="custom-label mernbook-blue-text"
                    >
                      Location
                    </label>
                    <Field
                      component={Autocomplete}
                      id="user_location"
                      name="user_location"
                      field_name={"user_location"}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col m6 offset-m3 s12">
                  <div
                    id="profile-status-select"
                    className="custom-input-field"
                  >
                    <label
                      htmlFor="status"
                      className="custom-label mernbook-blue-text"
                    >
                      Status
                    </label>
                    <Field component={ProfileStatusSelect} name="status" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col m6 offset-m3 s12">
                  <div className="custom-input-field">
                    <label
                      htmlFor="skills"
                      className="custom-label mernbook-blue-text"
                    >
                      Skills
                    </label>
                    <Field
                      type="text"
                      id="skills"
                      name="skills"
                      placeholder="Comma-Separated Values e.g. HTML, CSS, JS"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col m6 offset-m3 s12">
                  <div className="custom-input-field">
                    <label
                      htmlFor="interests"
                      className="custom-label mernbook-blue-text"
                    >
                      Interests
                    </label>
                    <Field
                      type="text"
                      id="interests"
                      name="interests"
                      placeholder="Comma-Separated Values e.g. Chemistry, History, Geography"
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col m6 offset-m3 s12">
                  <div className="custom-input-field">
                    <label
                      htmlFor="interests"
                      className="custom-label mernbook-blue-text"
                    >
                      Biography
                    </label>
                    <Field
                      component="textarea"
                      id="biography"
                      name="biography"
                      className="materialize-textarea"
                      innerRef={this.biography_textarea}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col m6 offset-m3">
                  <div className="custom-input-field">
                    <label
                      htmlFor="social_media"
                      className="custom-label mernbook-blue-text"
                    >
                      Social Media
                    </label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col m6 offset-m3">
                  <div className="custom-input-field">
                    <div className="row">
                      <div className="col m2">
                        <IconContext.Provider
                          value={{
                            className: "social-media-icon youtube-icon"
                          }}
                        >
                          <div>
                            <FaYoutubeSquare />
                          </div>
                        </IconContext.Provider>
                      </div>
                      <div className="col m10">
                        <Field
                          type="text"
                          id="youtube"
                          name="youtube"
                          placeholder="Youtube"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col m6 offset-m3">
                  <div className="custom-input-field">
                    <div className="row">
                      <div className="col m2">
                        <IconContext.Provider
                          value={{
                            className: "social-media-icon twitter-icon"
                          }}
                        >
                          <div>
                            <FaTwitterSquare />
                          </div>
                        </IconContext.Provider>
                      </div>
                      <div className="col m10">
                        <Field
                          type="text"
                          id="twitter"
                          name="twitter"
                          placeholder="Twitter"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col m6 offset-m3">
                  <div className="custom-input-field">
                    <div className="row">
                      <div className="col m2">
                        <IconContext.Provider
                          value={{
                            className: "social-media-icon facebook-icon"
                          }}
                        >
                          <div>
                            <FaFacebookSquare />
                          </div>
                        </IconContext.Provider>
                      </div>
                      <div className="col m10">
                        <Field
                          type="text"
                          id="facebook"
                          name="facebook"
                          placeholder="Facebook"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col m6 offset-m3">
                  <div className="custom-input-field">
                    <div className="row">
                      <div className="col m2">
                        <IconContext.Provider
                          value={{
                            className: "social-media-icon linkedin-icon"
                          }}
                        >
                          <div>
                            <FaLinkedin />
                          </div>
                        </IconContext.Provider>
                      </div>
                      <div className="col m10">
                        <Field
                          type="text"
                          id="linkedin"
                          name="linkedin"
                          placeholder="Linkedin"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col m6 offset-m3">
                  <div className="custom-input-field">
                    <div className="row">
                      <div className="col m2">
                        <IconContext.Provider
                          value={{
                            className: "social-media-icon instagram-icon"
                          }}
                        >
                          <div>
                            <FaInstagram />
                          </div>
                        </IconContext.Provider>
                      </div>
                      <div className="col m10">
                        <Field
                          type="text"
                          id="instagram"
                          name="instagram"
                          placeholder="Instagram"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col m6 offset-m3">
                  <button
                    type="submit"
                    className="btn btn-mernbook right fw-600"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </div>
    );
  }
}

const EditProfileHOC = withFormik({
  mapPropsToValues: props => {
    const {
      user_location,
      status,
      skills,
      interests,
      biography
    } = props.props.profile.profile;

    const {
      youtube,
      twitter,
      facebook,
      linkedin,
      instagram
    } = props.props.profile.profile.social_media;

    return {
      user_location: user_location || "",
      status: status || "",
      skills: skills.toString().replace(/,/g, ", ") || "",
      interests: interests.toString().replace(/,/g, ", ") || "",
      biography: biography || "",
      youtube: youtube || "",
      twitter: twitter || "",
      facebook: facebook || "",
      linkedin: linkedin || "",
      instagram: instagram || ""
    };
  },

  handleSubmit: (values, props) => {
    const { update_profile, history } = props.props.props;
    update_profile(values, history);
  }
})(EditProfileForm);

class EditProfile extends Component {
  componentDidMount() {
    this.props.get_profile();
  }

  render() {
    const { loading_profile } = this.props.profile;
    if (loading_profile) {
      return (
        <div className="container mt-100">
          <div className="row">
            <div className="col m12 center-align">
              <Loader />
            </div>
          </div>
        </div>
      );
    } else {
      return <EditProfileHOC props={this.props} />;
    }
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default compose(
  connect(mapStateToProps, {
    get_profile,
    update_profile
  }),
  withRouter
)(EditProfile);
