const JobApplication = require("../models/jobApplication");

// Create a new job application
const createJob = async (req, res) => {
  try {
    const { company, role, status, appliedDate, notes } = req.body;

    if (!company || !role) {
      return res.status(400).json({
        message: "Company and role are required",
      });
    }

    const job = await JobApplication.create({
      user: req.user,
      company,
      role,
      status,
      appliedDate,
      notes,
    });

    res.status(201).json({
      message: "Job application created successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Get all jobs of logged-in user
const getJobs = async (req, res) => {
  try {
    const jobs = await JobApplication.find({
      user: req.user,
    }).sort({ createdAt: -1 });

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
// Update a job application
const updateJob = async (req, res) => {
    try {
        const job = await JobApplication.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user
            },
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!job) {
            return res.status(404).json({
                message: "Job application not found"
            });
        }

        res.status(200).json({
            message: "Job application updated successfully",
            job
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// Delete a job application
const deleteJob = async (req, res) => {
    try {
        const job = await JobApplication.findOneAndDelete({
            _id: req.params.id,
            user: req.user
        });

        if (!job) {
            return res.status(404).json({
                message: "Job application not found"
            });
        }

        res.status(200).json({
            message: "Job application deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

module.exports = {
  createJob,
  getJobs,
  updateJob,
  deleteJob
};
