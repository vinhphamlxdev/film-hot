import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { apiKey, fetcher, tmdbAPI } from "service/config";

const Credits = ({ category }) => {
  const { movieId } = useParams();
  const { data } = useSWR(
    `https://api.themoviedb.org/3/${category}/${movieId}/credits?api_key=${apiKey}`,
    fetcher
  );
  if (!data) return null;
  const { cast } = data;
  if (!cast || cast.length < 0) return null;
  return (
    <div className="mt-10">
      <h3 className="w-full mb-4 text-4xl font-semibold text-center text-white">
        Cast
      </h3>
      <div className="grid grid-cols-4 gap-6 lg:grid-cols-3 ms:grid-cols-2 sx:gap-x-4 sx:grid-cols-2">
        {cast.slice(0, 8).map((item, index) => (
          <div className="mb-6" key={item.id}>
            <div className="h-[250px] sx:h-[150px]  rounded-lg">
              <img
                className="object-cover w-full h-full rounded-lg "
                src={tmdbAPI.imageOriginal(item.profile_path)}
                alt=""
              />
            </div>
            <div className="mt-2">
              <h4 className="text-xl font-medium text-left text-white sx:text-lg ">
                {item.name}
              </h4>
              <span className="text-base text-third">{item.character}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Credits;
