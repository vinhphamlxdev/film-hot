import React, { Fragment, useEffect, useState } from "react";
import useSWR from "swr";
import MovieCard from "components/movie/MovieCard";
import { apiKey, fetcher } from "service/config";
import useDebounce from "hooks/useDebounce";
import ReactPaginate from "react-paginate";
const itemsPerPage = 20;
const MoviePage = () => {
  const [nextPage, setNextPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [filter, setFilter] = useState("");

  const [url, setUrl] = useState(
    `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}=${nextPage}`
  );
  const filterDebounce = useDebounce(filter, 500);
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  const { data, error } = useSWR(url, fetcher);
  const loading = !data && !error;
  useEffect(() => {
    if (filterDebounce) {
      setUrl(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${filterDebounce}&page=${nextPage}`
      );
    } else {
      setUrl(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${nextPage}`
      );
    }
  }, [filterDebounce, nextPage]);
  const movies = data?.results || [];
  useEffect(() => {
    if (!data) return null;
    setPageCount(Math.ceil(data.total_results / itemsPerPage));
  }, [data, itemOffset]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.total_results;
    setItemOffset(newOffset);
    setNextPage(event.selected + 1);
  };
  return (
    <Fragment>
      <div className="container pb-10 pt-[150px]">
        <div className="flex items-center mb-10">
          <div className="relative w-[350px]">
            <input
              onChange={handleFilterChange}
              className="w-full px-4 py-3 text-white bg-transparent border border-gray-200 border-solid outline-none rounded-3xl bg-slate-800 placeholder:text-white focus:border focus:border-primary"
              placeholder="Search..."
              type="text"
            />
            <button className="absolute right-0 p-4 text-white top-2/4 -translate-y-2/4 ">
              <i className="text-2xl bi bi-search"></i>
            </button>
          </div>
        </div>
        {loading && (
          <div className="w-10 h-10 mx-auto border-4 rounded-full border-secondary border-t-transparent animate-spin "></div>
        )}
        <div className="grid grid-cols-4 gap-6 lg:grid-cols-3 sx:gap-x-4 ms:grid-cols-2 sx:grid-cols-2 ">
          {!loading &&
            movies.length > 0 &&
            movies.map((item, index) => (
              <MovieCard key={item.id} item={item}></MovieCard>
            ))}
        </div>
        <div className="mt-10 text-white">
          <ReactPaginate
            breakLabel="..."
            nextLabel=" >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< "
            renderOnZeroPageCount={null}
            className="pagination"
          />
        </div>
      </div>
    </Fragment>
  );
};

export default MoviePage;
