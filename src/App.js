import "./App.css";
import "slick-carousel/slick/slick.scss";
import "slick-carousel/slick/slick-theme.scss";
import { Fragment, lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./components/layout/Main";
import SignIn from "./pages/SignIn";
import { onAuthStateChanged } from "firebase/auth";
import { useLoginStore } from "./components/User/User";
import { authentication } from "./firebase-app/firebaseConfig";
import ErrorPage from "./pages/ErrorPage";
const HomePage = lazy(() => import("./pages/HomePage"));
const MoviePage = lazy(() => import("./pages/MoviePage"));
const TvSeriesPage = lazy(() => import("./pages/TvSeriesPage"));
const MovieDetailsPage = lazy(() => import("./pages/MovieDetailsPage"));
const VideoPage = lazy(() => import("./pages/VideoPage"));

function App() {
  const setUser = useLoginStore((state) => state.setUser);
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
  return (
    <Fragment>
      <div className="app">
        <div className="w-full h-full overflow-hidden">
          <Suspense fallback={<></>}>
            <Routes>
              <Route element={<Main></Main>}>
                <Route path="/" element={<HomePage></HomePage>}></Route>
                <Route path="/movies" element={<MoviePage></MoviePage>}></Route>
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
    </Fragment>
  );
}

export default App;
