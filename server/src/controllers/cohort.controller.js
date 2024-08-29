const Cohort = require("../models/Cohort.model");
const { NotFoundError } = require('../middleware/CustomError');

const getAllCohorts = async (req, res, next) => {
  try {
    const cohorts = await Cohort.find();
    res.json(cohorts);
  } catch (error) {
    next(error);
  }
};

const createCohort = async (req, res, next) => {
  try {
    const savedCohort = await Cohort.create(req.body);
    res.status(201).json(savedCohort);
  } catch (error) {
    next(error);
  }
};

const getCohortById = async (req, res, next) => {
  const { cohortId } = req.params;
  try {
    const cohort = await Cohort.findById(cohortId);
    if (!cohort) {
      throw new NotFoundError("Cohort not found");
    }
    res.json(cohort);
  } catch (error) {
    next(error);
  }
};

const updateCohortById = async (req, res, next) => {
  const { cohortId } = req.params;
  try {
    const updatedCohort = await Cohort.findByIdAndUpdate(cohortId, req.body, { new: true });
    if (!updatedCohort) {
      throw new NotFoundError("Cohort not found");
    }
    res.json(updatedCohort);
  } catch (error) {
    next(error);
  }
};

const deleteCohortById = async (req, res, next) => {
  const { cohortId } = req.params;
  try {
    const result = await Cohort.findByIdAndDelete(cohortId);
    if (!result) {
      throw new NotFoundError("Cohort not found");
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAllCohorts,
  createCohort,
  getCohortById,
  updateCohortById,
  deleteCohortById,
};
