import React, { Component } from "react";
import { connect } from "react-redux";
import { get_current_profile } from "../../actions/profile";

class Dashboard extends Component {
  componentDidMount = () => {
    this.props.get_current_profile();
  };

  componentDidUpdate = prevProps => {};

  render() {
    return (
      <div className="container mt-50">
        <div className="row">
          <div className="col m12">
            <div className="component-heading center-align">Dashboard</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { get_current_profile})(
  Dashboard
);
