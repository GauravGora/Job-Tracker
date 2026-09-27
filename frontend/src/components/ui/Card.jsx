import React from "react";

export function Card({
  children,
  className = "",
  hoverable = false,
  onClick,
  ...props
}) {
  return (
    <div
      onClick={onClick}
      className={`rounded-xl border border-slate-200/90 bg-white shadow-2xs transition-all duration-200 ${
        hoverable ? "hover:-translate-y-0.5 hover:shadow-md hover:border-slate-300 cursor-pointer" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "" }) {
  return (
    <div className={`p-5 sm:p-6 border-b border-slate-100 ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = "" }) {
  return (
    <h3 className={`text-base sm:text-lg font-semibold text-slate-900 ${className}`}>
      {children}
    </h3>
  );
}

export function CardDescription({ children, className = "" }) {
  return (
    <p className={`text-xs sm:text-sm text-slate-500 mt-1 ${className}`}>
      {children}
    </p>
  );
}

export function CardContent({ children, className = "" }) {
  return <div className={`p-5 sm:p-6 ${className}`}>{children}</div>;
}

export function CardFooter({ children, className = "" }) {
  return (
    <div className={`p-4 sm:p-6 border-t border-slate-100 bg-slate-50/50 rounded-b-xl ${className}`}>
      {children}
    </div>
  );
}

export default Card;
