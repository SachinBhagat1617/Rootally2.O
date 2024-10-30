import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
const ProgramSlice = createSlice({
  name: "programs",
  initialState: {
    id: "",
    programs: [],
    programName: "",
    notes: "",
    days: [],
  },
  reducers: {
    addProgram: (state, action) => {
      state.programs.push(action.payload);
    },
    setPrograms: (state, action) => {
      state.programName = action.payload;
    },
    removeProgram: (state, action) => {
      //console.log(action.payload)
      state.programs = state.programs.filter(
        (prog) => prog.id != action.payload
      );
    },
    loadPrograms: (state, action) => {
      state.programs = action.payload;
    },
    setDays: (state, action) => {
      const { programId, days } = action.payload;
      const programIndex = state.programs.findIndex(
        (prog) => prog.id === programId
      );
      if (programIndex !== -1) {
        state.programs[programIndex] = {
          ...state.programs[programIndex],
          days,
        };
        console.log(state.programs[programIndex]);
      }
    },
  },
});
export const { addProgram, setPrograms, removeProgram, loadPrograms, setDays } =
  ProgramSlice.actions;
export default ProgramSlice.reducer;
