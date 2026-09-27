import { useState, useEffect, useMemo, useCallback } from "react";
import { jobService } from "../services/jobService";

export function useJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await jobService.getJobs();
      setJobs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError(err.message || "Failed to load job applications");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const addJob = async (jobData) => {
    const data = await jobService.createJob(jobData);
    if (data.job) {
      setJobs((prev) => [data.job, ...prev]);
    }
    return data;
  };

  const updateJob = async (id, updateData) => {
    const data = await jobService.updateJob(id, updateData);
    if (data.job) {
      setJobs((prev) => prev.map((j) => (j._id === id ? data.job : j)));
    }
    return data;
  };

  const deleteJob = async (id) => {
    await jobService.deleteJob(id);
    setJobs((prev) => prev.filter((j) => j._id !== id));
  };

  const filteredJobs = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    return jobs.filter((job) => {
      const matchesSearch =
        !term ||
        (job.company && job.company.toLowerCase().includes(term)) ||
        (job.role && job.role.toLowerCase().includes(term)) ||
        (job.notes && job.notes.toLowerCase().includes(term));

      const matchesStatus =
        statusFilter === "All" ||
        job.status === statusFilter ||
        (statusFilter === "Selected" && (job.status === "Selected" || job.status === "Offer"));

      return matchesSearch && matchesStatus;
    });
  }, [jobs, searchTerm, statusFilter]);

  const stats = useMemo(() => {
    const total = jobs.length;
    const applied = jobs.filter((j) => j.status === "Applied").length;
    const interview = jobs.filter((j) => j.status === "Interview").length;
    const selected = jobs.filter(
      (j) => j.status === "Selected" || j.status === "Offer"
    ).length;
    const rejected = jobs.filter((j) => j.status === "Rejected").length;

    return { total, applied, interview, selected, rejected };
  }, [jobs]);

  return {
    jobs,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    filteredJobs,
    stats,
    fetchJobs,
    addJob,
    updateJob,
    deleteJob,
  };
}
