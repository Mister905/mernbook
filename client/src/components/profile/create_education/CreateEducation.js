import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { withFormik, Form, Field } from "formik";
import { create_experience } from "../../../actions/profile";

class CreateEducation extends Component {
  render() {
    return <div>CREATE EXPERIENCE</div>;
  }
}

export default CreateEducation;
