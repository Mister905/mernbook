import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter, Link } from "react-router-dom";
import { withFormik, Form, Field } from "formik";
import {
  update_profile,
  get_active_experience,
  delete_experience
} from "../../../../actions/profile";
import Autocomplete from "../../../helpers/autocomplete/Autocomplete";
import Datepicker from "../../../helpers/datepicker/Datepicker";
import M from "materialize-css";
import * as Yup from "yup";
import Loader from "../../../layout/loader/Loader";

class EditExperience extends Component {
  state = {
    is_current_job: true
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.get_active_experience(id);
    M.Modal.init(this.Modal, null);
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (
      this.props.profile.loading_active_experience !==
      prevProps.profile.loading_active_experience
    ) {
      let description = document.getElementById("description");
      M.textareaAutoResize(description);
    }

    const { setFieldValue } = this.props;
    if (this.state.is_current_job !== prevState.is_current_job) {
      setFieldValue("is_current_job", this.state.is_current_job);
    }
  };

  handle_current_checkbox = () => {
    this.setState({
      is_current_job: !this.state.is_current_job
    });
  };

  handle_delete_experience = () => {
    const { _id } = this.props.profile.active_experience_item;
    this.props.delete_experience(_id, this.props.history);
  };

  render() {
    const { values, errors } = this.props;
    const { is_current_job } = this.state;
    const { loading_active_experience } = this.props.profile;
    return (
      <div className="container mt-50">
        <div className="row">
          <div className="col m2 center-align">
            <Link to={"/"} className="btn btn-mernbook">
              <i className="material-icons">arrow_back</i>
            </Link>
          </div>
          <div className="col m6 offset-m1 center-align">
            <div className="component-heading">Edit Experience</div>
          </div>
          <div className="col m2 offset-m1 center-align">
            <a
              className="btn btn-mernbook modal-trigger"
              data-target="mernbook-modal"
            >
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
                <a className="modal-close waves-effect waves-red btn-flat">
                  Disagree
                </a>
                <a
                  onClick={this.handle_delete_experience}
                  className="modal-close waves-effect waves-green btn-flat"
                >
                  Agree
                </a>
              </div>
            </div>
          </div>
        </div>
        {loading_active_experience ? (
          <div className="row">
            <div className="col m12 center-align">
              <Loader />
            </div>
          </div>
        ) : (
          <Form>
            <div className="row mt-50">
              <div className="col m10 offset-m1">
                <div className="row">
                  <div className="col m6 offset-m3">
                    <div className="custom-input-field">
                      <label
                        htmlFor="title"
                        className="custom-label mernbook-blue-text"
                      >
                        Title
                      </label>
                      <Field
                        type="text"
                        id="title"
                        name="title"
                        className={errors.title ? "invalid" : ""}
                      />
                      {errors.title && (
                        <span className="custom-helper-error">
                          {errors.title}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col m6 offset-m3">
                    <div className="custom-input-field">
                      <label
                        htmlFor="company"
                        className="custom-label mernbook-blue-text"
                      >
                        Company
                      </label>
                      <Field
                        type="text"
                        id="company"
                        name="company"
                        className={errors.company ? "invalid" : ""}
                      />
                      {errors.company && (
                        <span className="custom-helper-error">
                          {errors.company}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col m6 offset-m3">
                    <div className="custom-input-field">
                      <label
                        htmlFor="job_location"
                        className="custom-label mernbook-blue-text"
                      >
                        Location
                      </label>

                      <Field
                        component={Autocomplete}
                        id="job_location"
                        name="job_location"
                        field_name={"job_location"}
                        job_location={
                          this.props.profile.active_experience_item.job_location
                        }
                      />
                      {errors.job_location && (
                        <span className="custom-helper-error">
                          {errors.job_location}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row valign-wrapper">
                  <div className="col m4 offset-m3">
                    <div className="custom-input-field">
                      <label
                        htmlFor="from_date"
                        className="custom-label mernbook-blue-text"
                      >
                        From
                      </label>
                      <Field
                        component={Datepicker}
                        id="from_date"
                        name="from_date"
                        field_name={"from_date"}
                        from_date={
                          this.props.profile.active_experience_item.from_date
                        }
                      />
                      {errors.from_date && (
                        <span className="custom-helper-error">
                          {errors.from_date}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col m2 center-align current-col">
                    <div id="current-wrapper">
                      <label>
                        <Field
                          id="is_current_job"
                          name="is_current_job"
                          type="checkbox"
                          checked={is_current_job}
                          onChange={this.handle_current_checkbox}
                          value={this.state.is_current_job}
                        />
                        <span className="custom-label mernbook-blue-text">
                          Current
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
                {!is_current_job ? (
                  <div className="row valign-wrapper">
                    <div className="col m4 offset-m3">
                      <div className="custom-input-field">
                        <label
                          htmlFor="to_date"
                          className="custom-label mernbook-blue-text"
                        >
                          To
                        </label>
                        <Field
                          component={Datepicker}
                          id="to_date"
                          name="to_date"
                          field_name={"to_date"}
                        />
                      </div>
                    </div>
                  </div>
                ) : null}
                <div className="row">
                  <div className="col m6 offset-m3">
                    <div className="custom-input-field">
                      <label
                        htmlFor="description"
                        className="custom-label mernbook-blue-text"
                      >
                        Description
                      </label>
                      <Field
                        component="textarea"
                        id="description"
                        name="description"
                        className="materialize-textarea"
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col m6 offset-m3">
                    <button className="btn btn-mernbook right fw-600">
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </div>
    );
  }
}

const FormikForm = withFormik({
  mapPropsToValues: props => {
    const { loading_active_experience } = props.profile;
    if (!loading_active_experience) {
      const {
        title,
        company,
        job_location,
        from_date,
        to_date,
        is_current_job,
        description
      } = props.profile.active_experience_item;
      return {
        title: title || "",
        company: company || "",
        job_location: job_location || "",
        from_date: from_date || "",
        to_date: to_date || "",
        is_current_job: is_current_job || true,
        description: description || ""
      };
    } else {
      return {
        title: "",
        company: "",
        job_location: "",
        from_date: "",
        to_date: "",
        is_current_job: true,
        description: ""
      };
    }
  },
  validationSchema: Yup.object().shape({
    title: Yup.string().required("Title is Required"),
    company: Yup.string().required("Company is Required"),
    job_location: Yup.string().required("Location is Required"),
    from_date: Yup.string().required("From Date is Required")
  }),
  validateOnBlur: false,
  validateOnChange: false,
  enableReinitialize: true,
  handleSubmit: (values, props) => {
    console.log(values);
    // props.props.create_experience(values, props.props.history);
  }
})(EditExperience);

const mapStateToProps = state => ({
  profile: state.profile
});

export default compose(
  connect(mapStateToProps, {
    update_profile,
    get_active_experience,
    delete_experience
  }),
  withRouter
)(FormikForm);
