import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
const ExerciseComponent = ({
  name,
  id,
  sets,
  reps,
  holdTime,
  side,
  days,
  interval,
  frequency,
  notes,
  onSetsChange,
  onRepsChange,
  onHoldTimeChange,
  onSideChange,
  onDuplicateClick,
  onRemoveClick,
  onFrequencyChange,
  onIntervalChange,
  onDayChange,
  onNotesChange, // New prop for notes
}) => {
  const handleDayToggle = (day) => {
    const updatedDays = days.includes(day)
      ? days.filter((d) => d !== day) // Remove day if already selected
      : [...days, day]; // Add day if not selected
    onDayChange(updatedDays);
  };
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="bg-slate-300 rounded-xl p-4 mb-2 shadow-md"
    >
      <div className="flex justify-between">
        <div className="text-blue-500 font-semibold text-lg mb-2">{name}</div>
        <div className="flex space-x-1 mb-2">
          <div className="flex items-center">
            <label className="mr-2">Side:</label>
            <button
              onClick={() => onSideChange("left")}
              className={`px-4 py-2 rounded-l ${
                side === "left"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Left
            </button>
            <button
              onClick={() => onSideChange("right")}
              className={`px-4 py-2 rounded-r ${
                side === "right"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Right
            </button>
          </div>
          <div className="flex space-x-1">
            <button
              onClick={() => onDuplicateClick()}
              className="flex items-center bg-blue-500 text-white px-2 py-1 rounded"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/256/8994/8994048.png"
                alt="Duplicate"
                className="h-4 w-4 mr-1"
              />
              Duplicate
            </button>
            <button className="text-3xl" onClick={() => onRemoveClick()}>
              🗑️
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap overflow-x-hidden">
        <div className="flex  items-center gap-4">
          <div className="flex space-x-1 items-center">
            <label className="text-sm" htmlFor={`sets-${id}`}>
              Sets
            </label>
            <div className="flex items-center gap-1">
              <button
                className="bg-blue-500 text-white rounded px-2"
                onClick={() => onSetsChange(sets - 1)} // function call
              >
                -
              </button>
              <input
                id={`sets-${id}`}
                type="number"
                name="sets"
                value={sets}
                readOnly
                className="w-16 text-center border rounded"
              />
              <button
                className="bg-blue-500 text-white rounded px-2"
                onClick={() => onSetsChange(sets + 1)}
              >
                +
              </button>
            </div>
          </div>

          <div className="flex space-x-1 items-center">
            <label className="text-sm" htmlFor={`reps-${id}`}>
              Reps
            </label>
            <div className="flex items-center gap-1">
              <button
                className="bg-blue-500 text-white rounded px-2"
                onClick={() => onRepsChange(reps - 1)}
              >
                -
              </button>
              <input
                id={`reps-${id}`}
                type="number"
                name="reps"
                value={reps}
                readOnly
                className="w-16 text-center border rounded"
              />
              <button
                className="bg-blue-500 text-white rounded px-2"
                onClick={() => onRepsChange(reps + 1)}
              >
                +
              </button>
            </div>
          </div>

          <div className="flex space-x-1 items-center">
            <label className="text-sm" htmlFor={`holdTime-${id}`}>
              Hold Time (s)
            </label>
            <div className="flex items-center gap-1">
              <button
                className="bg-blue-500 text-white rounded px-2"
                onClick={() => onHoldTimeChange(holdTime - 1)}
              >
                -
              </button>
              <input
                id={`holdTime-${id}`}
                type="number"
                name="holdTime"
                value={holdTime}
                readOnly
                className="w-16 text-center border rounded"
              />
              <button
                className="bg-blue-500 text-white rounded px-2"
                onClick={() => onHoldTimeChange(holdTime + 1)}
              >
                +
              </button>
            </div>
            <div className="flex items-center gap-1">
              <label className="text-sm" htmlFor={`frequency-${id}`}>
                frequency
              </label>
              <button
                className="bg-blue-500 text-white rounded px-2"
                onClick={() => onFrequencyChange(frequency - 1)}
              >
                -
              </button>
              <input
                id={`frequency-${id}`}
                type="number"
                name="frequency"
                value={frequency}
                readOnly
                className="w-16 text-center border rounded"
              />
              <button
                className="bg-blue-500 text-white rounded px-2"
                onClick={() => onFrequencyChange(frequency + 1)}
              >
                +
              </button>
            </div>
            <div className="flex items-center gap-1">
              <label className="text-sm" htmlFor={`interval-${id}`}>
                Interval
              </label>
              <button
                className="bg-blue-500 text-white rounded px-2"
                onClick={() => onIntervalChange(interval - 1)}
              >
                -
              </button>
              <input
                id={`interval-${id}`}
                type="number"
                name="interval"
                value={interval}
                readOnly
                className="w-16 text-center border rounded"
              />
              <button
                className="bg-blue-500 text-white rounded px-2"
                onClick={() => onIntervalChange(interval + 1)}
              >
                +
              </button>
            </div>
          </div>
        </div>
        <div className="flex py-2 space-x-2 mb-4">
          {daysOfWeek.map((day) => (
            <label key={day} className="flex items-center">
              <input
                type="checkbox"
                checked={days.includes(day)}
                onChange={() => handleDayToggle(day)}
                className="mr-1"
              />
              {day}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExerciseComponent;
