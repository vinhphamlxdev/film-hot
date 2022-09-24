import React, { Fragment, useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "service/config";
import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import { useNavigate, useParams } from "react-router-dom";
const Banner = () => {
  SwiperCore.use([Autoplay]);

  const [movies, setMovies] = useState([]);
  const { data } = useSWR(tmdbAPI.getMovieList("movie", "popular"), fetcher);
  const { category, movieId } = useParams();
  useEffect(() => {
    if (data && data.results) {
      setMovies(data.results);
    }
  }, [data, movies]);

  return (
    <Fragment>
      <div className="flex overflow-hidden banner-section">
        <Swiper
          grabCursor={true}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          speed={500}
          autoplay={{ delay: 4000 }}
        >
          {movies.map((item, index) => (
            <SwiperSlide key={item.id}>
              {({ isActive }) => (
                <BannerItem
                  item={item}
                  className={`${isActive ? "active" : ""}`}
                ></BannerItem>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Fragment>
  );
};
const BannerItem = ({ item, className }) => {
  const { poster_path, backdrop_path, id } = item;
  const navigate = useNavigate();

  return (
    <Fragment>
      <div
        className={`relative select-none w-full py-[150px] sx:pt-[88px] sx:pb-[80px] lg:pt-[130px] lg:pb-[100px] ms:pt-[90px] ms:pb-[50px] after:absolute after:inset-0 after:content-['']  overflow-hidden cursor-pointer hero-slide ${className} `}
        style={{
          backgroundImage: `url(${tmdbAPI.imageOriginal(backdrop_path)})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container relative z-30 ">
          <div className="grid items-center grid-cols-2 sx:grid-cols-1 banner-content">
            <div className="hero-slide__item__content__info">
              <h2 className="text-white ms:text-3xl hero-slide-title  my-[30px] lg:text-4xl lg:leading-10 text-[50px] font-bold leading-[1] ">
                {item.title}
              </h2>
              <div className="my-5 text-lg font-medium text-justify text-white lg:hidden hero-slide-overview overview">
                {item.overview}
              </div>
              <div className="flex gap-x-4 hero-slide-btn">
                <button
                  onClick={() => navigate(`/video/movie/${id}`)}
                  className="relative px-6 py-2 text-base font-medium text-center text-white uppercase transition-all duration-500 sx:text-xs whitespace-nowrap ms:text-sm hover:bg-opacity-80 bg-secondary rounded-3xl "
                >
                  Watch Now
                </button>
                <button
                  onClick={() => navigate(`/movie/${id}`)}
                  className="relative px-6 py-2 text-base font-medium text-center text-white uppercase transition-all duration-500 sx:text-xs whitespace-nowrap ms:text-sm hover:bg-opacity-80 bg-gradient-to-r from-purple-600 to-pink-500 rounded-3xl "
                >
                  Watch Info
                </button>
              </div>
            </div>
            <div className="w-[280px] lg:hidden     transition-all duration-700 rounded-xl ml-auto h-[380px]">
              <img
                className="w-full h-full transition-all duration-700 hero-slide-img rounded-xl "
                src={tmdbAPI.image500(poster_path || backdrop_path)}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default Banner;
