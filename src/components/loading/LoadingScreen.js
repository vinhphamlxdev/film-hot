import React, { Fragment } from "react";

const LoadingScreen = (loading) => {
  return (
    <Fragment>
      <div className="fixed inset-0 flex z-[999] items-center justify-center w-full h-screen">
        <div className="circle-loading2">
          <div></div>
          <div></div>
        </div>
      </div>
    </Fragment>
  );
};

export default LoadingScreen;
