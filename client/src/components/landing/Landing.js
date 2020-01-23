import React, { Component } from "react";

class Landing extends Component {

  constructor() {
    super();
    document.body.classList.add("landing-bg");
  }

  componentWillUnmount = () => {
    document.body.classList.remove("landing-bg");
  }

  render() {
    return (
      <div>
        <div id="landing-overlay"></div>
      </div>
    );
  }
}

export default Landing;
