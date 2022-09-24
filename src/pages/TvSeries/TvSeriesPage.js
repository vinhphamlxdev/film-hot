import React, { Fragment } from "react";
import { apiKey, fetcher } from "../../service/config";
import useSWRInfinite from "swr/infinite";
import MovieCard from "../../components/movie/MovieCard";
const itemsPerPage = 20;

const TvSeriesPage = () => {
  const { data, error, size, setSize } = useSWRInfinite(
    (index) =>
      `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&page=1`.replace(
        "page=1",
        `page=${index + 1}`
      ),
    fetcher
  );
  if (!data) return null;
  const loading = !data && !error;
  const isEmpty = data?.[0]?.results.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < itemsPerPage);

  const movies = data ? data.reduce((a, b) => a.concat(b.results), []) : [];
  return (
    <Fragment>
      <div className="container pb-10 pt-[150px]">
        {loading && (
          <div className="w-10 h-10 mx-auto border-4 rounded-full border-secondary border-t-transparent animate-spin "></div>
        )}
        <div className="grid grid-cols-4 gap-6 lg:grid-cols-3 ms:grid-cols-2 sx:grid-cols-2 sx:gap-x-4 ">
          {!loading &&
            movies.length > 0 &&
            movies.map((item, index) => (
              <MovieCard key={item.id} item={item}></MovieCard>
            ))}
        </div>
        <div className="w-full mt-5 text-center">
          <button
            disabled={isReachingEnd}
            onClick={() => setSize(size + 1)}
            className="relative px-6 py-2 text-base font-medium text-center text-white uppercase transition-all duration-500 hover:bg-opacity-80 bg-secondary rounded-3xl "
          >
            Load More
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default TvSeriesPage;
