import React, { Component } from "react";

class Landing extends Component {

  constructor() {
    super();
    document.body.classList.add("landing-bg");
  }

  render() {
    return (
      <div>
        <div id="landing-overlay"></div>
        {/* <div class="container mt-100">
          <div className="row">
            <div className="col m8 offset-m2">
              <div className="heading center-align">
                Connect with friends and the world around you on Facebook.
              </div>
            </div>
          </div>
        </div> */}
      </div>
    );
  }
}

export default Landing;
