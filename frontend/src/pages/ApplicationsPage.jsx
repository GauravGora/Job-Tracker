import React, { useState } from "react";
import { Plus, Search, AlertTriangle, Briefcase, RefreshCw } from "lucide-react";
import { JobFilters } from "../components/jobs/JobFilters";
import { JobCard } from "../components/jobs/JobCard";
import { JobTable } from "../components/jobs/JobTable";
import { JobForm } from "../components/jobs/JobForm";
import { Button } from "../components/ui/Button";
import { Modal } from "../components/ui/Modal";
import { JobCardSkeleton, JobTableRowSkeleton } from "../components/ui/Loading";

export function ApplicationsPage({
  jobs = [],
  filteredJobs = [],
  loading = false,
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
  onOpenAddJob,
  onUpdateJob,
  onDeleteJob,
  onRefresh,
}) {
  const [viewMode, setViewMode] = useState("grid");
  const [editingJob, setEditingJob] = useState(null);
  const [deletingJob, setDeletingJob] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Status counts for filter pills
  const counts = {
    all: jobs.length,
    applied: jobs.filter((j) => j.status === "Applied").length,
    interview: jobs.filter((j) => j.status === "Interview").length,
    selected: jobs.filter((j) => j.status === "Selected" || j.status === "Offer").length,
    rejected: jobs.filter((j) => j.status === "Rejected").length,
  };

  const handleEditSubmit = async (formData) => {
    if (!editingJob) return;
    setIsSubmitting(true);
    try {
      await onUpdateJob(editingJob._id, formData);
      setEditingJob(null);
    } catch (err) {
      console.error("Failed to update job:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingJob) return;
    setIsDeleting(true);
    try {
      await onDeleteJob(deletingJob._id);
      setDeletingJob(null);
    } catch (err) {
      console.error("Failed to delete job:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Job Applications
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Manage, filter, and track all your ongoing job applications ({filteredJobs.length} visible)
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {onRefresh && (
            <button
              type="button"
              onClick={onRefresh}
              className="rounded-lg border border-slate-200 bg-white p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-50 shadow-2xs transition-colors"
              title="Refresh applications"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          )}
          <Button icon={Plus} onClick={onOpenAddJob}>
            Add Application
          </Button>
        </div>
      </div>

      {/* Filters & Search Bar */}
      <JobFilters
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        statusFilter={statusFilter}
        onStatusChange={onStatusChange}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        counts={counts}
      />

      {/* Content: Skeleton, Empty, Cards or Table */}
      {loading ? (
        viewMode === "grid" ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <JobCardSkeleton />
            <JobCardSkeleton />
            <JobCardSkeleton />
            <JobCardSkeleton />
            <JobCardSkeleton />
            <JobCardSkeleton />
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <table className="w-full text-left">
              <tbody>
                <JobTableRowSkeleton />
                <JobTableRowSkeleton />
                <JobTableRowSkeleton />
                <JobTableRowSkeleton />
              </tbody>
            </table>
          </div>
        )
      ) : filteredJobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white py-16 px-6 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 mb-4 border border-indigo-100">
            {searchTerm || statusFilter !== "All" ? (
              <Search className="h-7 w-7" />
            ) : (
              <Briefcase className="h-7 w-7" />
            )}
          </div>
          <h3 className="text-base font-semibold text-slate-900">
            {searchTerm || statusFilter !== "All"
              ? "No applications found"
              : "No job applications yet"}
          </h3>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-500 max-w-sm leading-relaxed">
            {searchTerm || statusFilter !== "All"
              ? "We couldn't find any applications matching your search or filters. Try adjusting your search query."
              : "Track your first job application and never lose touch with recruiters and hiring managers."}
          </p>

          <div className="mt-5 flex gap-3">
            {searchTerm || statusFilter !== "All" ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  onSearchChange("");
                  onStatusChange("All");
                }}
              >
                Clear Filters
              </Button>
            ) : (
              <Button size="sm" icon={Plus} onClick={onOpenAddJob}>
                Add First Application
              </Button>
            )}
          </div>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              onEdit={(j) => setEditingJob(j)}
              onDelete={(j) => setDeletingJob(j)}
            />
          ))}
        </div>
      ) : (
        <JobTable
          jobs={filteredJobs}
          onEdit={(j) => setEditingJob(j)}
          onDelete={(j) => setDeletingJob(j)}
        />
      )}

      {/* Edit Job Modal */}
      <Modal
        isOpen={!!editingJob}
        onClose={() => setEditingJob(null)}
        title="Edit Job Application"
        subtitle={`Updating application details for ${editingJob?.company || ""}`}
      >
        {editingJob && (
          <JobForm
            initialData={editingJob}
            onSubmit={handleEditSubmit}
            onCancel={() => setEditingJob(null)}
            isSubmitting={isSubmitting}
            submitLabel="Update Application"
          />
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deletingJob}
        onClose={() => setDeletingJob(null)}
        title="Delete Application"
        maxWidth="max-w-md"
      >
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-600 border border-rose-100">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Are you sure you want to delete this application?
              </p>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                This will permanently delete the application for{" "}
                <span className="font-semibold text-slate-800">
                  {deletingJob?.role}
                </span>{" "}
                at{" "}
                <span className="font-semibold text-slate-800">
                  {deletingJob?.company}
                </span>
                . This action cannot be undone.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDeletingJob(null)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={handleDeleteConfirm}
              isLoading={isDeleting}
            >
              Delete Application
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ApplicationsPage;
