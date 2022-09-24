import { configureStore, combineReducers } from "@reduxjs/toolkit";
import globalSlice from "./global/globalSlice";
import logger from "redux-logger";
const reducer = combineReducers({
  global: globalSlice,
});
const store = configureStore({
  reducer,
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
export default store;
