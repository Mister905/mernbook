import React, { Component } from "react";
import { Link } from "react-router-dom";

class UpdateProfileImage extends Component {
  render() {
    return (
      <div className="container mt-50">
        <div className="row">
          <div className="col m2 center-align">
            <Link to={"/dashboard"} className="btn btn-mernbook">
              <i className="material-icons">arrow_back</i>
            </Link>
          </div>
          <div className="col m6 offset-m1 center-align">
            <div className="component-heading">Update Profile Image</div>
          </div>
        </div>
      </div>
    );
  }
}

export default UpdateProfileImage;
