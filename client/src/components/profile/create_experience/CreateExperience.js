import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { withFormik, Form, Field } from "formik";
import { create_experience } from "../../../actions/profile";
import Autocomplete from "../../../components/helpers/autocomplete/Autocomplete";
import Datepicker from "../../helpers/datepicker/Datepicker";
import M from "materialize-css";
import * as Yup from "yup";

class CreateExperience extends Component {
  state = {
    is_current_job: true
  };

  componentDidMount() {
    let description = document.getElementById("description");
    M.textareaAutoResize(description);
  }

  handle_current_checkbox = () => {
    this.setState({
      is_current_job: !this.state.is_current_job
    });
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { setFieldValue } = this.props;
    if (this.state.is_current_job !== prevState.is_current_job) {
      setFieldValue("is_current_job", this.state.is_current_job);
    }
  };

  render() {
    const { values, errors } = this.props;
    const { is_current_job } = this.state;
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
                      htmlFor="title"
                      className="custom-label mernbook-blue-text"
                    >
                      Title
                    </label>
                    <Field
                      type="text"
                      id="title"
                      name="title"
                      className={errors.title ? "invalid" : ""}
                    />
                    {errors.title && (
                      <span className="custom-helper-error">
                        {errors.title}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col m6 offset-m3">
                  <div className="custom-input-field">
                    <label
                      htmlFor="company"
                      className="custom-label mernbook-blue-text"
                    >
                      Company
                    </label>
                    <Field
                      type="text"
                      id="company"
                      name="company"
                      className={errors.company ? "invalid" : ""}
                    />
                    {errors.company && (
                      <span className="custom-helper-error">
                        {errors.company}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col m6 offset-m3">
                  <div className="custom-input-field">
                    <label
                      htmlFor="job_location"
                      className="custom-label mernbook-blue-text"
                    >
                      Location
                    </label>
                    <Field
                      component={Autocomplete}
                      id="job_location"
                      name="job_location"
                      field_name={"job_location"}
                    />
                    {errors.job_location && (
                      <span className="custom-helper-error">
                        {errors.job_location}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="row valign-wrapper">
                <div className="col m4 offset-m3">
                  <div className="custom-input-field">
                    <label
                      htmlFor="from_date"
                      className="custom-label mernbook-blue-text"
                    >
                      From
                    </label>
                    <Field
                      component={Datepicker}
                      id="from_date"
                      name="from_date"
                      field_name={"from_date"}
                    />
                    {errors.from_date && (
                      <span className="custom-helper-error">
                        {errors.from_date}
                      </span>
                    )}
                  </div>
                </div>
                <div className="col m2 center-align current-col">
                  <div id="current-wrapper">
                    <label>
                      <Field
                        id="is_current_job"
                        name="is_current_job"
                        type="checkbox"
                        checked={is_current_job}
                        onChange={this.handle_current_checkbox}
                        value={this.state.is_current_job}
                      />
                      <span className="custom-label mernbook-blue-text">
                        Current
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              {!is_current_job ? (
                <div className="row valign-wrapper">
                  <div className="col m4 offset-m3">
                    <div className="custom-input-field">
                      <label
                        htmlFor="to_date"
                        className="custom-label mernbook-blue-text"
                      >
                        To
                      </label>
                      <Field
                        component={Datepicker}
                        id="to_date"
                        name="to_date"
                        field_name={"to_date"}
                      />
                    </div>
                  </div>
                </div>
              ) : null}
              <div className="row">
                <div className="col m6 offset-m3">
                  <div className="custom-input-field">
                    <label
                      htmlFor="description"
                      className="custom-label mernbook-blue-text"
                    >
                      Description
                    </label>
                    <Field
                      component="textarea"
                      id="description"
                      name="description"
                      className="materialize-textarea"
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
    title,
    company,
    job_location,
    from_date,
    to_date,
    is_current_job,
    description
  }) {
    return {
      title: title || "",
      company: company || "",
      job_location: job_location || "",
      from_date: from_date || "",
      to_date: to_date || "",
      is_current_job: is_current_job || true,
      description: description || ""
    };
  },
  validationSchema: Yup.object().shape({
    title: Yup.string().required("Title is Required"),
    company: Yup.string().required("Company is Required"),
    job_location: Yup.string().required("Location is Required"),
    from_date: Yup.string().required("From Date is Required")
  }),
  validateOnBlur: false,
  validateOnChange: false,
  handleSubmit: (values, props) => {
    props.props.create_experience(values, props.props.history);
  }
})(CreateExperience);

export default compose(
  connect(null, {
    create_experience
  }),
  withRouter
)(FormikForm);
