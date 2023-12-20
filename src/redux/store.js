import { configureStore } from "@reduxjs/toolkit";
import dataTableReducer from "./tableSlice";

const store = configureStore({
  reducer: {
    TabledataObject: dataTableReducer,
  },
});

export default store;
