import React, { Component } from "react";
import { connect } from "react-redux";
import { withAlert } from "react-alert";

class Alert extends Component {
  componentDidUpdate = prevProps => {
    if (this.props.alert_state.alert.id !== prevProps.alert_state.alert.id) {
      const new_alert = this.props.alert_state.alert;
      const { alert } = this.props;
      alert.show(new_alert.message, {
        type: new_alert.type
      });
    }
  };

  render() {
    return null;
  }
}

const Alert_Component = withAlert()(Alert);

const mapStateToProps = state => ({
  alert_state: state.alert
});

export default connect(mapStateToProps)(Alert_Component);
