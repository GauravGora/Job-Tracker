import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";

export function PageContainer({
  children,
  activeTab,
  onNavigate,
  totalJobs = 0,
  onOpenAddJob,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Sidebar for Desktop & Mobile drawer */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeTab={activeTab}
        onNavigate={onNavigate}
        totalJobs={totalJobs}
      />

      {/* Main app viewport */}
      <div className="flex flex-1 flex-col min-w-0">
        <Navbar
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
          onOpenAddJob={onOpenAddJob}
          activeTab={activeTab}
          onNavigate={onNavigate}
        />

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 max-w-7xl w-full mx-auto animate-fade-in">
          {children}
        </main>

        <footer className="border-t border-slate-200/80 bg-white py-4 px-6 text-center text-xs text-slate-500">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>JobTrack • SaaS Application Tracking System</span>
            <span className="text-slate-400">Built with React 19, Tailwind CSS & Express</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default PageContainer;
