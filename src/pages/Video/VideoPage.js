import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import defaultAvatar from "../../assets/avatardefault.png";
import useSWR from "swr";
import { apiKey, fetcher, tmdbAPI } from "../../service/config";
import timeImg from "../../assets/time.png";
import MovieList from "../../components/movie/MovieList";
import { useLoginStore } from "../../components/User/User";
import { toast } from "react-toastify";
import { collection, addDoc, getDocs, where, query } from "firebase/firestore";
import { db } from "../../firebase-app/firebaseConfig";

const VideoPage = () => {
  const user = useLoginStore((state) => state.user);
  const [episodesId, setEpisodesId] = useState(0);
  const [value, setValue] = useState("");
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();
  const buttonRef = useRef(null);
  const { category, movieId } = useParams();
  let src = ` https://2embed.org/embed/${movieId}`;
  useEffect(() => {
    handleGetComment();
  }, []);
  const handleGetComment = async () => {
    const querySnapshot = await getDocs(
      query(collection(db, "comments"), where("idMovie", "==", movieId))
    );
    const listComment = [];
    querySnapshot.forEach((doc) => {
      listComment.push({
        ...doc.data(),
        id: doc.id,
      });
    });
    setComments(listComment);
  };

  const [url, setUrl] = useState(
    `https://2embed.org/embed/${category}?id=${movieId}&s=1&e=1`
  );

  const { data } = useSWR(
    `
    https://api.themoviedb.org/3/${category}/${movieId}?api_key=${apiKey}`,
    fetcher
  );

  const handleClick = (episodesId) => {
    setEpisodesId(episodesId);
    setUrl(`https://2embed.org/embed/tv?id=${movieId}&s=1&e=${episodesId + 1}`);
    window.scrollTo(0, 0);
  };

  if (!data) return null;
  const {
    release_date,
    overview,
    vote_average,
    first_air_date,
    name,
    number_of_episodes,
    title,
  } = data;
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userComments = {
      uid: user.uid,
      img: user.photoURL,
      name: user.displayName,
    };
    const data = { user: userComments, idMovie: movieId, comments: value };
    console.log("day la data comment:", data);
    try {
      value.trim() !== ""
        ? addDoc(collection(db, "comments"), data)
        : toast.error("errror when add comment");
      handleGetComment();
      setValue("");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  const handleComment = (e) => {
    setValue(e.target.value);
  };
  return (
    <Fragment>
      <div className=" mt-[100px] lg:mt-[150px]">
        <div className="container ">
          <div className="flex w-full gap-x-4">
            <div className="w-[70%] lg:w-full">
              <div className="hidden mb-5 lg:block ">
                <h3 className="text-3xl font-semibold text-white ">
                  {title || name}
                </h3>
                <div className="flex items-center gap-3 ">
                  <div className="text-base text-white text-opacity-50">
                    {vote_average}
                    <i className="pl-1 inline-block leading-[0] text-xs text-third bi bi-star-fill"></i>
                  </div>
                  <div className="flex items-center text-base text-white">
                    <span>
                      {new Date(release_date || first_air_date).getFullYear()}
                    </span>
                    <div className="w-4 h-4 pl-1">
                      <img className="w-full h-full" src={timeImg} alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full flex-shrink-0 h-[500px] sx:h-[350px] lg:h-[450px]">
                <div className="w-full h-full">
                  <iframe
                    className="w-full h-full"
                    src={`${url}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
              <div className="mt-5 ">
                <div className="lg:hidden">
                  <h3 className="text-3xl font-semibold text-white ">
                    {title || name}
                  </h3>
                  <div className="flex items-center gap-3 ">
                    <div className="text-base text-white text-opacity-50">
                      {vote_average}
                      <i className="pl-1 inline-block leading-[0] text-xs text-third bi bi-star-fill"></i>
                    </div>
                    <div className="flex items-center text-base text-white">
                      {new Date(release_date || first_air_date).getFullYear()}
                      <div className="w-4 h-4 pl-1">
                        <img className="w-full h-full" src={timeImg} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="hidden mb-3 text-xl text-white lg:block">
                    STORYLINE
                  </span>
                  <p className="text-base text-justify text-white text-opacity-50">
                    {overview}
                  </p>
                </div>
                <h3 className="block mt-5 mb-4 text-lg font-semibold text-white">
                  Episode
                </h3>
                <div className="grid grid-cols-10 gap-6 my-5 mt-5 ms:gap-x-4 lg:grid-cols-5 ">
                  {new Array(number_of_episodes).fill(0).map((item, index) => (
                    <button
                      ref={buttonRef}
                      onClick={() => handleClick(index)}
                      key={index}
                      className={`inline-block transition-all duration-700 hover:bg-bgGradient p-3 text-white rounded-md   ${
                        episodesId === index ? "bg-bgGradient" : "bg-bgCard"
                      }
                    
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
                <div className="mt-10">
                  {/* comment */}
                  <div className="mt-10">
                    <h3 className="text-2xl font-normal text-white">
                      Comments
                    </h3>
                    {!user ? (
                      <div className="flex items-center h-12 gap-3 px-3 my-6 border border-gray-600 rounded-full">
                        <img
                          className="w-[30px] h-[30px] rounded-full"
                          src={defaultAvatar}
                          alt=""
                        />
                        <div className="text-base font-normal text-white">
                          You need to{" "}
                          <div
                            onClick={() =>
                              first_air_date
                                ? navigate(`/sign-in/tv/${movieId}`)
                                : navigate(`/sign-in/movie/${movieId}`)
                            }
                            className="inline-block px-1 text-blue-500 cursor-pointer "
                          >
                            Sign in
                          </div>
                          to comment
                        </div>
                      </div>
                    ) : (
                      <form
                        onSubmit={handleSubmit}
                        className="relative my-6 border border-gray-600 rounded-full"
                        action=""
                      >
                        <img
                          className="w-[30px] h-[30px] rounded-full absolute top-1/2 -translate-y-1/2 left-[10px]"
                          src={user.photoURL}
                          alt=""
                        />
                        <input
                          value={value}
                          onChange={handleComment}
                          className="w-full h-12 px-12 text-white bg-transparent outline-none"
                          type="text"
                          placeholder="Comment what you think..."
                        />
                        <button
                          onClick={handleSubmit}
                          className="absolute  rounded-2xl  right-[14px] p-3  top-1/2 -translate-y-1/2"
                        >
                          <i className="text-2xl text-white bi bi-send-fill"></i>
                        </button>
                      </form>
                    )}
                    <div className="flex flex-col gap-y-4">
                      {comments.map((item, index) => (
                        <div
                          key={index}
                          className="flex flex-col items-stretch gap-3"
                        >
                          <div className="flex gap-2">
                            <img
                              className="w-[50px] h-[50px] rounded-full"
                              src={item.user.img}
                              alt=""
                            />
                            <div className="flex flex-col items-stretch">
                              <div className="flex items-end gap-2">
                                <h4 className="text-xl font-medium text-white">
                                  {item.user.name}
                                </h4>
                                {/* <span className="text-sm text-gray-400">
                                  4 phut truoc
                                </span> */}
                              </div>
                              <span className="text-base font-normal text-white">
                                {item.comments}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* comment */}
                </div>
              </div>
              <div className="hidden lg:block ">
                <section className="container mt-10 movie-layout">
                  <div className="flex justify-between mb-5">
                    <h2 className="text-2xl font-bold text-white movie-type">
                      Trending Now
                    </h2>
                    <span className="flex items-center text-base text-textColor ">
                      All movie<i className="bi bi-chevron-right"></i>
                    </span>
                  </div>
                  <MovieList heading="movie" type="popular"></MovieList>
                </section>
              </div>
            </div>

            <div className="flex flex-col flex-1 p-3 lg:hidden ">
              <h3 className="mb-5 text-xl text-white title-primary ">
                Trending Now
              </h3>
              <div className="card-movie-list flex flex-col h-[400px]">
                <CardItem></CardItem>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
const CardItem = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const { data } = useSWR(tmdbAPI.getMovieList("movie", "popular"), fetcher);
  useEffect(() => {
    if (data && data.results) {
      setMovies(data.results);
    }
  }, [data]);

  return (
    <Fragment>
      {movies.slice(0, 16).map((item, index) => (
        <div
          onClick={() => navigate(`/movie/${item.id}`)}
          key={item.id}
          className="flex p-3 mb-5 cursor-pointer rounded-xl bg-bgCard gap-x-3"
        >
          <div className="w-[140px] relative movie-card-image flex-shrink-0 h-[150px] rounded-lg">
            <img
              className="object-cover w-full h-full rounded-lg "
              src={tmdbAPI.image500(item.poster_path)}
              alt=""
            />
          </div>
          <div className="flex flex-col flex-1 gap-y-2 ">
            <h4 className="text-base font-medium text-white">{item.title}</h4>
            <div className="flex items-center justify-between">
              <span className="text-xs font-normal text-white text-opacity-50 ">
                {new Date(item.release_date).getFullYear()}
              </span>
              <span className="text-xs text-white text-opacity-50">
                {item.vote_average}
                <i className="pl-[6px] text-xs text-yellow-500 bi bi-star-fill"></i>
              </span>
            </div>
            <div className="flex mt-3 gap-x-3">
              <button className="px-3 py-1 text-white bg-transparent border border-solid rounded-lg border-primary ">
                Action
              </button>
              <button className="px-3 py-1 text-white bg-transparent border border-solid rounded-lg border-primary ">
                Adventure
              </button>
            </div>
            <ul className="flex items-center mt-auto">
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

              <span className="pt-1 ml-3 text-xs font-normal text-white text-opacity-50">
                ({item.vote_count} Vote)
              </span>
            </ul>
          </div>
        </div>
      ))}
    </Fragment>
  );
};
export default VideoPage;
