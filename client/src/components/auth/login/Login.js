import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import { login_user } from "../../../actions/auth";

class Login extends Component {
  render() {
    const { values, errors, touched } = this.props;
    return (
      <div>
        <div className="container mt-50">
          <div className="row">
            <div className="col m4 offset-m4 s12 center-align">
              <div className="component-heading mernbook-blue-text">Login</div>
            </div>
          </div>

          <Form>
            <div className="row mt-50">
              <div className="col m10 offset-m1 s6 offset-s3">
                <div className="row">
                  <div className="col m6 offset-m3 s12">
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
                          errors.email ? "invalid" : ""
                        }
                      />
                      {errors.email && (
                        <span className="custom-helper-error">
                          {errors.email}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col m6 offset-m3 s12">
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
                          errors.password ? "invalid" : ""
                        }
                      />
                      {errors.password && (
                        <span className="custom-helper-error">
                          {errors.password}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col m6 offset-m3 s12">
                    <button
                      type="submit"
                      className="btn btn-mernbook fw-600 right"
                    >
                      Login
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
  mapPropsToValues({ email, password }) {
    return {
      email: email || "",
      password: password || ""
    };
  },

  validationSchema: Yup.object().shape({
    email: Yup.string().required("Email is Required"),
    email: Yup.string()
      .email("Invalid email")
      .required("Required"),
    password: Yup.string().required("Password is Required")
  }),
  validateOnBlur: false,
  validateOnChange: false,
  handleSubmit: (values, props) => {
    props.props.login_user(values, props.props.history);
  }
})(Login);

export default compose(connect(null, { login_user }), withRouter)(FormikForm);
