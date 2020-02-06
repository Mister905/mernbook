import React, { Component } from "react";
import { connect } from "react-redux";
import M from "materialize-css";

class ProfileStatusSelect extends Component {
  state = {
    selected_status: ""
  };

  componentDidMount = () => {
    M.FormSelect.init(this.FormSelect);
    const { status } = this.props.profile.profile;
    this.setState({
      selected_status: status
    });
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.selected_status !== prevState.selected_status) {
      const { setFieldValue } = this.props.form;
      setFieldValue("status", this.state.selected_status);
    }
  };

  handle_change = event => {
    this.setState({
      selected_status: event.target.value
    });
  };
  render() {
    return (
      <select
        ref={FormSelect => {
          this.FormSelect = FormSelect;
        }}
        onChange={this.handle_change}
        value={this.props.profile.profile.status}
      >
        <option value="0" disabled>
          Choose your option
        </option>
        <option value="I'd Rather Not Say">I'd Rather Not Say</option>
        <option value="Single">Single</option>
        <option value="In a Relationship">In a Relationship</option>
        <option value="Engaged">Engaged</option>
        <option value="Married">Married</option>
        <option value="It's Complicated">It's Complicated</option>
        <option value="It an Open Relationship">It an Open Relationship</option>
        <option value="Widowed">Widowed</option>
        <option value="Separated">Separated</option>
        <option value="Divorced">Divorced</option>
        <option value="In a Civil Union">In a Civil Union</option>
        <option value="In a Domestic Partnership">
          In a Domestic Partnership
        </option>
      </select>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps)(ProfileStatusSelect);
