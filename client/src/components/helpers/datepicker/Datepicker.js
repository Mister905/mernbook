import React, { Component } from "react";
import M from "materialize-css";

class Datepicker extends Component {
  componentDidMount() {
    const { field_name } = this.props;
    const { setFieldValue } = this.props.form;
    const datePickerOptions = {
      autoClose: true,
      onSelect: date => {
        setFieldValue(field_name, date);
      }
    };
    M.Datepicker.init(this.Datepicker, datePickerOptions);
  }

  render() {
    const { field_name } = this.props;
    const { errors } = this.props.form;
    return (
      <div id="datepicker-wrapper">
        <input
          ref={DatePicker => {
            this.Datepicker = DatePicker;
          }}
          id="date-picker"
          type="text"
          className={field_name in errors ? "datepicker invalid" : "datepicker"}
        />
      </div>
    );
  }
}

export default Datepicker;
