import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import { create_comment } from "../../../actions/comment";

class CreateComment extends Component {
  render() {
    return (
      <Form>
        <div className="row mt-50">
          <div className="col m6 offset-m3 s6 offset-s3">
            <div className="custom-input-field">
              <Field
                component="textarea"
                id="text"
                name="text"
                className="materialize-textarea"
                placeholder="Leave a Comment"
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col m6 offset-m3 s6 offset-s3">
            <button className="btn btn-mernbook right fw-600">Create</button>
          </div>
        </div>
      </Form>
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
    const user_id = props.props.post.post.user;

    const post_id = props.props.post.post._id;

    const { first_name, last_name } = props.props.post.post;

    const { text } = values;

    const comment_data = {
      user_id,
      post_id,
      first_name,
      last_name,
      text
    };

    props.props.create_comment(comment_data, props.props.history);
  }
})(CreateComment);

const mapStateToProps = state => ({
  profile: state.profile,
  post: state.post,
  sidenav: state.sidenav
});

export default compose(
  connect(mapStateToProps, {
    create_comment
  }),
  withRouter
)(FormikForm);
