import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "service/config";
import VideoTrailer from "components/layout/VideoTrailer";
import Recomment from "components/layout/Recomment";
import Credits from "components/layout/Credits";

const MovieDetailsPage = () => {
  const { category, movieId } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [movieId]);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { data } = useSWR(tmdbAPI.getMovieDetails(category, movieId), fetcher);
  if (!data) return null;
  const {
    id,
    backdrop_path,
    poster_path,
    overview,
    title,
    release_date,
    vote_average,
    vote_count,
    name,
    first_air_date,
  } = data;

  return (
    <Fragment>
      <div
        className="relative  after:absolute after:content-[''] after:inset-0 after:w-full banner-detail after:h-full  w-full h-screen bg-no-repeat bg-cover"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${
            backdrop_path || poster_path
          })`,
          backgroundPosition: "center",
        }}
      >
        <div className="container relative z-30 pt-[150px] lg:pt-[200px]   flex gap-6">
          <div className="w-[300px] lg:hidden flex-shrink-0 rounded-lg h-[400px]">
            <img
              className="object-cover w-full h-full rounded-lg"
              src={tmdbAPI.image500(poster_path)}
              alt=""
            />
          </div>
          <div className="flex flex-col gap-4 ">
            <div className="flex gap-4 ">
              <h3 className="text-4xl font-bold text-white lg:text-3xl">
                {title || name}
              </h3>
              <button className="flex items-center justify-center w-10 h-10 bg-transparent border border-solid rounded-full lg:hidden border-primary">
                <i className="text-base bi leading-[0px] bi-heart-fill text-primary"></i>
              </button>
              <button className="flex items-center justify-center w-10 h-10 bg-transparent border border-white border-solid rounded-full lg:hidden">
                <i className="text-base bi leading-[0px]  bi-share-fill text-white"></i>
              </button>
              <button className="flex items-center justify-center w-10 h-10 bg-transparent border border-white border-solid rounded-full lg:hidden">
                <i className="text-base  leading-[0px]  bi bi-three-dots text-white"></i>
              </button>
            </div>

            <div className="flex gap-2">
              <button className="px-5 py-1 text-base font-normal text-white uppercase bg-transparent border border-white border-solid rounded-3xl ">
                Action
              </button>
              <button className="px-5 py-1 text-base font-normal text-white uppercase bg-transparent border border-white border-solid rounded-3xl ">
                Adventure
              </button>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <button
                onClick={() =>
                  first_air_date
                    ? navigate(`/video/tv/${id}`)
                    : navigate(`/video/movie/${id}`)
                }
                className="relative px-6 py-2 text-base font-medium text-center text-white uppercase transition-all duration-500 whitespace-nowrap hover:bg-opacity-80 bg-secondary rounded-3xl "
              >
                Watch Now
              </button>
              <button
                onClick={() => setShow(true)}
                className="relative px-6 py-2 text-base font-medium text-center text-white uppercase transition-all duration-500 whitespace-nowrap hover:bg-opacity-80 bg-gradient-to-r from-purple-600 to-pink-500 rounded-3xl "
              >
                Watch Trailer
              </button>
              <button className="relative px-6 py-2 text-base font-medium text-center text-white uppercase transition-all duration-500 sx:hidden whitespace-nowrap hover:bg-opacity-80 bg-third rounded-3xl">
                {vote_average}
                <i className="ml-2 text-white bi bi-star-fill"></i>
              </button>
            </div>
            <ul className="flex">
              <li>
                <i className="text-xs text-third bi bi-star-fill"></i>
              </li>
              <li>
                <i className="ml-2 text-xs text-third bi bi-star-fill"></i>
              </li>
              <li>
                <i className="ml-2 text-xs text-third bi bi-star-fill"></i>
              </li>
              <li>
                <i className="ml-2 text-xs text-third bi bi-star-fill"></i>
              </li>
              <li>
                <i className="ml-2 text-xs text-third bi bi-star-fill"></i>
              </li>
              <li>
                <i className="ml-2 text-xs text-third bi bi-star-fill"></i>
              </li>
              <li>
                <i className="ml-2 text-xs text-third bi bi-star-fill"></i>
              </li>
              <span className="ml-3 text-lg font-normal text-white">
                ({vote_count} Vote)
              </span>
            </ul>
            <div className="mt-0">
              <span className="text-xl font-medium text-white uppercase ">
                storyline
              </span>
              <p className="mt-2 text-base text-justify text-white text-opacity-50">
                {overview}
              </p>
            </div>
            <div className="text-xl text-white">
              <span>
                {new Date(release_date || first_air_date).getFullYear()}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-10">
        <Credits category={category}></Credits>
        <VideoTrailer
          title={category}
          handleClose={() => setShow(false)}
          open={show}
        ></VideoTrailer>
        <Recomment></Recomment>
      </div>
    </Fragment>
  );
};

export default MovieDetailsPage;
