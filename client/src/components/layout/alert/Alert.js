import React, { Component } from "react";
import { connect } from "react-redux";
import M from "materialize-css";
import { remove_alert } from "../../../actions/alert";

class Alert extends Component {
  componentDidUpdate = () => {
    const { alerts } = this.props.alert;
    alerts !== null &&
      alerts.length > 0 &&
      alerts.map(alert => {
        const { id, type, message } = alert;
        const options = {
          html: `<span className="alert-${type}">${message}</span>`,
          inDuration: 300,
          outDuration: 375,
          displyLength: 4000,
          classes: "rounded",
          completeCallback: () => {
            this.props.remove_alert(id);
          }
        };

        M.toast(options);
      });
  };

  render() {
    return null;
  }
}

const mapStateToProps = state => ({
  alert: state.alert
});

export default connect(mapStateToProps, { remove_alert })(Alert);
