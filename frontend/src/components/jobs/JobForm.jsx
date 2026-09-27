import React, { useState, useEffect } from "react";
import { Building2, Briefcase, Calendar } from "lucide-react";
import { Input } from "../ui/Input";
import { Dropdown } from "../ui/Dropdown";
import { Button } from "../ui/Button";
import { STATUS_OPTIONS } from "../../utils/constants";

export function JobForm({
  initialData = null,
  onSubmit,
  onCancel,
  isSubmitting = false,
  submitLabel = "Save Application",
}) {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");
  const [appliedDate, setAppliedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setCompany(initialData.company || "");
      setRole(initialData.role || "");
      setStatus(initialData.status === "Offer" ? "Selected" : initialData.status || "Applied");
      if (initialData.appliedDate) {
        try {
          const d = new Date(initialData.appliedDate);
          setAppliedDate(d.toISOString().split("T")[0]);
        } catch {
          setAppliedDate(new Date().toISOString().split("T")[0]);
        }
      }
      setNotes(initialData.notes || "");
    } else {
      setCompany("");
      setRole("");
      setStatus("Applied");
      setAppliedDate(new Date().toISOString().split("T")[0]);
      setNotes("");
    }
    setErrors({});
  }, [initialData]);

  const validate = () => {
    const newErrors = {};
    if (!company.trim()) {
      newErrors.company = "Company name is required";
    }
    if (!role.trim()) {
      newErrors.role = "Job role is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    await onSubmit({
      company: company.trim(),
      role: role.trim(),
      status,
      appliedDate,
      notes: notes.trim(),
    });
  };

  const statusDropdownOptions = STATUS_OPTIONS.map((s) => ({
    value: s,
    label: s === "Selected" ? "Offer / Selected" : s,
  }));

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Company */}
        <Input
          label="Company Name"
          placeholder="e.g. Google, Microsoft, Accenture"
          value={company}
          onChange={(e) => {
            setCompany(e.target.value);
            if (errors.company) setErrors((prev) => ({ ...prev, company: null }));
          }}
          icon={Building2}
          error={errors.company}
          required
        />

        {/* Role */}
        <Input
          label="Job Role / Title"
          placeholder="e.g. Frontend Engineer, Product Analyst"
          value={role}
          onChange={(e) => {
            setRole(e.target.value);
            if (errors.role) setErrors((prev) => ({ ...prev, role: null }));
          }}
          icon={Briefcase}
          error={errors.role}
          required
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Status */}
        <Dropdown
          label="Application Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          options={statusDropdownOptions}
          required
        />

        {/* Applied Date */}
        <Input
          label="Applied Date"
          type="date"
          value={appliedDate}
          onChange={(e) => setAppliedDate(e.target.value)}
          icon={Calendar}
        />
      </div>

      {/* Notes */}
      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
          Notes & Interview Details
        </label>
        <div className="relative rounded-lg shadow-2xs">
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. Referral by senior, recruiter phone screen on Friday, tech stack: React & Node..."
            className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-900 transition-colors placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 resize-none"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-2">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          variant="primary"
          isLoading={isSubmitting}
        >
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}

export default JobForm;
