import React, { Component } from "react";
import M from "materialize-css";

class Datepicker extends Component {
  componentDidMount() {
    let context = this;
    const datePickerOptions = {
      autoClose: true,
      // minDate: new Date(2018, 11, 3)
      // defaultDate: new Date(2018, 1, 3),
      // setDefaultDate: true
      onSelect(date) {
        console.log(date);
        console.log(context.props.date);
      }
    };
    const dateElement = M.Datepicker.init(this.Datepicker, datePickerOptions);

    // let instance = M.Datepicker.getInstance(this.Datepicker);
    // instance.setDate(new Date(2018, 2, 3));
  }

  render() {
    return (
      <div id="datepicker-wrapper">
        <input
          ref={DatePicker => {
            this.Datepicker = DatePicker;
          }}
          id="date-picker"
          type="text"
          className="datepicker"
        />
      </div>
    );
  }
}

export default Datepicker;
