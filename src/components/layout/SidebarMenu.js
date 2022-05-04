import { signOut } from "firebase/auth";
import React, { Fragment } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { GiFilmSpool } from "react-icons/gi";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authentication } from "../../firebase-app/firebaseConfig";
import { useLoginStore } from "../User/User";
const SidebarMenu = React.forwardRef((props, ref) => {
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
  const navigate = useNavigate();
  return (
    <Fragment>
      <div
        ref={ref}
        className={`fixed transition-all duration-500 top-0 w-[300px] sx:w-[280px] h-screen bottom-0  z-[200] bg-black px-5 pt-10 pb-6 left-0 ${
          props.show ? "" : "-translate-x-full"
        }`}
      >
        <div className="sidebar-logo">
          <div className="cursor-pointer ">
            <GiFilmSpool className="text-[50px]  text-red-500"></GiFilmSpool>
          </div>
          <div className="mt-10">
            <div className="mb-8 text-xl text-white text-opacity-50 uppercase ">
              MENU
            </div>
            <div className="flex flex-col gap-y-6 ">
              <div className="flex items-center gap-x-3">
                <NavLink
                  to={"/"}
                  className={({ isActive }) =>
                    isActive ? "title-primary" : ""
                  }
                >
                  <i className="text-2xl text-white bi bi-house-door-fill"></i>
                </NavLink>

                <div className="text-xl text-white">
                  <NavLink
                    to={"/"}
                    className={({ isActive }) =>
                      isActive ? "title-primary" : ""
                    }
                  >
                    Home
                  </NavLink>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <NavLink
                  to={"/movies"}
                  className={({ isActive }) =>
                    isActive ? "title-primary" : ""
                  }
                >
                  <i className="text-2xl text-white bi bi-compass"></i>
                </NavLink>

                <div className="text-xl text-white">
                  <NavLink
                    to={"/movies"}
                    className={({ isActive }) =>
                      isActive ? "title-primary" : ""
                    }
                  >
                    Movies
                  </NavLink>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <NavLink
                  to={"/tv-series"}
                  className={({ isActive }) =>
                    isActive ? "title-primary" : ""
                  }
                >
                  <i className="text-2xl text-white bi bi-tv"></i>
                </NavLink>

                <div className="text-xl text-white">
                  <NavLink
                    to={"/tv-series"}
                    className={({ isActive }) =>
                      isActive ? "title-primary" : ""
                    }
                  >
                    TV Series
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="mt-10 mb-4 text-xl text-white text-opacity-50 uppercase">
              Personal
            </div>
            {!user ? (
              <div className="flex items-center cursor-pointer gap-x-6">
                <FaSignInAlt className="text-xl font-medium text-white"></FaSignInAlt>
                <span
                  onClick={() => navigate(`/sign-in`)}
                  className="text-lg text-white cursor-pointer"
                >
                  Sign In
                </span>
              </div>
            ) : (
              <div className="flex flex-col gap-y-4">
                <div className="flex items-center">
                  <div className="w-[30px] h-[30px] rounded-full ">
                    <img
                      className="object-cover w-full h-full rounded-full "
                      src={user.photoURL}
                      alt=""
                    />
                  </div>
                  <span className="mt-1 ml-3 text-xl text-white">
                    {user.displayName}
                  </span>
                </div>
                <div onClick={handleLogout} className="flex items-center">
                  <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center">
                    <FiLogOut className="text-xl font-medium text-white"></FiLogOut>
                  </div>
                  <span className="text-lg text-white">Sign Out</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
});

export default SidebarMenu;
