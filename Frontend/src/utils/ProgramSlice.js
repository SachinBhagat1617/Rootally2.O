import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
const ProgramSlice = createSlice({
  name: "programs",
  initialState: {
    id:"",
    programs: [],
    programName:"",
  },
  reducers: {
    addProgram: (state, action) => {
      state.programs.push(action.payload);
    },
    setPrograms: (state, action) => {
      state.programName= action.payload;
    },
    removeProgram: (state, action) => {
      //console.log(action.payload)
      state.programs = state.programs.filter(
        (prog) => prog.id != action.payload
      );
    },
    loadPrograms: (state, action) => {
      state.programs = action.payload;
    }
    
  },
});
export const { addProgram, setPrograms, removeProgram ,loadPrograms} = ProgramSlice.actions;
export default ProgramSlice.reducer;
