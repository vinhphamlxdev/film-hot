import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { tmdbAPI } from "../../service/config";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";

const MovieCard = ({ item }) => {
  const {
    title,
    poster_path,
    backdrop_path,
    release_date,
    vote_average,
    id,
    name,
    first_air_date,
  } = item;
  const navigate = useNavigate();
  return (
    <Fragment>
      <div
        onClick={() =>
          release_date ? navigate(`/movie/${id}`) : navigate(`/tv/${id}`)
        }
        className="flex flex-col h-full p-3 cursor-pointer select-none bg-bgCard rounded-xl"
      >
        <div className="w-full relative movie-card-image sx:h-[150px] rounded-lg flex-shrink-0 h-[250px]">
          <img
            className="object-cover w-full h-full rounded-lg"
            src={tmdbAPI.image500(poster_path || backdrop_path)}
            alt=""
          />
        </div>
        <div className="flex flex-col flex-1 mt-3 movie-card-content">
          <h3 className="block mb-3 text-xl font-semibold text-white sx:text-lg">
            {title || name}
          </h3>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-normal text-white text-opacity-50 ">
              {new Date(release_date || first_air_date).getFullYear()}
            </span>
            <span className="text-xs text-white text-opacity-50">
              {vote_average}
              <i className="pl-[6px] text-xs text-yellow-500 bi bi-star-fill"></i>
            </span>
          </div>
          <ul className="flex items-center mb-3 sx:hidden ">
            <li className="leading-[0]">
              <i className="ml-2 text-xs text-third bi bi-star-fill"></i>
            </li>
            <li className="leading-[0]">
              <i className="ml-2 text-xs text-third bi bi-star-fill"></i>
            </li>
            <li className="leading-[0]">
              <i className="ml-2 text-xs text-third bi bi-star-fill"></i>
            </li>
            <li className="leading-[0]">
              <i className="ml-2 text-xs text-third bi bi-star-fill"></i>
            </li>
            <li className="leading-[0]">
              <i className="ml-2 text-xs text-third bi bi-star-half"></i>
            </li>
          </ul>
          <div className="mt-auto">
            <button className="w-full px-3 py-2 text-white rounded-lg bg-bgGradient ">
              Watch Now
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
MovieCard.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    vote_average: PropTypes.number,
    release_date: PropTypes.string,
    poster_path: PropTypes.string,
    id: PropTypes.number,
  }),
};
// function showRatings(rating) {
//   var results = [];
//   for (var i = 1; i <= rating - 3; i++) {
//     results.push(
//       <li className="leading-[0] ">
//         <i className="text-xs text-third bi bi-star-fill"></i>
//       </li>
//     );
//   }
//   for (var j = 1; j <= 10 - rating; j++) {
//     results.push(
//       <li className="leading-[0] ">
//         <i className="text-xs text-third bi bi-star-half"></i>
//       </li>
//     );
//   }

//   console.log(rating);
//   return results;
// }
function FallbackComponent() {
  return (
    <div className="text-xl text-red-500 bg-red-50">
      something went wrong with this component
    </div>
  );
}
export default withErrorBoundary(MovieCard, {
  FallbackComponent,
});
