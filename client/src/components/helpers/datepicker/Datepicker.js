import React, { Component } from "react";
import M from "materialize-css";
import Moment from "moment";

class Datepicker extends Component {
  componentDidMount() {
    const { field_name } = this.props;
    const { setFieldValue } = this.props.form;

    let default_date = null;

    if (field_name === "from_date") {
      default_date = Moment(this.props.from_date).toDate();
      setFieldValue(field_name, Moment(this.props.from_date).toDate());
    } else if (field_name === "to_date") {
      default_date = Moment(this.props.to_date).toDate();
      setFieldValue(field_name, Moment(this.props.to_date).toDate());
    }

    const datePickerOptions = {
      autoClose: true,
      defaultDate: default_date,
      setDefaultDate: true,
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
