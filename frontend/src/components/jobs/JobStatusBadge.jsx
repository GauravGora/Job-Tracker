import React from "react";
import { Badge } from "../ui/Badge";
import { STATUS_CONFIG } from "../../utils/constants";

export function JobStatusBadge({ status = "Applied", size = "md", className = "" }) {
  const normalizedStatus = status === "Offer" ? "Selected" : status;
  const config = STATUS_CONFIG[normalizedStatus] || STATUS_CONFIG.Applied;

  const variantMap = {
    Applied: "blue",
    Interview: "purple",
    Selected: "green",
    Offer: "green",
    Rejected: "red",
    Pending: "amber",
  };

  const variant = variantMap[normalizedStatus] || "neutral";

  return (
    <Badge
      variant={variant}
      size={size}
      dot
      className={`font-medium ${className}`}
    >
      {config.label}
    </Badge>
  );
}

export default JobStatusBadge;
