import React, { Component } from "react";
import M from "materialize-css";
import { delete_account } from "../../actions/account";
import { clear_profile } from "../../actions/profile";
import { delete_account_experience } from "../../actions/experience";
import { delete_account_education } from "../../actions/education";
import { logout_user } from "../../actions/auth";
import { reset_sidenav } from "../../actions/sidenav";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";

class Account extends Component {
  componentDidMount() {
    M.Modal.init(this.Modal, null);
  }

  handle_delete_account = () => {
    this.props.delete_account_experience();
    this.props.delete_account_education();
    this.props.clear_profile();
    this.props.delete_account();
    this.props.reset_sidenav();
    this.props.logout_user(this.props.history);
  };

  render() {
    return (
      <div className="container mt-50">
        <div className="row">
          <div className="col m12 center-align">
            <div className="component-heading">Account</div>
          </div>
        </div>
        <div className="row">
          <div className="col m6 offset-m3 center-align">
            <a
              className="btn modal-trigger red fw-600 btn-large"
              data-target="mernbook-modal"
            >
              <i className="material-icons right">delete</i>
              <span>Delete Account and Profile</span>
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
                <p>Are you sure you want to delete your account?</p>
              </div>
              <div className="modal-footer">
                <a className="modal-close btn btn-mernbook">
                  <i className="material-icons">cancel</i>
                </a>
                <a
                  onClick={this.handle_delete_account}
                  className="modal-close btn red btn-delete"
                >
                  <i className="material-icons">delete</i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default compose(
  connect(null, {
    delete_account_experience,
    delete_account_education,
    delete_account,
    clear_profile,
    logout_user,
    reset_sidenav
  }),
  withRouter
)(Account);
