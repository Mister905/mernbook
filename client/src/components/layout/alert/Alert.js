import React, { Component } from "react";
import { connect } from "react-redux";
import M from "materialize-css";
import { remove_alert } from "../../../actions/alert";

class Alert extends Component {
  componentDidUpdate = prevProps => {
    if (this.props.alert.new_alert_id !== prevProps.alert.new_alert_id) {
      const { alerts } = this.props.alert;
      alerts !== null &&
        alerts.length > 0 &&
        alerts.map(alert => {
          const { id, type, message } = alert;
          let alert_html;
          if (type == "error") {
            alert_html = `<span><i class="material-icons error-icon">error</i></span><span class="error-message">${message}</span`;
          } else {
            alert_html = `<span>${message}</span`;
          }
          const options = {
            html: alert_html,
            inDuration: 300,
            outDuration: 375,
            displyLength: 4000,
            classes: `rounded alert-${type}`
          };

          M.toast(options);

          this.props.remove_alert(id);
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

export default connect(mapStateToProps, { remove_alert })(Alert);
