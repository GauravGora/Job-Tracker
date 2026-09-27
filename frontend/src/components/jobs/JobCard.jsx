import React from "react";
import { Calendar, Edit3, Trash2 } from "lucide-react";
import { Card } from "../ui/Card";
import { JobStatusBadge } from "./JobStatusBadge";
import {
  formatDate,
  getCompanyInitials,
  getCompanyAvatarColor,
} from "../../utils/formatters";

export function JobCard({ job, onEdit, onDelete }) {
  const avatarColor = getCompanyAvatarColor(job.company);
  const initials = getCompanyInitials(job.company);

  return (
    <Card hoverable className="flex flex-col justify-between p-5 group">
      <div>
        {/* Top bar: Avatar + Company/Role + Status */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border text-sm font-bold shadow-2xs ${avatarColor}`}
            >
              {initials}
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                {job.company}
              </h4>
              <p className="text-xs text-slate-600 font-medium line-clamp-1">
                {job.role}
              </p>
            </div>
          </div>

          <JobStatusBadge status={job.status} size="sm" />
        </div>

        {/* Notes section */}
        {job.notes ? (
          <div className="mt-3.5 rounded-lg bg-slate-50 p-3 text-xs text-slate-600 border border-slate-100/80">
            <p className="line-clamp-2 leading-relaxed">
              <span className="font-semibold text-slate-700">Note: </span>
              {job.notes}
            </p>
          </div>
        ) : (
          <div className="mt-3.5 text-xs text-slate-400 italic">
            No notes added
          </div>
        )}
      </div>

      {/* Bottom bar: Date + Actions */}
      <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-100">
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <Calendar className="h-3.5 w-3.5 text-slate-400" />
          <span>{formatDate(job.appliedDate || job.createdAt)}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => onEdit(job)}
            className="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-100 hover:text-indigo-600 transition-colors"
            title="Edit Application"
          >
            <Edit3 className="h-3.5 w-3.5" />
            <span>Edit</span>
          </button>

          <button
            type="button"
            onClick={() => onDelete(job)}
            className="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition-colors"
            title="Delete Application"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </Card>
  );
}

export default JobCard;
