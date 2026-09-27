import React, { useState, useRef, useEffect } from "react";
import { Menu, Plus, User, LogOut, ChevronDown, Briefcase } from "lucide-react";
import { Button } from "../ui/Button";
import { authService } from "../../services/authService";
import { getCompanyInitials } from "../../utils/formatters";

export function Navbar({
  onToggleSidebar,
  onOpenAddJob,
  activeTab,
  onNavigate,
  onLogout,
}) {
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const user = authService.getUser() || { name: "Job Seeker", email: "user@example.com" };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    authService.logout();
    if (onLogout) {
      onLogout();
    } else {
      window.location.reload();
    }
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case "dashboard":
        return "Dashboard Overview";
      case "applications":
        return "All Applications";
      case "add-job":
        return "New Application";
      default:
        return "Dashboard";
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200/80 bg-white/95 px-4 backdrop-blur-xs sm:px-6 lg:px-8">
      {/* Left: Mobile hamburger & title */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800 lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold text-sm shadow-xs lg:hidden">
            JT
          </div>
          <div>
            <h1 className="text-sm font-semibold text-slate-900 sm:text-base">
              {getPageTitle()}
            </h1>
            <p className="hidden text-xs text-slate-500 sm:block">
              Track and organize your career opportunities
            </p>
          </div>
        </div>
      </div>

      {/* Right: Quick actions & Profile */}
      <div className="flex items-center gap-3">
        <Button
          size="sm"
          icon={Plus}
          onClick={onOpenAddJob}
          className="hidden sm:inline-flex shadow-xs"
        >
          Add Application
        </Button>

        {/* User profile dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setUserDropdownOpen(!userDropdownOpen)}
            className="flex items-center gap-2 rounded-lg border border-slate-200 p-1.5 hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-indigo-100 text-xs font-bold text-indigo-700">
              {getCompanyInitials(user.name)}
            </div>
            <span className="hidden text-xs font-medium text-slate-700 sm:inline-block max-w-[120px] truncate">
              {user.name}
            </span>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
          </button>

          {userDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-100 bg-white py-1.5 shadow-lg animate-fade-in z-50">
              <div className="border-b border-slate-100 px-4 py-2.5">
                <p className="text-xs font-semibold text-slate-900 truncate">
                  {user.name}
                </p>
                <p className="text-xs text-slate-500 truncate">{user.email}</p>
              </div>

              <div className="py-1">
                <button
                  type="button"
                  onClick={() => {
                    setUserDropdownOpen(false);
                    onNavigate("dashboard");
                  }}
                  className="flex w-full items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                >
                  <Briefcase className="h-4 w-4 text-slate-400" />
                  Dashboard
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setUserDropdownOpen(false);
                    onNavigate("applications");
                  }}
                  className="flex w-full items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                >
                  <User className="h-4 w-4 text-slate-400" />
                  All Applications
                </button>
              </div>

              <div className="border-t border-slate-100 pt-1">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2.5 px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50"
                >
                  <LogOut className="h-4 w-4 text-rose-500" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
