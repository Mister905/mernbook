import React, { Component } from "react";
import Script from "react-load-script";
import AutocompleteHelper from "react-google-autocomplete";
// https://www.npmjs.com/package/react-google-autocomplete

class Autocomplete extends Component {
  state = {
    current_value: null,
    places_script_loading: true
  };

  componentDidMount = () => {
    const { field_name } = this.props;
    const { value } = this.props.field;
    const { setFieldValue } = this.props.form;

    if (this.props.job_location) {
      this.setState({
        current_value: this.props.job_location
      });
      setFieldValue(field_name, this.state.current_value);
    } else {
      this.setState({
        current_value: value
      });
    }
  };

  handle_script_load = () => {
    this.setState({ places_script_loading: false });
  };

  handle_change = e => {
    this.setState({
      current_value: e.target.value
    });
  };

  output = () => {
    const { field_name } = this.props;
    const { errors } = this.props.form;

    return (
      <div>
        <AutocompleteHelper
          onPlaceSelected={place => {
            const { setFieldValue } = this.props.form;
            this.setState({
              current_value: place.formatted_address
            });
            setFieldValue(field_name, place.formatted_address);
          }}
          fields={["formatted_address"]}
          onBlur={this.handle_blur}
          placeholder=""
          className={field_name in errors ? "invalid" : ""}
          value={this.state.current_value}
          onChange={this.handle_change}
        />
      </div>
    );
  };

  render() {
    const { places_script_loading } = this.state;
    return (
      <div>
        {!places_script_loading && this.output()}
        <Script
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyDwWEHptemQfAy0t3r7bpTI5w-ZOFw7LyM&libraries=places"
          onLoad={this.handle_script_load}
        ></Script>
      </div>
    );
  }
}

export default Autocomplete;
