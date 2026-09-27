import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../ui/Card";
import { ArrowRight, Briefcase, Plus, Calendar } from "lucide-react";
import { JobStatusBadge } from "../jobs/JobStatusBadge";
import {
  formatDate,
  getCompanyInitials,
  getCompanyAvatarColor,
} from "../../utils/formatters";

export function RecentApplications({
  jobs = [],
  onViewAll,
  onOpenAddJob,
  onEditJob,
}) {
  const recentJobs = jobs.slice(0, 5);

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-indigo-600" />
            Recent Applications
          </CardTitle>
          <p className="text-xs text-slate-500 mt-0.5">
            Latest positions you've applied to
          </p>
        </div>

        {jobs.length > 0 && (
          <button
            type="button"
            onClick={onViewAll}
            className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        )}
      </CardHeader>

      <CardContent className="flex-1">
        {recentJobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 mb-3">
              <Briefcase className="h-6 w-6" />
            </div>
            <h4 className="text-sm font-semibold text-slate-900">
              No applications yet
            </h4>
            <p className="text-xs text-slate-500 mt-1 max-w-xs">
              Start tracking your career journey by adding your first job application.
            </p>
            <button
              type="button"
              onClick={onOpenAddJob}
              className="mt-4 flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-2 text-xs font-medium text-white hover:bg-indigo-700 shadow-2xs transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
              Add First Application
            </button>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {recentJobs.map((job) => {
              const avatarColor = getCompanyAvatarColor(job.company);
              const initials = getCompanyInitials(job.company);

              return (
                <div
                  key={job._id}
                  onClick={() => onEditJob && onEditJob(job)}
                  className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0 hover:bg-slate-50/80 -mx-3 px-3 rounded-lg transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border text-xs font-bold shadow-2xs ${avatarColor}`}
                    >
                      {initials}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
                        {job.company}
                      </p>
                      <p className="text-xs text-slate-500 font-medium truncate">
                        {job.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="hidden sm:flex items-center gap-1 text-[11px] text-slate-400">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(job.appliedDate || job.createdAt)}</span>
                    </div>
                    <JobStatusBadge status={job.status} size="sm" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default RecentApplications;
