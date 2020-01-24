import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import { register_user } from "../../../actions/auth";

class Register extends Component {
  render() {
    const { values, errors, touched } = this.props;
    return (
      <div>
        <div className="container mt-50">
          <div className="row">
            <div className="col m4 offset-m4 center-align">
              <div className="component-heading mernbook-blue-text">
                Register
              </div>
            </div>
          </div>

          <Form>
            <div className="row mt-50">
              <div className="col m10 offset-m1">
                <div className="row">
                  <div className="col m3 offset-m3">
                    <div className="custom-input-field">
                      <label
                        htmlFor="first_name"
                        className="custom-label mernbook-blue-text"
                      >
                        First Name
                      </label>
                      <Field
                        type="text"
                        id="first_name"
                        name="first_name"
                        className={
                          errors.first_name && touched.first_name
                            ? "invalid"
                            : ""
                        }
                      />
                      {errors.first_name && touched.first_name && (
                        <span className="custom-helper-error">
                          {errors.first_name}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col m3">
                    <div className="custom-input-field">
                      <label
                        htmlFor="last_name"
                        className="custom-label mernbook-blue-text"
                      >
                        Last Name
                      </label>
                      <Field
                        type="text"
                        id="last_name"
                        name="last_name"
                        className={
                          errors.last_name && touched.last_name ? "invalid" : ""
                        }
                      />
                      {errors.last_name && touched.last_name && (
                        <span className="custom-helper-error">
                          {errors.last_name}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col m6 offset-m3">
                    <div className="custom-input-field">
                      <label
                        htmlFor="email"
                        className="custom-label mernbook-blue-text"
                      >
                        Email
                      </label>
                      <Field
                        type="email"
                        id="email"
                        name="email"
                        className={
                          errors.email && touched.email ? "invalid" : ""
                        }
                      />
                      {errors.email && touched.email && (
                        <span className="custom-helper-error">
                          {errors.email}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col m6 offset-m3">
                    <div className="custom-input-field">
                      <label
                        htmlFor="password"
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
                    <div className="custom-input-field">
                      <label
                        htmlFor="confirm_password"
                        className="custom-label mernbook-blue-text"
                      >
                        Confirm Password
                      </label>
                      <Field
                        type="password"
                        id="confirm_password"
                        name="confirm_password"
                        className={
                          errors.confirm_password && touched.confirm_password
                            ? "invalid"
                            : ""
                        }
                      />
                      {errors.confirm_password && touched.confirm_password && (
                        <span className="custom-helper-error">
                          {errors.confirm_password}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col m6 offset-m3">
                    <button
                      type="submit"
                      className="btn btn-mernbook fw-600 right"
                    >
                      Register
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

const FormikForm = withFormik({
  mapPropsToValues({
    first_name,
    last_name,
    email,
    password,
    confirm_password
  }) {
    return {
      first_name: first_name || "",
      last_name: last_name || "",
      email: email || "",
      password: password || "",
      confirm_password: confirm_password || ""
    };
  },

  validationSchema: Yup.object().shape({
    first_name: Yup.string().required("First Name is Required"),
    last_name: Yup.string().required("Last Name is Required"),
    email: Yup.string().required("Email is Required"),
    email: Yup.string()
      .email("Invalid email")
      .required("Required"),
    password: Yup.string().required("Password is Required"),
    confirm_password: Yup.string().required("Confirm Password is Required")
  }),
  handleSubmit: (values, props) => {
    const { setFieldError } = props;
    const { password, confirm_password } = values;

    if (password !== confirm_password) {
      setFieldError("confirm_password", "Passwords Must Match");
    } else {
      props.props.register_user(values, props.props.history);
    }
  }
})(Register);

export default compose(
  connect(null, { register_user }),
  withRouter
)(FormikForm);
