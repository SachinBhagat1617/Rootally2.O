const fs = require("fs");
const path = require("path");
const dataPath = path.join(__dirname, "../model/data.json");

const readData = () => {
  const data = fs.readFileSync(dataPath, "utf-8");
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

exports.getPrograms = (req, res) => {
  try {
    const data = readData();
    res.json(data.programs);
  } catch (error) {
    res.status(500).json({ message: "Error reading programs" });
  }
};

exports.saveProgram = (req, res) => {
  try {
    const data = readData();
    console.log("Received data:", req.body);
    if (!req.body.programName || !req.body.exercises) {
      return res
        .status(400)
        .json({ message: "Program name and exercises are required." });
    }

    const existingIndex = data.programs.findIndex(
      (program) => program.programName === req.body.programName
    );
    console.log(existingIndex);
    if (existingIndex !== -1) {
      data.programs[existingIndex] = {
        ...data.programs[existingIndex],
        exercises: req.body.exercises,
      };

      writeData(data);

      return res.status(200).json({
        message: "Program updated successfully!",
        program: data.programs[existingIndex],
      });
    } else {
      const newProgram = {
        id: Date.now().toString(),
        programName: req.body.programName,
        exercises: req.body.exercises,
        notes: req.body.notes,
      };

      data.programs.push(newProgram);
      writeData(data);

      return res.status(201).json({
        message: "Program added successfully!",
        program: newProgram,
      });
    }
  } catch (error) {
    console.error("Error saving program:", error);
    res.status(500).json({ message: "Error saving program." });
  }
};

exports.deleteProgram = (req, res) => {
  const { id } = req.params;
  if (id === "1730274510243") return;
  try {
    const data = readData();
    const updatedPrograms = data.programs.filter(
      (program) => program.id !== id
    );

    if (updatedPrograms.length === data.programs.length) {
      return res.status(404).json({ message: "Program not found" });
    }

    data.programs = updatedPrograms;
    writeData(data);
    return res.status(200).json({ message: "Program removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting program" });
  }
};
