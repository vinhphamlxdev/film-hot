import { lazy } from "react";
const HomePage = lazy(() => import("../pages/Home/HomePage"));
const MoviePage = lazy(() => import("../pages/Movie/MoviePage"));
const TvSeriesPage = lazy(() => import("../pages/TvSeries/TvSeriesPage"));
const MovieDetailsPage = lazy(() =>
  import("../pages/MovieDetail/MovieDetailsPage")
);
const VideoPage = lazy(() => import("../pages/Video/VideoPage"));
const SignIn = lazy(() => import("../pages/SignIn/SignIn"));

//  public Router
export const publicRoutes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/movies",
    component: MoviePage,
  },
  {
    path: "/tv-series",
    component: TvSeriesPage,
  },

  {
    path: "/:category/:movieId",
    component: MovieDetailsPage,
  },

  {
    path: "/video/:category/:movieId",
    component: VideoPage,
  },
  {
    path: "/sign-in/:category/:movieId",
    component: SignIn,
    layout: null,
  },
  {
    path: "/sign-in/",
    component: SignIn,
    layout: null,
  },
];
// Private Router
export const privateRoutes = [];
