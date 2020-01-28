import React, { Component } from "react";
import Script from "react-load-script";
import AutocompleteHelper from "react-google-autocomplete";
// https://www.npmjs.com/package/react-google-autocomplete

class Autocomplete extends Component {
  state = {
    current_value: "",
    places_script_loading: true
  };

  handle_script_load = () => {
    this.setState({ places_script_loading: false });
  };

  output = () => {
    const { field_name } = this.props;
    const { errors } = this.props.form;

    return (
      <div>
        <AutocompleteHelper
          onPlaceSelected={place => {
            const { setFieldValue } = this.props.form;
            setFieldValue(field_name, place.formatted_address);
          }}
          fields={["formatted_address"]}
          onBlur={this.handle_blur}
          placeholder=""
          className={field_name in errors ? "invalid" : ""}
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
