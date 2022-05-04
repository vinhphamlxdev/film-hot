import React, { Fragment } from "react";

const LoadingScreen = (loading) => {
  return (
    <Fragment>
      <div className="fixed inset-0 flex z-[999] items-center justify-center w-full h-screen">
        <div className="w-[100px] mx-auto h-[100px] animate-spin bg-transparent border-8 rounded-full border-primary border-t-transparent "></div>
      </div>
    </Fragment>
  );
};

export default LoadingScreen;
