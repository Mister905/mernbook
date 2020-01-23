import React, { Component } from "react";
import { connect } from "react-redux";
import { withAlert } from "react-alert";

class Alert extends Component {
  componentDidUpdate = prevProps => {
    if (this.props.alert.alert.id !== prevProps.alerts.alert.id) {
      const alert = this.props.alert;
      alert.show(this.props.alert.alert.msg, {
        type: this.props.alert.alert.type
      });
    }
  };

  render() {
    return null;
  }
}

const mapStateToProps = state => ({
  alert: state.alert
});

export default withAlert()(connect(mapStateToProps)(Alert));
