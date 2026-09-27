import React from "react";
import { Loader2 } from "lucide-react";

export function Spinner({ size = "md", className = "" }) {
  const sizeMap = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };
  return (
    <Loader2
      className={`animate-spin text-indigo-600 ${sizeMap[size] || sizeMap.md} ${className}`}
    />
  );
}

export function Skeleton({ className = "" }) {
  return (
    <div
      className={`animate-pulse rounded bg-slate-200/80 ${className}`}
      aria-hidden="true"
    />
  );
}

export function StatCardSkeleton() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-9 w-9 rounded-lg" />
      </div>
      <Skeleton className="mt-4 h-8 w-16" />
      <Skeleton className="mt-2 h-3 w-32" />
    </div>
  );
}

export function JobCardSkeleton() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-lg" />
          <div className="space-y-1.5">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
      <div className="mt-4">
        <Skeleton className="h-14 w-full rounded-lg" />
      </div>
      <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-100">
        <Skeleton className="h-4 w-24" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-16 rounded-md" />
          <Skeleton className="h-8 w-16 rounded-md" />
        </div>
      </div>
    </div>
  );
}

export function JobTableRowSkeleton() {
  return (
    <tr className="animate-pulse border-b border-slate-100">
      <td className="py-4 pl-4 pr-3 sm:pl-6">
        <div className="flex items-center gap-3">
          <Skeleton className="h-9 w-9 rounded-lg" />
          <div className="space-y-1">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      </td>
      <td className="px-3 py-4">
        <Skeleton className="h-4 w-32" />
      </td>
      <td className="px-3 py-4">
        <Skeleton className="h-6 w-20 rounded-full" />
      </td>
      <td className="px-3 py-4">
        <Skeleton className="h-4 w-24" />
      </td>
      <td className="px-3 py-4">
        <Skeleton className="h-4 w-40" />
      </td>
      <td className="py-4 pl-3 pr-4 text-right sm:pr-6">
        <div className="flex justify-end gap-2">
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
      </td>
    </tr>
  );
}

const Loading = {
  Spinner,
  Skeleton,
  StatCardSkeleton,
  JobCardSkeleton,
  JobTableRowSkeleton,
};

export default Loading;
