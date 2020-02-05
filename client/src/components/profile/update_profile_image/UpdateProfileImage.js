import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter, Link } from "react-router-dom";
import { withFormik, Form, Field } from "formik";
import { get_profile, upload_profile_image } from "../../../actions/profile";
import * as Yup from "yup";
import Loader from "../../layout/loader/Loader";

class UpdateProfileImageForm extends Component {
  render() {
    const { values, errors, setFieldValue } = this.props;

    const { profile_image_id } = this.props.props.profile.profile;

    return (
      <div className="container mt-50">
        <div className="row valign-wrapper">
          <div className="col m2 center-align back-col">
            <Link to={"/"} className="btn btn-mernbook">
              <i className="material-icons">arrow_back</i>
            </Link>
          </div>
          <div className="col m6 offset-m1 center-align">
            <div className="component-heading">Update Profile Image</div>
          </div>
        </div>
        <Form encType="multipart/form-data">
          <div className="row mt-50">
            <div className="col m10 offset-m1">
              <div className="row">
                <div className="col m6 offset-m3">
                  <div className="custom-input-field">
                    <label
                      htmlFor="current_profile_image"
                      className="custom-label mernbook-blue-text"
                    >
                      Current Profile Image
                    </label>
                    <img
                      className="responsive-img"
                      src={`/api/profile/profile_image/${profile_image_id}`}
                      alt="Current Profile Image"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col m6 offset-m3">
                  <div className="custom-input-field">
                    <label
                      htmlFor="current_profile_image"
                      className="custom-label mernbook-blue-text"
                    >
                      Upload Profile Image
                    </label>
                    <div className="file-field input-field col m12">
                      <div className="btn btn-mernbook">
                        <span>
                          <i className="material-icons">add_a_photo</i>
                        </span>
                        <input
                          type="file"
                          id="profile_image"
                          name="profile_image"
                          onChange={e => {
                            setFieldValue(
                              "profile_image",
                              e.currentTarget.files[0]
                            );
                          }}
                        />
                      </div>
                      <div className="file-path-wrapper">
                        <input
                          className="file-path"
                          type="text"
                          placeholder="Update Profile Image"
                        />
                      </div>
                    </div>
                    {errors.profile_image && (
                      <span className="custom-helper-error">
                        {errors.profile_image}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col m6 offset-m3">
                  <button className="btn btn-mernbook right fw-600">
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

const UpdateProfileImageHOC = withFormik({
  mapPropsToValues: props => {
    const { profile_image } = props.props.profile.profile;
    return {
      profile_image: profile_image || ""
    };
  },

  handleSubmit: (values, props) => {
    const { upload_profile_image, history } = props.props.props;
    const profile_id = props.props.props.profile.profile._id;
    upload_profile_image(profile_id, values, history);
  }
})(UpdateProfileImageForm);

class UpdateProfileImage extends Component {
  componentDidMount = () => {
    this.props.get_profile();
  };
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
      return <UpdateProfileImageHOC props={this.props} />;
    }
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default compose(
  connect(mapStateToProps, {
    get_profile,
    upload_profile_image
  }),
  withRouter
)(UpdateProfileImage);
