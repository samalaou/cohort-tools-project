const Student = require("../models/Student.model");
const { NotFoundError } = require('../middleware/CustomError');

const getAllStudents = async (req, res, next) => {
  try {
    const students = await Student.find().populate('cohort');
    res.json(students);
  } catch (error) {
    next(error);
  }
};

const createStudent = async (req, res, next) => {
  try {
    const savedStudent = await Student.create(req.body);
    res.status(201).json(savedStudent);
  } catch (error) {
    next(error);
  }
};

const getStudentsByCohort = async (req, res, next) => {
  const { cohortId } = req.params;
  try {
    const students = await Student.find({ cohort: cohortId }).populate('cohort');
    res.json(students);
  } catch (error) {
    next(error);
  }
};

const getStudentById = async (req, res, next) => {
  const { studentId } = req.params;
  try {
    const student = await Student.findById(studentId).populate('cohort');
    if (!student) {
      throw new NotFoundError("Student not found");
    }
    res.json(student);
  } catch (error) {
    next(error);
  }
};

const updateStudentById = async (req, res, next) => {
  const { studentId } = req.params;
  try {
    const updatedStudent = await Student.findByIdAndUpdate(studentId, req.body, { new: true });
    if (!updatedStudent) {
      throw new NotFoundError("Student not found");
    }
    res.json(updatedStudent);
  } catch (error) {
    next(error);
  }
};

const deleteStudentById = async (req, res, next) => {
  const { studentId } = req.params;
  try {
    const result = await Student.findByIdAndDelete(studentId);
    if (!result) {
      throw new NotFoundError("Student not found");
    }
    res.status(204).send();
  } catch (error) {
    next(error);
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
