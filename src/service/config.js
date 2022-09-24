export const fetcher = (...args) => fetch(...args).then((res) => res.json());
export const apiKey = "bd86b7dc8391003e2309db365bf9630d";
const tmdbEndPoint = `https://api.themoviedb.org/3`;
// https://api.themoviedb.org/3/tv/on_the_air?api_key=<<api_key>>&language=en-US&page=1
// https://api.themoviedb.org/3/movie/popular?api_key=<<api_key>>&language=en-US&page=1
export const tmdbAPI = {
  getMovieList: (title, type) =>
    `${tmdbEndPoint}/${title}/${type}?api_key=${apiKey}`,
  getMovieDetails: (heading, movieId) =>
    `${tmdbEndPoint}/${heading}/${movieId}?api_key=${apiKey}`,
  getMovieMeta: (heading, type) =>
    `${tmdbEndPoint}/${heading}/${type}?api_key=${apiKey}`,
  imageOriginal: (url) => `https://image.tmdb.org/t/p/original/${url}`,
  image500: (url) => `https://image.tmdb.org/t/p/w500/${url}`,
  getVideoTv: (heading, movieId, seasons, episodes) =>
    `${tmdbEndPoint}/${heading}/${movieId}?api_key=${apiKey}&s=${seasons}&e=${episodes}`,
};
