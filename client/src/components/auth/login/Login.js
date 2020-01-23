import React, { Component } from "react";
import { connect } from "react-redux";
import M from "materialize-css";
import { Link } from "react-router-dom";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
// import { review_survey } from "../../../actions/surveys";

class Login extends Component {
  render() {
    const { values, errors, touched } = this.props;
    return (
      <div>
        <div className="container mt-50">
          <div className="row">
            <div className="col m4 offset-m4 center-align">
              <div className="component-heading mernbook-blue-text">
                Login
              </div>
            </div>
          </div>

          <Form>
            <div className="row mt-50">
              <div className="col m6 offset-m3">
                <div className="custom-input-field">
                  <label
                    for="email"
                    className="custom-label mernbook-blue-text"
                  >
                    Email
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className={errors.email && touched.email ? "invalid" : ""}
                  />
                  {errors.email && touched.email && (
                    <span className="custom-helper-error">{errors.email}</span>
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col m6 offset-m3">
                <div className="custom-input-field">
                  <label
                    for="password"
                    className="custom-label mernbook-blue-text"
                  >
                    Password
                  </label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    className={
                      errors.password && touched.password ? "invalid" : ""
                    }
                  />
                  {errors.password && touched.password && (
                    <span className="custom-helper-error">
                      {errors.password}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col m6 offset-m3">
                <button type="submit" className="btn btn-mernbook fw-600 right">
                  Login
                </button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

const FormikForm = withFormik({
  mapPropsToValues({ email, password }) {
    return {
      email: email || "",
      password: password || ""
    };
  },

  validationSchema: Yup.object().shape({
    email: Yup.string().required("Email is Required"),
    password: Yup.string().required("Password is Required")
  }),
  handleSubmit: (values, props) => {
    // const { setFieldError } = props;
    // const email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // const { recipient_list } = values;
    // let invalid_emails = recipient_list
    //   .split(",")
    //   .map(email => email.trim())
    //   .filter(email => email_regex.test(email) === false)
    //   .join(", ");
    // if (invalid_emails.length) {
    //   setFieldError(
    //     "recipient_list",
    //     `The following emails are invalid: ${invalid_emails}`
    //   );
    // } else {
    //   props.props.review_survey(values, props.props.history);
    // }
  }
})(Login);

// const mapStateToProps = state => ({
//   surveys: state.surveys
// });

export default connect(null)(FormikForm);
