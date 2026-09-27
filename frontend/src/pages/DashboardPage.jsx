import React from "react";
import {
  Briefcase,
  Send,
  CalendarCheck,
  CheckCircle2,
  XCircle,
  Plus,
  Sparkles,
} from "lucide-react";
import { StatCard } from "../components/dashboard/StatCard";
import { ApplicationChart } from "../components/dashboard/ApplicationChart";
import { RecentApplications } from "../components/dashboard/RecentApplications";
import { Button } from "../components/ui/Button";
import { StatCardSkeleton } from "../components/ui/Loading";
import { authService } from "../services/authService";

export function DashboardPage({
  jobs = [],
  stats,
  loading,
  onNavigate,
  onOpenAddJob,
  onEditJob,
}) {
  const user = authService.getUser() || { name: "Job Seeker" };
  const firstName = user.name ? user.name.split(" ")[0] : "Friend";

  const today = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  return (
    <div className="space-y-6">
      {/* Welcome & Action Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-700 p-6 sm:p-8 text-white shadow-sm">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-200">
              <Sparkles className="h-4 w-4 text-indigo-300" />
              <span>{today}</span>
            </div>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Welcome back, {firstName}! 👋
            </h2>
            <p className="mt-2 text-sm text-indigo-100 leading-relaxed">
              You have <span className="font-semibold text-white">{stats.total} total application{stats.total !== 1 ? "s" : ""}</span> in your pipeline. Stay persistent and keep following up with recruiters!
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Button
              onClick={onOpenAddJob}
              className="bg-white text-indigo-700 hover:bg-indigo-50 font-semibold shadow-md border-0"
              icon={Plus}
            >
              Add Application
            </Button>
            <Button
              variant="outline"
              onClick={() => onNavigate("applications")}
              className="bg-indigo-700/60 text-white hover:bg-indigo-700 border-indigo-400/40"
            >
              View Pipeline
            </Button>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 right-32 h-48 w-48 rounded-full bg-blue-500/20 blur-2xl" />
      </div>

      {/* Stats Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {loading ? (
          <>
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </>
        ) : (
          <>
            <StatCard
              title="Total Applications"
              value={stats.total}
              icon={Briefcase}
              color="indigo"
              subtitle="All tracked submissions"
            />
            <StatCard
              title="Applied"
              value={stats.applied}
              icon={Send}
              color="blue"
              subtitle="Awaiting initial response"
            />
            <StatCard
              title="Interviews"
              value={stats.interview}
              icon={CalendarCheck}
              color="purple"
              subtitle="Active discussions"
            />
            <StatCard
              title="Offers / Selected"
              value={stats.selected}
              icon={CheckCircle2}
              color="emerald"
              subtitle="Successful outcomes"
            />
            <StatCard
              title="Rejected"
              value={stats.rejected}
              icon={XCircle}
              color="rose"
              subtitle="Opportunities passed"
            />
          </>
        )}
      </div>

      {/* Analytics & Recents Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        <ApplicationChart stats={stats} />
        <RecentApplications
          jobs={jobs}
          onViewAll={() => onNavigate("applications")}
          onOpenAddJob={onOpenAddJob}
          onEditJob={onEditJob}
        />
      </div>
    </div>
  );
}

export default DashboardPage;
