import React, { Fragment } from "react";
import MovieList from "../../components/movie/MovieList";
import Banner from "../../components/banner/Banner";
const HomePage = () => {
  return (
    <Fragment>
      <Banner />
      <section className="container mt-10 movie-layout">
        <div className="flex justify-between mb-5">
          <h2 className="text-xl font-bold text-white movie-type">Upcoming</h2>
          <span className="flex items-center text-base text-textColor ">
            All movie<i className="bi bi-chevron-right"></i>
          </span>
        </div>
        <MovieList heading="movie" type="upcoming"></MovieList>
      </section>
      <section className="container mt-10 movie-layout">
        <div className="flex justify-between mb-5">
          <div className="flex items-center">
            <h2 className="text-2xl font-bold text-white movie-type">
              Top Rated Movies
            </h2>
            <i className="pl-2 mt-1 text-xs bi text-starIcon bi-star-fill"></i>
          </div>
          <span className="flex items-center text-base text-textColor ">
            All movie<i className="bi bi-chevron-right"></i>
          </span>
        </div>
        <MovieList type="top_rated"></MovieList>
      </section>
      <section className="container mt-10 movie-layout">
        <div className="flex justify-between mb-5">
          <div className="flex items-center">
            <h2 className="text-2xl font-bold text-white movie-type">
              Popular
            </h2>
          </div>
          <span className="flex items-center text-base text-textColor ">
            All movie<i className="bi bi-chevron-right"></i>
          </span>
        </div>
        <MovieList type="popular"></MovieList>
      </section>
      <section className="container mt-10 movie-layout">
        <div className="flex justify-between mb-5">
          <h2 className="text-2xl font-bold text-white movie-type">
            Now Playing
          </h2>
          <span className="flex items-center text-base text-textColor ">
            All movie<i className="bi bi-chevron-right"></i>
          </span>
        </div>
        <MovieList></MovieList>
      </section>
      <section className="container mt-10 movie-layout">
        <div className="flex justify-between mb-5">
          <h2 className="text-2xl font-bold text-white movie-type">
            Tv Top Rated
          </h2>
          <span className="flex items-center text-base text-textColor ">
            All movie<i className="bi bi-chevron-right"></i>
          </span>
        </div>
        <MovieList title="tv" type="top_rated"></MovieList>
      </section>
      <section className="container mt-10 movie-layout">
        <div className="flex justify-between mb-5">
          <h2 className="text-2xl font-bold text-white movie-type">
            Tv Popular
          </h2>
          <span className="flex items-center text-base text-textColor ">
            All movie<i className="bi bi-chevron-right"></i>
          </span>
        </div>
        <MovieList title="tv" type="popular"></MovieList>
      </section>
      <section className="container mt-10 movie-layout">
        <div className="flex justify-between mb-5">
          <h2 className="text-2xl font-bold text-white movie-type">
            Tv On The Air
          </h2>
          <span className="flex items-center text-base text-textColor ">
            All movie<i className="bi bi-chevron-right"></i>
          </span>
        </div>
        <MovieList title="tv" type="on_the_air"></MovieList>
      </section>
      <section className="container mt-10 movie-layout">
        <div className="flex justify-between mb-5">
          <h2 className="text-2xl font-bold text-white movie-type">
            Tv Airing Today
          </h2>
          <span className="flex items-center text-base text-textColor ">
            All movie<i className="bi bi-chevron-right"></i>
          </span>
        </div>
        <MovieList title="tv" type="airing_today"></MovieList>
      </section>
    </Fragment>
  );
};

export default HomePage;
