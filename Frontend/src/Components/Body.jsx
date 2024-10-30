import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  addExercise,
  duplicateExercise,
  removeExercise,
  setExercises,
  updateExercise,
} from "../utils/ExerciseSlice";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import ExerciseComponent from "./ExerciseComponent";
import { addProgram, loadPrograms } from "../utils/ProgramSlice";

const Body = () => {
  const [exerciseName, setExerciseName] = useState("");
  const [notesData, setNotesData] = useState("");
  const dispatch = useDispatch();
  const exercises = useSelector((state) => state.exercises.exercises);
  const programName = useSelector((state) => state.programs.programName);
  const programs = useSelector((state) => state.programs.programs);
  const notes = useSelector((state) => state.exercises.notes);
  // Add Exercise
  const addExerciseHandler = () => {
    const data = {
      name: exerciseName,
      id: Date.now(),
      sets: 0,
      reps: 0,
      holdTime: 0,
      side: "left",
      days: [],
      interval: 0,
      frequency: 0,
    };
    dispatch(addExercise(data));
    setExerciseName("");
  };

  // Fetch Programs Once on Component Mount
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/programs");
        dispatch(loadPrograms(response.data));
      } catch (error) {
        console.error("Error fetching programs:", error);
      }
    };
    fetchPrograms();
  }, [dispatch]);

  // Save Program as Combo
  const saveProgram = async (data) => {
    try {
      await axios.post("http://localhost:5000/api/programs/add", data);
      dispatch(addProgram(data));
       window.location.reload();
    } catch (error) {
      console.error("Error saving program:", error);
    }
  };

  const handleSubmit = () => {
    const id = Date.now();
    const data = {
      id,
      programName,
      exercises,
      notes: notesData,
    };
    saveProgram(data);
    dispatch(setExercises([])); // Clear exercises after saving
  };

  // Drag and Drop Configuration
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = exercises.findIndex((ex) => ex.id === active.id);
    const newIndex = exercises.findIndex((ex) => ex.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      const updatedExercises = arrayMove(exercises, oldIndex, newIndex);
      dispatch(setExercises(updatedExercises));
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  );

  return (
    <>
      <div className="flex gap-2 p-4">
        <div className="p-2 font-medium text-gr">Exercise:</div>
        <input
          type="text"
          value={exerciseName}
          onChange={(e) => setExerciseName(e.target.value)}
          placeholder="Enter exercise name"
          className="border rounded p-1"
        />
        <button
          onClick={addExerciseHandler}
          className="bg-blue-500 text-white rounded p-2"
        >
          Add
        </button>
      </div>

      <h1 className="text-xl font-bold">Exercise Program</h1>
      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCorners}
      >
        <div className="max-h-128 overflow-y-auto border border-gray-300 rounded p-2">
          <SortableContext
            items={exercises.map((ex) => ex.id)}
            strategy={verticalListSortingStrategy}
          >
            {exercises.map((ex) => (
              <ExerciseComponent
                key={ex.id}
                {...ex}
                onSetsChange={(newSets) =>
                  dispatch(
                    updateExercise({ id: ex.id, updates: { sets: newSets } })
                  )
                }
                onRepsChange={(newReps) =>
                  dispatch(
                    updateExercise({ id: ex.id, updates: { reps: newReps } })
                  )
                }
                onHoldTimeChange={(newHoldTime) =>
                  dispatch(
                    updateExercise({
                      id: ex.id,
                      updates: { holdTime: newHoldTime },
                    })
                  )
                }
                onSideChange={(newSide) =>
                  dispatch(
                    updateExercise({ id: ex.id, updates: { side: newSide } })
                  )
                }
                onDuplicateClick={() =>
                  dispatch(duplicateExercise({ id: ex.id }))
                }
                onRemoveClick={() => dispatch(removeExercise({ id: ex.id }))}
                onFrequencyChange={(newFrequency) =>
                  dispatch(
                    updateExercise({
                      id: ex.id,
                      updates: { frequency: newFrequency },
                    })
                  )
                }
                onIntervalChange={(newInterval) =>
                  dispatch(
                    updateExercise({
                      id: ex.id,
                      updates: { interval: newInterval },
                    })
                  )
                }
                onDayChange={(newDay) =>
                  dispatch(
                    updateExercise({ id: ex.id, updates: { days: newDay } })
                  )
                }
              />
            ))}
          </SortableContext>
        </div>
      </DndContext>

      <div className="flex flex-wrap overflow-x-hidden">
        <div className="w-full mt-4">
          <label className="block text-sm font-semibold">Therapist Notes</label>
          {/*{console.log(programs)}*/}
          <textarea
            value={notesData || notes}
            onChange={(e) => setNotesData(e.target.value)}
            placeholder="Add notes here"
            className="w-full border rounded p-2 mt-1"
          />
        </div>
        <div>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white rounded p-2"
          >
            Save as Combo
          </button>
        </div>
      </div>
    </>
  );
};

export default Body;
