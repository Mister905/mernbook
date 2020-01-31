import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Link } from "react-router-dom";
import { get_active_education } from "../../../../actions/education";
import Loader from "../../../layout/loader/Loader";
import Moment from "moment";

class ViewExperience extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.get_active_education(id);
  }

  output_experience_item = () => {
    const {
      _id,
      institution,
      credential,
      field_of_study,
      from_date,
      to_date,
      is_current_study,
      description
    } = this.props.profile.active_education_item;
    return (
      <div>
        <div className="row">
          <div className="col m2 center-align">
            <Link to={"/"} className="btn btn-mernbook">
              <i className="material-icons">arrow_back</i>
            </Link>
          </div>
          <div className="col m6 offset-m1 center-align">
            <div className="component-heading">Education Details</div>
          </div>
          <div className="col m2 offset-m1 center-align">
            <Link to={`/education/${_id}/edit`} className="btn btn-mernbook">
              <i className="material-icons">edit</i>
            </Link>
          </div>
        </div>

        <div className="row">
          <div className="col m8 offset-m2 card">
            <div className="card-content">
              <div className="card-title profile-title">{institution}</div>
              <div className="credential">{credential}</div>
              <div className="field_of_study">{field_of_study}</div>
              <div className="description">{description}</div>
              <div className="era right fw-600">
                {Moment(from_date).format("YYYY")} -{" "}
                {to_date ? Moment(to_date).format(" YYYY") : " Current"}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { loading_active_education } = this.props.profile;
    return (
      <div className="container mt-50">
        {loading_active_education ? (
          <div className="row">
            <div className="col m12 center-align">
              <Loader />
            </div>
          </div>
        ) : (
          this.output_experience_item()
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, {
  get_active_education
})(ViewExperience);
