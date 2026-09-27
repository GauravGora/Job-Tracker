import React, { useState } from "react";
import { PageContainer } from "./components/layout/PageContainer";
import { DashboardPage } from "./pages/DashboardPage";
import { ApplicationsPage } from "./pages/ApplicationsPage";
import { AddApplicationPage } from "./pages/AddApplicationPage";
import { Modal } from "./components/ui/Modal";
import { JobForm } from "./components/jobs/JobForm";
import { useJobs } from "./hooks/useJobs";
import { useToast } from "./context/ToastContext";

export function Dashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toast = useToast();
  const {
    jobs,
    loading,
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
  } = useJobs();

  // Add Job handler
  const handleAddJobSubmit = async (jobData) => {
    setIsSubmitting(true);
    try {
      await addJob(jobData);
      toast.success("Job application added successfully!");
      setIsAddModalOpen(false);
    } catch (err) {
      console.error("Error adding job:", err);
      toast.error(err.message || "Failed to add job application.");
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Update Job handler
  const handleUpdateJobSubmit = async (id, updateData) => {
    try {
      await updateJob(id, updateData);
      toast.success("Job application updated successfully!");
    } catch (err) {
      console.error("Error updating job:", err);
      toast.error(err.message || "Failed to update job application.");
      throw err;
    }
  };

  // Delete Job handler
  const handleDeleteJob = async (id) => {
    try {
      await deleteJob(id);
      toast.success("Job application deleted successfully!");
    } catch (err) {
      console.error("Error deleting job:", err);
      toast.error(err.message || "Failed to delete job application.");
      throw err;
    }
  };

  return (
    <PageContainer
      activeTab={activeTab}
      onNavigate={(tab) => setActiveTab(tab)}
      totalJobs={jobs.length}
      onOpenAddJob={() => setIsAddModalOpen(true)}
      onLogout={onLogout}
    >
      {activeTab === "dashboard" && (
        <DashboardPage
          jobs={jobs}
          stats={stats}
          loading={loading}
          onNavigate={(tab) => setActiveTab(tab)}
          onOpenAddJob={() => setIsAddModalOpen(true)}
          onEditJob={() => {
            setActiveTab("applications");
          }}
        />
      )}

      {activeTab === "applications" && (
        <ApplicationsPage
          jobs={jobs}
          filteredJobs={filteredJobs}
          loading={loading}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          onOpenAddJob={() => setIsAddModalOpen(true)}
          onUpdateJob={handleUpdateJobSubmit}
          onDeleteJob={handleDeleteJob}
          onRefresh={fetchJobs}
        />
      )}

      {activeTab === "add-job" && (
        <AddApplicationPage
          onAddJob={handleAddJobSubmit}
          onNavigate={(tab) => setActiveTab(tab)}
        />
      )}

      {/* Quick Add Application Modal from Navbar */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Job Application"
        subtitle="Quickly log a new job or internship opportunity"
      >
        <JobForm
          onSubmit={handleAddJobSubmit}
          onCancel={() => setIsAddModalOpen(false)}
          isSubmitting={isSubmitting}
          submitLabel="Save Application"
        />
      </Modal>
    </PageContainer>
  );
}

export default Dashboard;
