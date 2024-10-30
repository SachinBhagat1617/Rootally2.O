import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProgram, removeProgram, setPrograms } from "../utils/ProgramSlice"; // Import the action
import { setExercises } from "../utils/ExerciseSlice";
import axios from "axios";
const Header = () => {
  const dispatch = useDispatch();
  const programs = useSelector((state) => state.programs.programs);
  const programName = useSelector((state) => state.programs.programName);
  const [name, setName] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("");
  //const exercises=useSelector((state)=>state.exercises.exercises)
  const [programId, setProgramId] = useState("")
  useEffect(() => {
    dispatch(setPrograms(name));
  }, [name]);
  const addingprogram = (e) => {
    const updatedName = e.target.value;
    setName(updatedName);
    dispatch(setPrograms(name));
  };
  console.log(programName);
  const handleProgramSelect = (e) => {
    const progName = e.target.value;
    //console.log(exercises);
    const selectedProgram = programs.find(
      (program) => program.programName === progName
    );
    setName(selectedProgram.programName);
    setProgramId(selectedProgram.id);
    dispatch(setExercises(selectedProgram.exercises));
    //console.log(selectedProgram);
  };
  // const savePrograms = async (data) => {
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:5000/api/programs/add",
  //       data
  //     );
  //     // dispatch(loadPrograms(json_data));
  //     console.log(response);
  //   } catch (error) {
  //     console.error("Error fetching programs:", error);
  //   }
  // };
  const deleteProgramFromDB = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/programs/${id}`
      );
      console.log("Program deleted successfully:", response.data);
    } catch (error) {
      console.error("Error deleting program:", error);
    }
  };
  const deleteProgram = (e) => {
    //console.log(e.target.value);
    const progName = e.target.value;
    const selectedProgram = programs.find(
      (program) => program.programName === progName
    );
    //console.log(selectedProgram);
    dispatch(removeProgram(selectedProgram.id));
    console.log(selectedProgram.id);
    deleteProgramFromDB(selectedProgram.id);
    // if sameProgram is open which you are deleting then clean it
    if (selectedProgram.id === programId) {
      dispatch(setExercises([]));
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md md:max-w-2xl mx-auto">
      <div className="flex md:flex-row gap-4 md:gap-8">
        {/* Program Name Input */}
        <div className="flex-1">
          <label className="block text-gray-700 font-semibold mb-1">
            Program Name
          </label>
          <div className="flex">
            <input
              type="text"
              onChange={(e) => addingprogram(e)}
              //onChange={(e) => dispatch(setName(e.target.value))}
              value={name}
              placeholder="Enter new program name"
              className="p-2 border border-gray-300 rounded-md flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Exercise Combo Dropdown */}
        <div className="flex-1">
          <label className="block text-gray-700 font-semibold mb-1">
            Exercise Combo
          </label>
          <select
            // onChange={(e) => setSelectedProgram(e.target.value)}
            onChange={(e) => handleProgramSelect(e)}
            value={selectedProgram}
            className="flex w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a program</option>
            {programs.map((program, index) => (
              <option key={index} value={program.programName}>
                {/* {console.log(program.programName)} */}
                {program.programName}
              </option>
            ))}
          </select>
        </div>

        {/* delete combo */}
        <div className="flex-1">
          <label className="block text-gray-700 font-semibold mb-1">
            Delete Combo
          </label>
          <select
            onChange={(e) => deleteProgram(e)}
            value={selectedProgram}
            className="flex w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a program</option>
            {programs.map((program, index) => (
              <option key={index} value={program.programName}>
                {/* {console.log(program.programName)} */}
                {program.programName}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Header;
