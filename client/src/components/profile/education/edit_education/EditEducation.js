import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter, Link } from "react-router-dom";
import { withFormik, Form, Field } from "formik";
import {
  get_active_education,
  delete_education,
  update_education
} from "../../../../actions/education";
import Autocomplete from "../../../helpers/autocomplete/Autocomplete";
import Datepicker from "../../../helpers/datepicker/Datepicker";
import M from "materialize-css";
import * as Yup from "yup";
import Loader from "../../../layout/loader/Loader";

class EditEducation extends Component {
  constructor(props) {
    super(props);
    this.Description = React.createRef();
  }

  state = {
    is_current_study: true
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.get_active_education(id);
    M.Modal.init(this.Modal, null);
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (
      this.props.education.active_education_item !==
      prevProps.education.active_education_item
    ) {
      try {
        M.textareaAutoResize(this.Description.current);
      } catch (error) {
        console.log(error);
      }
    }

    const { setFieldValue } = this.props;
    if (this.state.is_current_study !== prevState.is_current_study) {
      setFieldValue("is_current_study", this.state.is_current_study);
    }
  };

  handle_current_checkbox = () => {
    this.setState({
      is_current_study: !this.state.is_current_study
    });
  };

  handle_delete_education = () => {
    const { _id } = this.props.education.active_education_item;
    this.props.delete_education(_id, this.props.history);
  };

  render() {
    const { values, errors } = this.props;
    const { is_current_study } = this.state;
    return (
      <div className="container mt-50">
        <div className="row">
          <div className="col m2 center-align">
            <Link to={"/"} className="btn btn-mernbook">
              <i className="material-icons">arrow_back</i>
            </Link>
          </div>
          <div className="col m6 offset-m1 center-align">
            <div className="component-heading">Edit Education</div>
          </div>
          <div className="col m2 offset-m1 center-align">
            <a className="btn red modal-trigger" data-target="mernbook-modal">
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
                  onClick={this.handle_delete_education}
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
                <div className="col m6 offset-m3">
                  <div className="custom-input-field">
                    <label
                      htmlFor="institution"
                      className="custom-label mernbook-blue-text"
                    >
                      Institution
                    </label>
                    <Field
                      type="text"
                      id="institution"
                      name="institution"
                      className={errors.institution ? "invalid" : ""}
                      placeholder="University of Florida, Oxford College, etc..."
                    />
                    {errors.institution && (
                      <span className="custom-helper-error">
                        {errors.institution}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col m6 offset-m3">
                  <div className="custom-input-field">
                    <label
                      htmlFor="credential"
                      className="custom-label mernbook-blue-text"
                    >
                      Credential
                    </label>
                    <Field
                      type="text"
                      id="credential"
                      name="credential"
                      className={errors.credential ? "invalid" : ""}
                      placeholder="Degree, Diploma, etc..."
                    />
                    {errors.credential && (
                      <span className="custom-helper-error">
                        {errors.credential}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col m6 offset-m3">
                  <div className="custom-input-field">
                    <label
                      htmlFor="field_of_study"
                      className="custom-label mernbook-blue-text"
                    >
                      Field of Study
                    </label>
                    <Field
                      type="text"
                      id="field_of_study"
                      name="field_of_study"
                    />
                    {errors.field_of_study && (
                      <span className="custom-helper-error">
                        {errors.field_of_study}
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
                        id="is_current_study"
                        name="is_current_study"
                        type="checkbox"
                        checked={is_current_study}
                        onChange={this.handle_current_checkbox}
                        value={this.state.is_current_study}
                      />
                      <span className="custom-label mernbook-blue-text">
                        Current
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              {!is_current_study ? (
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
                      innerRef={this.Description}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col m6 offset-m3">
                  <button className="btn btn-mernbook fw-600 right">
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

const FormikForm = withFormik({
  mapPropsToValues: props => {
    const { loading_active_education } = props.education;
    if (!loading_active_education) {
      const {
        institution,
        credential,
        field_of_study,
        from_date,
        to_date,
        is_current_study,
        description
      } = props.education.active_education_item;
      return {
        institution: institution || "",
        credential: credential || "",
        field_of_study: field_of_study || "",
        from_date: from_date || "",
        to_date: to_date || "",
        is_current_study: is_current_study || true,
        description: description || ""
      };
    } else {
      return {
        institution: "",
        credential: "",
        field_of_study: "",
        from_date: "",
        to_date: "",
        is_current_study: true,
        description: ""
      };
    }
  },

  validationSchema: Yup.object().shape({
    institution: Yup.string().required("Institution is Required"),
    credential: Yup.string().required("Credential is Required"),
    from_date: Yup.string().required("From Date is Required")
  }),
  validateOnBlur: false,
  validateOnChange: false,
  enableReinitialize: true,
  handleSubmit: (values, props) => {
    const education_item_id = props.props.education.active_education_item._id;

    props.props.update_education(
      education_item_id,
      values,
      props.props.history
    );
  }
})(EditEducation);

const mapStateToProps = state => ({
  education: state.education
});

export default compose(
  connect(mapStateToProps, {
    get_active_education,
    delete_education,
    update_education
  }),
  withRouter
)(FormikForm);
