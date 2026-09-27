import React from "react";
import { Edit3, Trash2, Calendar } from "lucide-react";
import { JobStatusBadge } from "./JobStatusBadge";
import {
  formatDate,
  getCompanyInitials,
  getCompanyAvatarColor,
} from "../../utils/formatters";

export function JobTable({ jobs = [], onEdit, onDelete }) {
  if (jobs.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50/80 text-[11px] font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-200">
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 sm:pl-6">
                Company & Role
              </th>
              <th scope="col" className="px-3 py-3.5">
                Status
              </th>
              <th scope="col" className="px-3 py-3.5">
                Applied Date
              </th>
              <th scope="col" className="px-3 py-3.5">
                Notes
              </th>
              <th scope="col" className="py-3.5 pl-3 pr-4 text-right sm:pr-6">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {jobs.map((job) => {
              const avatarColor = getCompanyAvatarColor(job.company);
              const initials = getCompanyInitials(job.company);

              return (
                <tr
                  key={job._id}
                  className="hover:bg-slate-50/70 transition-colors group"
                >
                  {/* Company & Role */}
                  <td className="whitespace-nowrap py-3.5 pl-4 pr-3 sm:pl-6">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border text-xs font-bold shadow-2xs ${avatarColor}`}
                      >
                        {initials}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                          {job.company}
                        </div>
                        <div className="text-xs text-slate-500 font-medium">
                          {job.role}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="whitespace-nowrap px-3 py-3.5">
                    <JobStatusBadge status={job.status} size="sm" />
                  </td>

                  {/* Applied Date */}
                  <td className="whitespace-nowrap px-3 py-3.5 text-xs text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-slate-400" />
                      <span>{formatDate(job.appliedDate || job.createdAt)}</span>
                    </div>
                  </td>

                  {/* Notes */}
                  <td className="px-3 py-3.5 text-xs text-slate-500 max-w-xs">
                    {job.notes ? (
                      <span className="line-clamp-1 text-slate-600" title={job.notes}>
                        {job.notes}
                      </span>
                    ) : (
                      <span className="text-slate-400 italic">No notes</span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="whitespace-nowrap py-3.5 pl-3 pr-4 text-right text-xs sm:pr-6">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => onEdit(job)}
                        className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-indigo-600 transition-colors"
                        title="Edit Application"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(job)}
                        className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                        title="Delete Application"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default JobTable;
