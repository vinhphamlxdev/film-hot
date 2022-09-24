import React from "react";
const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen ">
      <div className="flex flex-col gap-y-4 w-[500px] max-w-[550px] items-center justify-center ">
        <span className=" font-bold text-gray-600 text-[60px]">404</span>
        <h4 className="text-gray-600 font-bold text-[40px]">
          This Is 404 Page
        </h4>
      </div>
    </div>
  );
};

export default ErrorPage;
