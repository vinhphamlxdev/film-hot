import "./App.css";
import "slick-carousel/slick/slick.scss";
import "slick-carousel/slick/slick-theme.scss";
import { Fragment, lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./components/layout/Main";
import SignIn from "./pages/SignIn/SignIn";
import { onAuthStateChanged } from "firebase/auth";
import { useLoginStore } from "./components/User/User";
import { authentication } from "./firebase-app/firebaseConfig";
import ErrorPage from "./pages/Error/ErrorPage";
import { useState } from "react";
import { LoadingScreen } from "components/loading";
import { useDispatch, useSelector } from "react-redux";
import { setLoadingScreen } from "redux-toolkit/global/globalSlice";
const HomePage = lazy(() => import("./pages/Home/HomePage"));
const MoviePage = lazy(() => import("./pages/Movie/MoviePage"));
const TvSeriesPage = lazy(() => import("./pages/TvSeries/TvSeriesPage"));
const MovieDetailsPage = lazy(() =>
  import("./pages/MovieDetail/MovieDetailsPage")
);
const VideoPage = lazy(() => import("./pages/Video/VideoPage"));

function App() {
  const setUser = useLoginStore((state) => state.setUser);
  const { loadingScreen } = useSelector((state) => state.global);
  const dispatch = useDispatch();

  const user = useLoginStore((state) => state.user);
  useEffect(() => {
    onAuthStateChanged(authentication, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(undefined);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleLoadingScreen = () => {
    setTimeout(() => {
      dispatch(setLoadingScreen(false));
    }, 2500);
  };
  useEffect(() => {
    window.addEventListener("load", handleLoadingScreen);
    return () => window.removeEventListener("load", handleLoadingScreen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  return (
    <Fragment>
      {loadingScreen && <LoadingScreen />}
      {!loadingScreen && (
        <div className="app">
          <div className="w-full h-full overflow-hidden">
            <Suspense fallback={<></>}>
              <Routes>
                <Route element={<Main></Main>}>
                  <Route path="/" element={<HomePage></HomePage>}></Route>
                  <Route
                    path="/movies"
                    element={<MoviePage></MoviePage>}
                  ></Route>
                  <Route
                    path="/tv-series"
                    element={<TvSeriesPage></TvSeriesPage>}
                  ></Route>
                  <Route
                    path="/:category/:movieId"
                    element={<MovieDetailsPage></MovieDetailsPage>}
                  ></Route>
                  <Route
                    path="/video/:category/:movieId"
                    element={<VideoPage></VideoPage>}
                  ></Route>
                </Route>
                <Route
                  path="/sign-in/:category/:movieId"
                  element={!user ? <SignIn></SignIn> : <ErrorPage></ErrorPage>}
                ></Route>

                <Route
                  path="/sign-in/"
                  element={!user ? <SignIn></SignIn> : <ErrorPage></ErrorPage>}
                ></Route>
                <Route path="*" element={<ErrorPage />}></Route>
              </Routes>
            </Suspense>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default App;
