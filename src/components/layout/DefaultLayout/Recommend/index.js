import React, { Fragment, useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "service/config";
import MovieCard from "components/movie/MovieCard";

const Recomment = () => {
  const [movies, setMovies] = useState([]);
  const { data } = useSWR(tmdbAPI.getMovieMeta("movie", "popular"), fetcher);
  useEffect(() => {
    if (!data) return null;
    if (data && data.results) {
      setMovies(data.results);
    }
  }, [data]);

  return (
    <Fragment>
      <section className="pb-[100px] mt-10 movie-layout">
        <h2 className="mb-6 text-3xl font-bold movie-type ">
          Recommended for you
        </h2>
        <div className="grid grid-cols-4 gap-6 lg:grid-cols-3 ms:grid-cols-2 sx:grid-cols-2 sx:gap-x-4">
          {movies.length > 0 &&
            movies
              .slice(0, 12)
              .map((item, index) => (
                <MovieCard key={item.id} item={item}></MovieCard>
              ))}
        </div>
      </section>
    </Fragment>
  );
};

export default Recomment;
