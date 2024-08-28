const Student = require("../models/Student.model");

const getAllStudents = async (req, res) => {
    try {
      const students = await Student.find().populate('cohort');
      res.json(students);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching students', error });
    }
  };

const createStudent = async (req, res) => {
  try {
    const savedStudent = await Student.create(req.body);
    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(500).json({ message: 'Error creating student', error });
  }
};

const getStudentsByCohort = async (req, res) => {
    const { cohortId } = req.params;
    try {
      const students = await Student.find({ cohort: cohortId }).populate('cohort');
      res.json(students);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching students for cohort', error });
    }
  };

const getStudentById = async (req, res) => {
    const { studentId } = req.params;
    try {
        const student = await Student.findById(studentId).populate('cohort');
        res.json(student);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching student', error });
    }
};

const updateStudentById = async (req, res) => {
  const { studentId } = req.params;
  try {
    const updatedStudent = await Student.findByIdAndUpdate(studentId, req.body, { new: true });
    res.json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: 'Error updating student', error });
  }
};

const deleteStudentById = async (req, res) => {
  const { studentId } = req.params;
  try {
    await Student.findByIdAndDelete(studentId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting student', error });
  }
};

module.exports = {
  getAllStudents,
  createStudent,
  getStudentsByCohort,
  getStudentById,
  updateStudentById,
  deleteStudentById,
};
