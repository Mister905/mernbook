import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter, Link } from "react-router-dom";
import { withFormik, Form, Field } from "formik";
import {
  get_comment_by_id,
  update_comment,
  delete_comment
} from "../../../actions/comment";
import M from "materialize-css";
import Loader from "../../layout/loader/Loader";

class EditCommentForm extends Component {
  componentDidMount = () => {
    const text = document.getElementById("text");
    M.textareaAutoResize(text);
    M.Modal.init(this.Modal, null);
  };

  handle_current_checkbox = () => {
    this.setState({
      is_current_study: !this.state.is_current_study
    });
  };

  handle_delete_education = () => {
    const { _id } = this.props.props.education.active_education_item;
    const { delete_education, history } = this.props.props;
    delete_education(_id, history);
  };

  render() {
    const { values, errors } = this.props;
    const { post_id, comment_id } = this.props.props.match.params;
    return (
      <div className="container mt-50">
        <div className="row valign-wrapper">
          <div className="col m2 center-align">
            <Link to={`/post/${post_id}`} className="btn btn-mernbook">
              <i className="material-icons">arrow_back</i>
            </Link>
          </div>
          <div className="col m6 offset-m1 center-align">
            <div className="component-heading">Edit Comment</div>
          </div>
          <div className="col m2 offset-m1 center-align">
            <a className="btn modal-trigger red" data-target="mernbook-modal">
              <i className="material-icons">delete</i>
            </a>

            <div
              ref={Modal => {
                this.Modal = Modal;
              }}
              id="mernbook-modal"
              className="modal"
            >
              <div className="modal-content">
                <h4>Warning</h4>
                <p>Are you sure you want to delete this record?</p>
              </div>
              <div className="modal-footer">
                <a className="modal-close btn btn-mernbook">
                  <i className="material-icons">cancel</i>
                </a>
                <a
                  onClick={this.handle_delete_comment}
                  className="modal-close btn red btn-delete"
                >
                  <i className="material-icons">delete</i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <Form>
          <div className="row mt-50">
            <div className="col m10 offset-m1">
              <div className="row">
                <div className="col m6 offset-m3 s12">
                  <div className="custom-input-field">
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

const EditCommentHOC = withFormik({
  mapPropsToValues: props => {
    const { text } = props.props.comment.comment;

    return {
      text: text || ""
    };
  },

  handleSubmit: (values, props) => {
    const { post_id, comment_id } = props.props.props.match.params;
    const { update_comment, history } = props.props.props;
    update_comment(post_id, comment_id, values, history);
  }
})(EditCommentForm);

class EditComment extends Component {
  componentDidMount = () => {
    const { comment_id } = this.props.match.params;
    this.props.get_comment_by_id(comment_id);
  };
  render() {
    const { loading_comment } = this.props.comment;
    if (loading_comment) {
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
      return <EditCommentHOC props={this.props} />;
    }
  }
}

const mapStateToProps = state => ({
  comment: state.comment
});

export default compose(
  connect(mapStateToProps, {
    get_comment_by_id,
    update_comment,
    delete_comment
  }),
  withRouter
)(EditComment);
