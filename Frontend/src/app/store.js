// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import ProgramSlice from "../utils/ProgramSlice"
import ExerciseSlice from "../utils/ExerciseSlice";

const store = configureStore({
  reducer: {
    programs: ProgramSlice, // Add the new reducer
    exercises: ExerciseSlice,
  },
});

export default store;
