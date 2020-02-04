import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { get_post_by_id, delete_post } from "../../../actions/post";
import { get_comments } from "../../../actions/comment";
import M from "materialize-css";
import { withRouter, Link } from "react-router-dom";
import Loader from "../../layout/loader/Loader";
import CreateComment from "../../comment/create_comment/CreateComment";

class ViewPost extends Component {
  componentDidMount = () => {
    const { post_id } = this.props.match.params;
    this.props.get_post_by_id(post_id);
  };

  componentDidUpdate = prevProps => {
    M.Modal.init(this.Modal, null);
    if (this.props.post.post !== prevProps.post.post) {
      const post_id = this.props.post.post._id;
      this.props.get_comments(post_id);
    }

    if (
      this.props.comment.loading_comments !== prevProps.comment.loading_comments
    ) {
      const post_id = this.props.post.post._id;
      this.props.get_comments(post_id);
    }
  };

  handle_delete_post = post_id => {
    this.props.delete_post(post_id, this.props.history);
  };

  output_post = () => {
    const { post } = this.props.post;
    const { comments } = this.props.comment;
    return (
      <div className="container mt-100">
        <div className="row">
          <div className="col m2 center-align">
            <Link to={"/"} className="btn btn-mernbook">
              <i className="material-icons">arrow_back</i>
            </Link>
          </div>
          <div className="col m6 offset-m1 card">
            <div className="card-content">
              <div className="row">
                <div className="col m12">
                  <div className="post-user fw-600">
                    {post.first_name} {post.last_name}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col m12">
                  <div className="post-text">{post.text}</div>
                </div>
              </div>
            </div>
          </div>
          {this.props.auth.user._id === this.props.post.post.user && (
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
                    onClick={e => this.handle_delete_post(post._id)}
                    className="modal-close btn red btn-delete"
                  >
                    <i className="material-icons">delete</i>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {comments.length > 0 &&
          comments.map(comment => {
            return (
              <div className="row" key={comment._id}>
                <div className="col m6 offset-m3 card">
                  <div className="card-content">
                    <div className="row">
                      <div className="col m6">
                        <div className="post-user fw-600">
                          {comment.first_name} {comment.last_name}
                        </div>
                      </div>
                      <div className="col m6">
                        <Link
                          to={`/comment/${comment._id}`}
                          className="btn btn-mernbook right"
                        >
                          <i className="material-icons">mode_edit</i>
                        </Link>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col m12">
                        <div className="post-text">{comment.text}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

        <div className="row">
          <div className="col m12">
            <CreateComment />
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { loading_post } = this.props.post;
    const { loading_comments } = this.props.comment;
    if (loading_post || loading_comments) {
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
      return this.output_post();
    }
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post,
  comment: state.comment
});

export default compose(
  connect(mapStateToProps, {
    get_post_by_id,
    delete_post,
    get_comments
  }),
  withRouter
)(ViewPost);
