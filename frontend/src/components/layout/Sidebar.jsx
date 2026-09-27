import React from "react";
import {
  LayoutDashboard,
  Briefcase,
  PlusCircle,
  LogOut,
  X,
  Sparkles,
} from "lucide-react";
import { authService } from "../../services/authService";
import { getCompanyInitials } from "../../utils/formatters";

export function Sidebar({
  isOpen,
  onClose,
  activeTab,
  onNavigate,
  totalJobs = 0,
  onLogout,
}) {
  const user = authService.getUser() || { name: "Job Seeker", email: "user@example.com" };

  const handleLogout = () => {
    authService.logout();
    if (onLogout) {
      onLogout();
    } else {
      window.location.reload();
    }
  };

  const navLinks = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "applications",
      label: "Applications",
      icon: Briefcase,
      badge: totalJobs > 0 ? totalJobs : null,
    },
    {
      id: "add-job",
      label: "Add Application",
      icon: PlusCircle,
    },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200/90 bg-white transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand header */}
        <div className="flex h-16 items-center justify-between border-b border-slate-100 px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-xs shadow-indigo-200">
              <Briefcase className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-900 text-lg tracking-tight">
                  JobTrack
                </span>
                <span className="rounded-md bg-indigo-50 px-1.5 py-0.5 text-[10px] font-semibold text-indigo-700 border border-indigo-100">
                  PRO
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Career Application Hub</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-3.5 py-6">
          <div className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Main Menu
          </div>

          <nav className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;

              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => {
                    onNavigate(link.id);
                    onClose();
                  }}
                  className={`group flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-indigo-50 text-indigo-700 shadow-2xs font-semibold"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`h-4 w-4 transition-colors ${
                        isActive
                          ? "text-indigo-600"
                          : "text-slate-400 group-hover:text-slate-600"
                      }`}
                    />
                    <span>{link.label}</span>
                  </div>

                  {link.badge !== null && (
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                        isActive
                          ? "bg-indigo-200/60 text-indigo-800"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick tip card */}
          <div className="mt-8 rounded-xl border border-indigo-100 bg-gradient-to-br from-indigo-50/60 to-white p-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-900">
              <Sparkles className="h-4 w-4 text-indigo-600" />
              <span>Pro Tip</span>
            </div>
            <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
              Consistently follow up on interviews within 24 hours to boost selection rates.
            </p>
          </div>
        </div>

        {/* Footer profile & logout */}
        <div className="border-t border-slate-100 p-3.5">
          <div className="flex items-center justify-between rounded-xl bg-slate-50/80 p-2.5 border border-slate-200/60">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-xs font-bold text-white shadow-2xs">
                {getCompanyInitials(user.name)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-slate-900 truncate">
                  {user.name}
                </p>
                <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-white hover:text-rose-600 transition-colors shadow-2xs"
              title="Logout"
              aria-label="Logout"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
