import React from "react";

const LoadingScreen = () => {
  return (
    <div className="container mt-50">
      <div className="row">
        <div className="col m12 center-align">
          <div class="preloader-wrapper big active">
            <div class="spinner-layer spinner-blue-only">
              <div class="circle-clipper left">
                <div class="circle"></div>
              </div>
              <div class="gap-patch">
                <div class="circle"></div>
              </div>
              <div class="circle-clipper right">
                <div class="circle"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
