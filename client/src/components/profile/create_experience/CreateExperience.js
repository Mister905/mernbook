import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { withFormik, Form, Field } from "formik";
import { create_experience } from "../../../actions/profile";
import Autocomplete from "../../../components/helpers/autocomplete/Autocomplete";
import Datepicker from "../../helpers/datepicker/Datepicker";

class CreateExperience extends Component {
  render() {
    return (
      <div className="container mt-50">
        <div className="row">
          <div className="col m12 center-align">
            <div className="component-heading">Create Experience</div>
          </div>
        </div>
        <Form>
          <div className="row mt-50">
            <div className="col m10 offset-m1">
              <div className="row">
                <div className="col m6 offset-m3">
                  <div className="custom-input-field">
                    <label
                      htmlFor="interests"
                      className="custom-label mernbook-blue-text"
                    >
                      Title
                    </label>
                    <Field type="text" id="title" name="title" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col m6 offset-m3">
                  <div className="custom-input-field">
                    <label
                      htmlFor="interests"
                      className="custom-label mernbook-blue-text"
                    >
                      Company
                    </label>
                    <Field type="text" id="company" name="company" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col m6 offset-m3">
                  <div className="custom-input-field">
                    <label
                      htmlFor="location"
                      className="custom-label mernbook-blue-text"
                    >
                      Location
                    </label>
                    <Field
                      component={Autocomplete}
                      id="location"
                      name="location"
                      field_value={"job_location"}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col m6 offset-m3">
                  <div className="custom-input-field">
                    <label
                      htmlFor="from"
                      className="custom-label mernbook-blue-text"
                    >
                      From
                    </label>
                    <Field
                      component={Datepicker}
                      id="from"
                      name="from"
                      field_value={"from"}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col m6 offset-m3">
                  <button className="btn btn-mernbook right">Update</button>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </div>
    );
  }
}

const FormikForm = withFormik({
  mapPropsToValues({
    user_location,
    status,
    skills,
    interests,
    youtube,
    twitter,
    facebook,
    linkedin,
    instagram
  }) {
    return {
      user_location: user_location || "",
      status: status || "",
      skills: skills || "",
      interests: interests || "",
      youtube: youtube || "",
      twitter: twitter || "",
      facebook: facebook || "",
      linkedin: linkedin || "",
      instagram: instagram || ""
    };
  },
  handleSubmit: (values, props) => {
    props.props.update_profile(values, props.props.history);
  }
})(CreateExperience);

export default compose(
  connect(null, {
    create_experience
  }),
  withRouter
)(FormikForm);
