import { createSlice } from "@reduxjs/toolkit";

const ExerciseSlice = createSlice({
  name: "exercises",
  initialState: {
    exercises: [],
    notes:""
  },
  reducers: {
    addExercise: (state, action) => {
      state.exercises.push(action.payload);
    },
    removeExercise: (state, action) => {
      state.exercises = state.exercises.filter(
        (ex) => ex.id !== action.payload.id
      );
    },
    duplicateExercise: (state, action) => {
      console.log(action.payload.id);
      const exercise = state.exercises.find(
        (ex) => ex.id === action.payload.id
      );
      if (exercise) {
        state.exercises.push({
          ...exercise,
          id: Date.now(), // Ensure a unique ID for the duplicate
        });
      }
    },
    updateExercise: (state, action) => {
      const { id, updates } = action.payload;
      state.exercises = state.exercises.map((ex) =>
        ex.id === id ? { ...ex, ...updates } : ex
      );
      console.log(state.exercises);
    },
    setExercises: (state, action) => { // when you select an option it set the exercise
      state.exercises = action.payload;
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    }
  },
});

export const {
  addExercise,
  removeExercise,
  duplicateExercise,
  updateExercise,
  setExercises,
  setNotes,
} = ExerciseSlice.actions;
export default ExerciseSlice.reducer;
