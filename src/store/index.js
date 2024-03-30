import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/counterSlice";
import useReducer from "./user/userSlice";

export const store = configureStore({
  reducer: {
    counterApp: counterReducer,
    user: useReducer,
  },
});
