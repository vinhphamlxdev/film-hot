import React, { Fragment, useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "service/config";
const MovieList = ({ title = "movie", type = "now_playing" }) => {
  const [movies, setMovies] = useState([]);
  const { data } = useSWR(tmdbAPI.getMovieList(title, type), fetcher);
  // console.log(data);
  useEffect(() => {
    if (data && data.results) {
      setMovies(data.results);
    }
  }, [data]);

  return (
    <Fragment>
      <Swiper
        spaceBetween={24}
        slidesPerView={4}
        loop={true}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          0: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
          630: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
          790: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 24,
          },
        }}
      >
        {movies.length > 0 &&
          movies.map((item, index) => (
            <SwiperSlide key={item.id}>
              <MovieCard item={item}></MovieCard>
            </SwiperSlide>
          ))}
      </Swiper>
    </Fragment>
  );
};

export default MovieList;
