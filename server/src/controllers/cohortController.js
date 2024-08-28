const Cohort = require("../models/Cohort.model");

const getAllCohorts = async (req, res) => {
  try {
    const cohorts = await Cohort.find();
    res.json(cohorts);
  } catch (error) {
    res.status(500).json({ message: 'Error getting cohorts', error });
  }
};

const createCohort = async (req, res) => {
  try {
    const savedCohort = await Cohort.create(req.body);
    res.status(201).json(savedCohort);
  } catch (error) {
    res.status(500).json({ message: 'Error creating cohort', error });
  }
};

const getCohortById = async (req, res) => {
  const { cohortId } = req.params;
  try {
    const cohort = await Cohort.findById(cohortId);
    res.json(cohort);
  } catch (error) {
    res.status(500).json({ message: 'Error getting cohort', error });
  }
};

const updateCohortById = async (req, res) => {
  const { cohortId } = req.params;
  try {
    const updatedCohort = await Cohort.findByIdAndUpdate(cohortId, req.body, { new: true });
    res.json(updatedCohort);
  } catch (error) {
    res.status(500).json({ message: 'Error updating cohort', error });
  }
};

const deleteCohortById = async (req, res) => {
  const { cohortId } = req.params;
  try {
    await Cohort.findByIdAndDelete(cohortId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting cohort', error });
  }
};

module.exports = {
  getAllCohorts,
  createCohort,
  getCohortById,
  updateCohortById,
  deleteCohortById,
};
