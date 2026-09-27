import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";
import { BarChart3, TrendingUp, Layers } from "lucide-react";

export function ApplicationChart({ stats }) {
  const total = stats.total || 0;
  
  const appliedPct = total > 0 ? Math.round((stats.applied / total) * 100) : 0;
  const interviewPct = total > 0 ? Math.round((stats.interview / total) * 100) : 0;
  const selectedPct = total > 0 ? Math.round((stats.selected / total) * 100) : 0;
  const rejectedPct = total > 0 ? Math.round((stats.rejected / total) * 100) : 0;

  // Active pipeline: Applied + Interview
  const activePipeline = (stats.applied || 0) + (stats.interview || 0);
  const interviewRate = total > 0 ? Math.round(((stats.interview + stats.selected) / total) * 100) : 0;

  return (
    <Card className="flex flex-col justify-between">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-indigo-600" />
            Application Funnel & Health
          </CardTitle>
          <p className="text-xs text-slate-500 mt-0.5">
            Stage distribution and pipeline conversion metrics
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Progress Breakdown Bar */}
        <div>
          <div className="flex items-center justify-between text-xs font-medium text-slate-600 mb-2">
            <span>Status Distribution</span>
            <span>{total} Total Submissions</span>
          </div>

          <div className="flex h-3 w-full overflow-hidden rounded-full bg-slate-100 border border-slate-200/60 p-0.5">
            {appliedPct > 0 && (
              <div
                style={{ width: `${appliedPct}%` }}
                className="h-full bg-blue-500 rounded-l-full transition-all duration-500"
                title={`Applied: ${stats.applied} (${appliedPct}%)`}
              />
            )}
            {interviewPct > 0 && (
              <div
                style={{ width: `${interviewPct}%` }}
                className="h-full bg-purple-500 transition-all duration-500"
                title={`Interview: ${stats.interview} (${interviewPct}%)`}
              />
            )}
            {selectedPct > 0 && (
              <div
                style={{ width: `${selectedPct}%` }}
                className="h-full bg-emerald-500 transition-all duration-500"
                title={`Offer: ${stats.selected} (${selectedPct}%)`}
              />
            )}
            {rejectedPct > 0 && (
              <div
                style={{ width: `${rejectedPct}%` }}
                className="h-full bg-rose-400 rounded-r-full transition-all duration-500"
                title={`Rejected: ${stats.rejected} (${rejectedPct}%)`}
              />
            )}
          </div>
        </div>

        {/* Legend grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-xl border border-blue-100 bg-blue-50/40 p-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-700">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              Applied
            </div>
            <p className="mt-1 text-lg font-bold text-slate-900">{stats.applied}</p>
            <p className="text-[11px] text-slate-500">{appliedPct}% of total</p>
          </div>

          <div className="rounded-xl border border-purple-100 bg-purple-50/40 p-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-purple-700">
              <span className="h-2 w-2 rounded-full bg-purple-500" />
              Interview
            </div>
            <p className="mt-1 text-lg font-bold text-slate-900">{stats.interview}</p>
            <p className="text-[11px] text-slate-500">{interviewPct}% of total</p>
          </div>

          <div className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Offers
            </div>
            <p className="mt-1 text-lg font-bold text-slate-900">{stats.selected}</p>
            <p className="text-[11px] text-slate-500">{selectedPct}% of total</p>
          </div>

          <div className="rounded-xl border border-rose-100 bg-rose-50/40 p-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-700">
              <span className="h-2 w-2 rounded-full bg-rose-500" />
              Rejected
            </div>
            <p className="mt-1 text-lg font-bold text-slate-900">{stats.rejected}</p>
            <p className="text-[11px] text-slate-500">{rejectedPct}% of total</p>
          </div>
        </div>

        {/* Metrics highlight */}
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="flex items-center justify-between rounded-xl border border-slate-200/80 bg-slate-50/60 p-3.5">
            <div className="flex items-center gap-2.5">
              <div className="rounded-lg bg-indigo-100 p-2 text-indigo-700">
                <Layers className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-800">
                  Active Pipeline
                </p>
                <p className="text-[11px] text-slate-500">
                  In progress applications
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-base font-bold text-indigo-600">
                {activePipeline}
              </span>
              <span className="text-xs text-slate-400 ml-1">active</span>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-slate-200/80 bg-slate-50/60 p-3.5">
            <div className="flex items-center gap-2.5">
              <div className="rounded-lg bg-emerald-100 p-2 text-emerald-700">
                <TrendingUp className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-800">
                  Response Rate
                </p>
                <p className="text-[11px] text-slate-500">
                  Interviews & offers
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-base font-bold text-emerald-600">
                {interviewRate}%
              </span>
              <span className="text-xs text-slate-400 ml-1">rate</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ApplicationChart;
