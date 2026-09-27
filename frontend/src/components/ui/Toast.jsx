import React, { useState, useCallback, useMemo } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { ToastContext } from "../../context/ToastContext";

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (message, type = "success", duration = 4000) => {
      const id = Date.now() + Math.random().toString(36).substring(2, 6);
      setToasts((prev) => [...prev, { id, message, type }]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    [removeToast]
  );

  const toast = useMemo(
    () => ({
      success: (msg, dur) => addToast(msg, "success", dur),
      error: (msg, dur) => addToast(msg, "error", dur),
      info: (msg, dur) => addToast(msg, "info", dur),
    }),
    [addToast]
  );

  return (
    <ToastContext.Provider value={toast}>
      {children}
      {/* Toast viewport */}
      <div className="fixed bottom-4 right-4 z-50 flex max-w-sm flex-col gap-2 pointer-events-none">
        {toasts.map((t) => {
          const typeConfig = {
            success: {
              icon: CheckCircle2,
              bg: "bg-emerald-50 text-emerald-800 border-emerald-200",
              iconColor: "text-emerald-500",
            },
            error: {
              icon: AlertCircle,
              bg: "bg-rose-50 text-rose-800 border-rose-200",
              iconColor: "text-rose-500",
            },
            info: {
              icon: Info,
              bg: "bg-blue-50 text-blue-800 border-blue-200",
              iconColor: "text-blue-500",
            },
          }[t.type] || {
            icon: Info,
            bg: "bg-slate-900 text-white border-slate-800",
            iconColor: "text-indigo-400",
          };

          const IconComponent = typeConfig.icon;

          return (
            <div
              key={t.id}
              className={`pointer-events-auto flex items-center justify-between gap-3 rounded-xl border p-3.5 shadow-lg transition-all animate-fade-in ${typeConfig.bg}`}
              role="alert"
            >
              <div className="flex items-center gap-2.5">
                <IconComponent className={`h-5 w-5 shrink-0 ${typeConfig.iconColor}`} />
                <span className="text-xs sm:text-sm font-medium">{t.message}</span>
              </div>
              <button
                type="button"
                onClick={() => removeToast(t.id)}
                className="rounded-md p-1 opacity-70 hover:opacity-100 hover:bg-black/5 transition-opacity"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export default ToastProvider;
