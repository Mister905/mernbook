import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import { create_post } from "../../../actions/post";

class CreatePost extends Component {
  render() {
    return (
      <div className="container mt-50">
        <div className="row">
          <div className="col m12 center-align">
            <div className="component-heading">CREATE POST</div>
          </div>
        </div>
        <div className="row">
          <div className="col m12">
            <Form>
              <div className="row mt-50">
                <div className="col m10 offset-m1 s6 offset-s3">
                  <div className="row">
                    <div className="col m6 offset-m3">
                      <div className="custom-input-field">
                        <label
                          htmlFor="description"
                          className="custom-label mernbook-blue-text"
                        >
                          Post
                        </label>
                        <Field
                          component="textarea"
                          id="text"
                          name="text"
                          className="materialize-textarea"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col m6 offset-m3">
                      <button className="btn btn-mernbook right fw-600">
                        Create
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

const FormikForm = withFormik({
  mapPropsToValues({ text }) {
    return {
      post: text || ""
    };
  },
  validationSchema: Yup.object().shape({
    text: Yup.string().required("Text is Required")
  }),
  validateOnBlur: false,
  validateOnChange: false,
  handleSubmit: (values, props) => {
    props.props.create_post(values, props.props.history);
  }
})(CreatePost);

export default compose(
  connect(null, {
    create_post
  }),
  withRouter
)(FormikForm);
