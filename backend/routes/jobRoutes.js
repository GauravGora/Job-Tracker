const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    createJob,
    getJobs,
    updateJob,
    deleteJob
} = require("../controllers/jobController");

// Create a job application
router.post("/", protect, createJob);

// Get all applications of logged-in user
router.get("/", protect, getJobs);

// Update a job application
router.put("/:id", protect, updateJob);

// Delete a job application
router.delete("/:id", protect, deleteJob);

module.exports = router;