import { request } from "./api";

export const jobService = {
  async getJobs() {
    return await request("/jobs", {
      method: "GET",
    });
  },

  async createJob(jobData) {
    return await request("/jobs", {
      method: "POST",
      body: JSON.stringify(jobData),
    });
  },

  async updateJob(id, updateData) {
    return await request(`/jobs/${id}`, {
      method: "PUT",
      body: JSON.stringify(updateData),
    });
  },

  async deleteJob(id) {
    return await request(`/jobs/${id}`, {
      method: "DELETE",
    });
  },
};
