const express = require("express");
const {
  getAllCohorts,
  createCohort,
  getCohortById,
  updateCohortById,
  deleteCohortById,
} = require("../controllers/cohortController");

const router = express.Router();

router.get("/", getAllCohorts);
router.post("/", createCohort);
router.get("/:cohortId", getCohortById);
router.put("/:cohortId", updateCohortById);
router.delete("/:cohortId", deleteCohortById);

module.exports = router;
