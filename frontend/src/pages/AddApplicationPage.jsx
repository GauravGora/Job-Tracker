import React, { useState } from "react";
import { PlusCircle, Sparkles, CheckCircle2, ArrowLeft } from "lucide-react";
import { JobForm } from "../components/jobs/JobForm";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";

export function AddApplicationPage({ onAddJob, onNavigate }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      await onAddJob(formData);
      onNavigate("applications");
    } catch (err) {
      console.error("Failed to add job:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Back button */}
      <div>
        <button
          type="button"
          onClick={() => onNavigate("dashboard")}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Dashboard</span>
        </button>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-start justify-between pb-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100">
                <PlusCircle className="h-4 w-4" />
              </div>
              <CardTitle>Add New Application</CardTitle>
            </div>
            <p className="mt-1 text-xs sm:text-sm text-slate-500">
              Record details for a job or internship application you've submitted.
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <JobForm
            onSubmit={handleSubmit}
            onCancel={() => onNavigate("applications")}
            isSubmitting={isSubmitting}
            submitLabel="Save Application"
          />

          {/* Quick checklist tips */}
          <div className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-4">
            <h4 className="flex items-center gap-2 text-xs font-semibold text-slate-800">
              <Sparkles className="h-4 w-4 text-indigo-600" />
              Application Best Practices
            </h4>
            <div className="mt-2.5 grid gap-2 sm:grid-cols-2 text-xs text-slate-600">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Save the recruiter's name and LinkedIn in notes</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Record the exact job title and requirements</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Follow up 5-7 business days after applying</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Prepare company-specific questions for interviews</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AddApplicationPage;
