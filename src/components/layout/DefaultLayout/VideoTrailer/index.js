import React from "react";
import ReactDOM from "react-dom";
import { IoClose } from "react-icons/io5";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { apiKey, fetcher } from "service/config";

const VideoTrailer = ({ open = false, handleClose = () => {}, title }) => {
  const { movieId } = useParams();

  const { data } = useSWR(
    `https://api.themoviedb.org/3/${title}/${movieId}/videos?api_key=${apiKey}`,
    fetcher
  );
  if (!data) return null;
  const { results } = data;
  if (!data.results && data.results.length <= 0) return null;
  if (typeof document === "undefined")
    return <div className="modal-video"></div>;
  return ReactDOM.createPortal(
    <div
      className={`fixed  inset-0 transition-all duration-500  z-[100] modal-video ${
        open ? "" : "hidden"
      }`}
    >
      <div
        onClick={handleClose}
        className="absolute inset-0 bg-black opacity-60 overlay "
      ></div>
      <div className="inline-block close-video-btn">
        <IoClose
          onClick={handleClose}
          className="absolute text-2xl text-white cursor-pointer top-[40px] right-[40px] "
        ></IoClose>
      </div>
      {results.slice(0, 2).map((item, index) => (
        <div key={item.id}>
          <iframe
            className=" ms:w-[350px] ms:h-[250px] w-[800px] h-[510px] lg:w-[650px] lg:h-[350px] absolute inset-0 m-auto transition-all duration-500 "
            src={open ? `https://www.youtube.com/embed/${item.key}` : ""}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ))}
    </div>,
    document.querySelector("body")
  );
};

export default VideoTrailer;
