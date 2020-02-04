import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter, Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { get_comment_by_id, update_comment } from "../../../actions/comment";
import M from "materialize-css";
import Loader from "../../layout/loader/Loader";

class EditComment extends Component {
  componentDidMount() {
    const { comment_id } = this.props.match.params;

    this.props.get_comment_by_id(comment_id);
  }

  output_comment = () => {
    const { text } = this.props.comment.comment;
    const initial_values = {
      text: text || ""
    };
    return (
      <div className="container mt-50">
        <div className="row">
          <div className="col m2 center-align">
            <Link to={"/"} className="btn btn-mernbook">
              <i className="material-icons">arrow_back</i>
            </Link>
          </div>
          <div className="col m6 offset-m1 center-align">
            <div className="component-heading">Edit Comment</div>
          </div>
        </div>
        <Formik
          initialValues={initial_values}
          onSubmit={(values, actions) => {
            const comment_data = {
              comment_id: this.props.match.params.comment_id,
              text: values.text
            };

            console.log(comment_data);
            // this.props.update_profile(comment_data, this.props.history);
          }}
        >
          {props => {
            console.log(props)
            return (
              <form onSubmit={props.handleSubmit}>
                <div className="row mt-50">
                  <div className="col m10 offset-m1 s12">
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
              </form>
            );
          }}
        </Formik>
      </div>
    );
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
      return this.output_comment();
    }
  }
}

const mapStateToProps = state => ({
  comment: state.comment
});

export default compose(
  connect(mapStateToProps, {
    get_comment_by_id,
    update_comment
  }),
  withRouter
)(EditComment);
