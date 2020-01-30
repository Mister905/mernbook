import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter, Link } from "react-router-dom";
import { withFormik, Form, Field } from "formik";
import {
  update_profile,
  get_active_education
} from "../../../../actions/profile";
import Autocomplete from "../../../helpers/autocomplete/Autocomplete";
import Datepicker from "../../../helpers/datepicker/Datepicker";
import M from "materialize-css";
import * as Yup from "yup";
import Loader from "../../../layout/loader/Loader";

class EditEducation extends Component {
  state = {
    is_current_study: true
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.get_active_education(id);
  }

  componentDidUpdate = prevProps => {
    if (
      this.props.profile.loading_active_education !==
      prevProps.profile.loading_active_education
    ) {
      let description = document.getElementById("description");
      M.textareaAutoResize(description);
    }
  };

  handle_current_checkbox = () => {
    this.setState({
      is_current_study: !this.state.is_current_study
    });
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { setFieldValue } = this.props;
    if (this.state.is_current_study !== prevState.is_current_study) {
      setFieldValue("is_current_study", this.state.is_current_study);
    }
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
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col m6 offset-m3">
                  <button className="btn btn-mernbook right">Update</button>
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
    console.log(props);
    const { loading_active_education } = props.profile;
    if (!loading_active_education) {
      const {
        institution,
        credential,
        field_of_study,
        from_date,
        to_date,
        is_current_study,
        description
      } = props.profile.active_education_item;
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
    // props.props.create_education(values, props.props.history);
  }
})(EditEducation);

const mapStateToProps = state => ({
  profile: state.profile
});

export default compose(
  connect(mapStateToProps, {
    update_profile,
    get_active_education
  }),
  withRouter
)(FormikForm);
