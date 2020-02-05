import React, { Component } from "react";

export class LoaderMini extends Component {
  render() {
    return (
      <div>
        <div className="preloader-wrapper small active">
          <div className="spinner-layer custom-spinner-layer spinner-green-only">
            <div className="circle-clipper left">
              <div className="circle"></div>
            </div>
            <div className="gap-patch">
              <div className="circle"></div>
            </div>
            <div className="circle-clipper right">
              <div className="circle"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoaderMini;
