import React from "react";
import { ChevronDown } from "lucide-react";

export function Dropdown({
  label,
  options = [],
  value,
  onChange,
  error,
  required = false,
  id,
  className = "",
  placeholder = "Select an option",
  ...props
}) {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={selectId}
          className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700"
        >
          {label}
          {required && <span className="ml-1 text-rose-500">*</span>}
        </label>
      )}

      <div className="relative rounded-lg shadow-2xs">
        <select
          id={selectId}
          value={value}
          onChange={onChange}
          required={required}
          className={`w-full appearance-none rounded-lg border bg-white px-3.5 py-2 pr-10 text-sm text-slate-900 transition-colors focus:outline-none focus:ring-2 cursor-pointer disabled:bg-slate-50 disabled:text-slate-500 ${
            error
              ? "border-rose-300 focus:border-rose-500 focus:ring-rose-100"
              : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-100"
          } ${className}`}
          {...props}
        >
          {placeholder && !options.some((opt) => (typeof opt === "object" ? opt.value : opt) === value) && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => {
            const optVal = typeof opt === "object" ? opt.value : opt;
            const optLabel = typeof opt === "object" ? opt.label : opt;
            return (
              <option key={optVal} value={optVal}>
                {optLabel}
              </option>
            );
          })}
        </select>

        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>

      {error && <p className="mt-1 text-xs text-rose-600 font-medium">{error}</p>}
    </div>
  );
}

export default Dropdown;
