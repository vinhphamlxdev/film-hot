import React from "react";
import bgSignUp from "assets/bgSignup.jpg";
import { RiFacebookFill, RiTwitterFill, RiLinkedinFill } from "react-icons/ri";
import { TiSocialPinterest } from "react-icons/ti";
const Footer = () => {
  return (
    <div className="relative pt-10">
      <div
        className=" z-20 py-[60px] ms:py-10 relative after:absolute after:content-[''] after:inset-0 after:w-full after:h-full footer-section "
        style={{
          backgroundImage: `url(${bgSignUp})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <div className="relative z-20 grid grid-cols-4 lg:grid-cols-2 gap-x-6 ms:grid-cols-1">
            <div className="flex flex-col lg:mb-5 ">
              <h3 className="text-xl font-semibold text-white mb-[25px]">
                Explore
              </h3>
              <ul className="flex flex-col">
                <li className=" text-base mb-[10px] cursor-pointer text-white ">
                  Top Movies
                </li>
                <li className=" text-base mb-[10px] cursor-pointer text-white ">
                  Top Shows
                </li>
                <li className=" text-base mb-[10px] cursor-pointer text-white ">
                  Coming Soon
                </li>
                <li className=" text-base mb-[10px] cursor-pointer text-white ">
                  Now Playing
                </li>
              </ul>
            </div>
            <div className="flex flex-col lg:mb-5 ">
              <h3 className="text-xl font-semibold text-white mb-[25px]">
                Genres
              </h3>
              <ul className="flex flex-col">
                <li className=" text-base mb-[10px] cursor-pointer text-white ">
                  Action
                </li>
                <li className=" text-base mb-[10px] cursor-pointer text-white ">
                  Comedy
                </li>
                <li className=" text-base mb-[10px] cursor-pointer text-white ">
                  Drama
                </li>
                <li className=" text-base mb-[10px] cursor-pointer text-white ">
                  Crime
                </li>
                <li className=" text-base mb-[10px] cursor-pointer text-white ">
                  Adventure
                </li>
              </ul>
            </div>
            <div className="flex flex-col lg:mb-5 ">
              <h3 className="text-xl font-semibold text-white mb-[25px]">
                Pages
              </h3>
              <ul className="flex flex-col">
                <li className=" text-base mb-[10px] cursor-pointer text-white ">
                  Privacy Policy
                </li>
                <li className=" text-base mb-[10px] cursor-pointer text-white ">
                  Terms of Use
                </li>
                <li className=" text-base mb-[10px] cursor-pointer text-white ">
                  Cookie Policy
                </li>
                <li className=" text-base mb-[10px] cursor-pointer text-white ">
                  Contact
                </li>
              </ul>
            </div>
            <div className="flex flex-col lg:mb-5 ">
              <h3 className="text-xl font-semibold text-white mb-[25px]">
                Community
              </h3>
              <ul className="flex flex-col">
                <li className=" text-base mb-[10px] cursor-pointer text-white ">
                  Guidelines
                </li>
                <li className=" text-base mb-[10px] cursor-pointer text-white ">
                  Discussions
                </li>
                <li className=" text-base mb-[10px] cursor-pointer text-white ">
                  Leaderboard
                </li>
                <li className=" text-base mb-[10px] cursor-pointer text-white ">
                  Twitter
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-between px-4 bg-[#000] py-5">
        <div className="text-3xl font-semibold text-white ">Vinh Pham</div>
        <ul className="flex">
          <li className="footer-social mr-[10px] flex justify-center items-center  rounded-full transition-all duration-500 w-[35px] h-[35px] bg-[#3b5998]  hover:bg-white border border-[#3b5998] cursor-pointer   hover:text-[#3b5998]   ">
            <RiFacebookFill className="social-facebook w-[35px] inline-block  text-white   leading-[0px] font-normal "></RiFacebookFill>
          </li>
          <li className="footer-social mr-[10px] flex justify-center items-center  rounded-full transition-all duration-500 w-[35px] h-[35px] bg-[#1da1f2]  hover:bg-white border border-[#1da1f2] cursor-pointer   hover:text-[#3b5998]   ">
            <RiTwitterFill className="text-lg text-white social-twiter "></RiTwitterFill>
          </li>
          <li className="footer-social mr-[10px] flex justify-center items-center  rounded-full transition-all duration-500 w-[35px] h-[35px] bg-[#c13584]  hover:bg-white border border-[#c13584] cursor-pointer   hover:text-[#3b5998]   ">
            <TiSocialPinterest className="text-lg text-white social-pinterest"></TiSocialPinterest>
          </li>
          <li className="footer-social    flex justify-center items-center  rounded-full transition-all duration-500 w-[35px] h-[35px] bg-[#007bb5]  hover:bg-white border border-[#007bb5] cursor-pointer   hover:text-[#3b5998]   ">
            <RiLinkedinFill className="text-lg text-white social-linkedin"></RiLinkedinFill>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
