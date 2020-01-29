import React from "react";

const LoadingScreen = () => {
  return (
    <div className="container mt-50">
      <div className="row">
        <div className="col m12 s12 center-align">
          <div className="preloader-wrapper big active">
            <div className="spinner-layer custom-spinner-layer">
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
      </div>
    </div>
  );
};

export default LoadingScreen;
