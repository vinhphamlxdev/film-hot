import "./App.css";
import "slick-carousel/slick/slick.scss";
import "slick-carousel/slick/slick-theme.scss";
import { Fragment, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useLoginStore } from "./components/User/User";
import { authentication } from "./firebase-app/firebaseConfig";
import { LoadingScreen } from "components/loading";
import { useDispatch, useSelector } from "react-redux";
import { setLoadingScreen } from "redux-toolkit/global/globalSlice";
import { publicRoutes } from "./routes";
import { DefaultLayout } from "components/layout";

function App() {
  const setUser = useLoginStore((state) => state.setUser);
  const { loadingScreen } = useSelector((state) => state.global);
  const dispatch = useDispatch();

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
        <Suspense fallback={<></>}>
          <Routes>
            {publicRoutes.map((route, index) => {
              const Layout = route.layout === null ? Fragment : DefaultLayout;
              const Page = route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                ></Route>
              );
            })}
          </Routes>
        </Suspense>
      )}
    </Fragment>
  );
}

export default App;
