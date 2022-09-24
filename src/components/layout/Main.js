import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import BackTop from "../button/BackTop";
import Footer from "./Footer";
import Header from "./Header";

const Main = () => {
  return (
    <Fragment>
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
      <BackTop></BackTop>
    </Fragment>
  );
};

export default Main;
