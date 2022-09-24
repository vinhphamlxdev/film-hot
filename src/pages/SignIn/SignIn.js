import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import bgSignIn from "assets/bgSignup.jpg";
import googleIcon from "assets/google.svg";
import facebookIcon from "assets/facebook.svg";
import { useLoginStore } from "components/User/User";
import { signInWithPopup } from "firebase/auth";
import {
  authentication,
  db,
  providerFacebook,
  providerGoogle,
} from "firebase-app/firebaseConfig";
import { toast } from "react-toastify";
const SignIn = () => {
  const navigate = useNavigate();
  const setUser = useLoginStore((state) => state.setUser);
  const user = useLoginStore((state) => state.user);
  const { category, movieId } = useParams();

  useEffect(() => {
    user && navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSignInGoogle = () => {
    signInWithPopup(authentication, providerGoogle)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setUser(user);
        movieId ? navigate(`/video/${category}/${movieId}`) : navigate(`/`);
        console.log(user);

        toast.success(`Login successfully, hello ${user.displayName}`);
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error("Something went Wrong!!", errorMessage);
      });
  };

  // const handleSignInFacebook = () => {
  //   signInWithPopup(authentication, providerFacebook)
  //     .then((result) => {
  //       const user = result.user;
  //       console.log(user);
  //       setUser(user);
  //       movieId ? navigate(`/video/${category}/${movieId}`) : navigate(`/`);
  //       console.log(user);

  //       toast.success(`Login successfully, hello ${user.displayName}`);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  return (
    <div
      className="w-screen h-screen"
      style={{
        backgroundImage: `url(${bgSignIn})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container">
        <div className="flex items-center justify-center w-full min-h-screen">
          <div className="px-10 gap-y-5 sx:py-10 sx:px-5 py-10 flex flex-col  bg-bgMain rounded-lg max-w-[400px] w-[350px] ">
            <h3 className="mb-5 text-3xl font-semibold text-center text-white">
              Sign In
            </h3>
            <button
              id="loginGoogle"
              onClick={handleSignInGoogle}
              className="flex justify-center  items-center bg-white text-black p-3 gap-3 rounded-md cursor-pointer hover:brightness-90 disabled:!brightness-75 disabled:!cursor-default transition duration-300 w-full"
            >
              <img className="w-6 h-6" src={googleIcon} alt="" />
              <span className="text-lg text-black">Sign In With Google</span>
            </button>
            {/* <button className="flex items-center justify-center bg-[#007aff] text-white p-3 gap-3 rounded-md cursor-pointer hover:brightness-90 disabled:!brightness-75 disabled:!cursor-default transition duration-300 w-full">
              <img className="w-6 h-6" src={facebookIcon} alt="" />
              <span className="text-lg text-white">Sign In With Facebook</span>
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
