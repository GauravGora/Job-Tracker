import React from "react";
import { Card } from "../ui/Card";

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  color = "indigo",
  subtitle,
}) {
  const colorMap = {
    indigo: {
      iconBg: "bg-indigo-50 text-indigo-600 border-indigo-100",
      valueColor: "text-slate-900",
    },
    blue: {
      iconBg: "bg-blue-50 text-blue-600 border-blue-100",
      valueColor: "text-blue-700",
    },
    purple: {
      iconBg: "bg-purple-50 text-purple-600 border-purple-100",
      valueColor: "text-purple-700",
    },
    emerald: {
      iconBg: "bg-emerald-50 text-emerald-600 border-emerald-100",
      valueColor: "text-emerald-700",
    },
    rose: {
      iconBg: "bg-rose-50 text-rose-600 border-rose-100",
      valueColor: "text-rose-700",
    },
    amber: {
      iconBg: "bg-amber-50 text-amber-600 border-amber-100",
      valueColor: "text-amber-700",
    },
  };

  const scheme = colorMap[color] || colorMap.indigo;

  return (
    <Card hoverable className="p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          {title}
        </p>
        {Icon && (
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-xl border ${scheme.iconBg}`}
          >
            <Icon className="h-4 w-4" />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <p className={`text-2xl sm:text-3xl font-bold tracking-tight ${scheme.valueColor}`}>
          {value}
        </p>
        {trend && (
          <span className="text-xs font-semibold text-slate-500">{trend}</span>
        )}
      </div>

      {subtitle && (
        <p className="mt-1 text-xs text-slate-400 font-medium">{subtitle}</p>
      )}
    </Card>
  );
}

export default StatCard;
