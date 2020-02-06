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
      <Form>
        <div className="row mt-50">
          <div className="col m9 offset-m1 s6 offset-s3">
            <div className="custom-input-field">
              <Field
                component="textarea"
                id="text"
                name="text"
                className="materialize-textarea"
                placeholder="What's On Your Mind"
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col m9 offset-m1 s6 offset-s3">
            <button className="btn btn-mernbook right fw-600">Create</button>
          </div>
        </div>
      </Form>
    );
  }
}

const FormikForm = withFormik({
  mapPropsToValues: props => {
    return {
      text: ""
    };
  },
  validationSchema: Yup.object().shape({
    text: Yup.string().required("Text is Required")
  }),
  validateOnBlur: false,
  validateOnChange: false,
  handleSubmit: (values, props) => {
    const profile_id = props.props.profile.profile._id;
    props.props.create_post(profile_id, values, props.props.history);
    props.resetForm();
  }
})(CreatePost);

const mapStateToProps = state => ({
  profile: state.profile
});

export default compose(
  connect(mapStateToProps, {
    create_post
  }),
  withRouter
)(FormikForm);
