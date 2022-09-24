import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { GiFilmSpool } from "react-icons/gi";
import { AiOutlineUser } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import SidebarMenu from "../Sidebar";
import useClickOutSide from "../../../../hooks/useClickOutSide";
import { useLoginStore } from "../../../../components/User/User";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";
import { authentication } from "../../../../firebase-app/firebaseConfig";
import MenuItem from "./Menu/MenuItem";
const Header = (props) => {
  const navigate = useNavigate();
  const user = useLoginStore((state) => state.user);
  const setUser = useLoginStore((state) => state.setUser);
  const handleLogout = () => {
    signOut(authentication)
      .then(() => {
        setUser(undefined);
      })
      .catch((error) => {
        console.log(error);
      });
    toast.success("Logout successfully");
  };
  const { show, setShow, nodeRef, menuRef } = useClickOutSide();
  const [nav, setNav] = useState(false);
  useEffect(() => {
    function handleScroll() {
      if (window.scrollY || window.screenTop > 5) {
        setNav(true);
      } else {
        setNav(false);
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <Fragment>
      <header
        className={`top-0 left-0 lg:px-3   header right-0 fixed z-50 flex items-center justify-between w-full px-8 py-5 text-white transition-all duration-500 bg-transparent   gap-x-5 ${
          nav ? "isSticky" : ""
        }`}
      >
        <div className="flex items-center justify-between ">
          <div className="flex items-center">
            <NavLink to={"/"} className="cursor-pointer logo">
              <GiFilmSpool className="text-[50px]  text-red-500"></GiFilmSpool>
            </NavLink>
            <div className="flex items-center pl-10 lg:hidden lg:pl-6">
              <div className="px-4 text-base font-medium transition-all duration-500 whitespace-nowrap ">
                <MenuItem to={"/"} title="Home" />
              </div>
              <div className="px-4 text-base font-medium transition-all duration-500 whitespace-nowrap ">
                <MenuItem to={"/movies"} title="Movies" />
              </div>
              <div className="px-4 text-base font-medium transition-all duration-500 whitespace-nowrap ">
                <MenuItem to={"/tv-series"} title="TV Series" />
              </div>
            </div>
          </div>
        </div>

        <ul className="flex items-center justify-end lg:hidden ">
          <NavLink to={"/movies"} className="mr-6 cursor-pointer sx:hidden ">
            <i className="text-lg text-white bi bi-search"></i>
          </NavLink>
          {user ? (
            <li className="cursor-pointer sx:mx-0">
              <div className="relative w-8 h-8 rounded-full user-avatar ">
                <img
                  className="object-cover w-full h-full rounded-full"
                  src={user.photoURL}
                  alt=""
                />
                <div className="absolute z-50 -bottom-[108px] user-info transition-all duration-500 hidden rounded-md  bg-bgMain w-[200px] -left-[170px]">
                  <div className="flex items-center p-3 gap-x-3">
                    <AiOutlineUser className="text-base text-white"></AiOutlineUser>
                    <span className="text-lg text-white">
                      {user.displayName}
                    </span>
                  </div>
                  <div
                    onClick={handleLogout}
                    className="flex items-center p-3 border-t border-gray-600 gap-x-3"
                  >
                    <FiLogOut className="text-base text-white"></FiLogOut>
                    <span className="text-lg text-white">Logout</span>
                  </div>
                </div>
              </div>
            </li>
          ) : (
            <div
              onClick={() => navigate(`/sign-in`)}
              className="cursor-pointer sx:mx-0"
            >
              <button className="px-3 py-1 text-white rounded-lg bg-pinkColor ">
                Sign In
              </button>
            </div>
          )}
        </ul>
        <div
          ref={menuRef}
          onClick={() => setShow(!show)}
          className={`relative  hidden w-10 h-10 rounded-md cursor-pointer menu-icon-bar bg-bgGradient lg:block ${
            show ? "active" : ""
          }`}
        >
          <div className="absolute hamburger"></div>
        </div>
      </header>
      <SidebarMenu show={show} ref={nodeRef}></SidebarMenu>
    </Fragment>
  );
};

export default Header;
