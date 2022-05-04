import React, { useEffect, useState } from "react";

const BackTop = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    // show backtop btn
    const handleShow = () => {
      if (window.scrollY >= 2000) {
        setShow(true);
      } else {
        setShow(false);
      }
    };
    window.addEventListener("scroll", handleShow);
    return () => {
      window.removeEventListener("scroll", handleShow);
    };
    // handle back to top
  }, []);
  const handleBackTop = () => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };
  return (
    <div
      className={`z-[100] cursor-pointer   back-top bg-bgGradient   hover:-translate-y-2 ${
        show ? "show" : ""
      } `}
      onClick={handleBackTop}
    >
      <i className="text-xl text-white bi bi-arrow-up"></i>
    </div>
  );
};

export default BackTop;
