import { createContext, useContext } from "react";

export const ToastContext = createContext(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    return {
      success: (msg) => console.log("[Toast Success]:", msg),
      error: (msg) => console.error("[Toast Error]:", msg),
      info: (msg) => console.log("[Toast Info]:", msg),
    };
  }
  return context;
}
