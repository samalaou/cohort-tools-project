const express = require("express");
const {
  getAllStudents,
  createStudent,
  getStudentsByCohort,
  getStudentById,
  updateStudentById,
  deleteStudentById,
} = require("../controllers/studentController");

const router = express.Router();

router.get("/", getAllStudents);
router.post("/", createStudent);
router.get("/cohort/:cohortId", getStudentsByCohort);
router.get("/:studentId", getStudentById);
router.put("/:studentId", updateStudentById);
router.delete("/:studentId", deleteStudentById);

module.exports = router;
