import {
  BadgeCheck,
  CircleAlert,
  CircleMinus,
  FileCheck2,
} from "lucide-react";

import type { Database } from "@/types/database.types";

type AttendanceStatus =
  Database["public"]["Enums"]["estado_asistencia"];

interface AttendanceStatusBadgeProps {
  status: AttendanceStatus;
}

const statusConfig = {
  PRESENTE: {
    label: "Presente",
    className:
      "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
    icon: BadgeCheck,
  },
  MEDIA_FALTA: {
    label: "Media falta",
    className:
      "border-amber-500/30 bg-amber-500/10 text-amber-400",
    icon: CircleAlert,
  },
  FALTA: {
    label: "Falta",
    className:
      "border-red-500/30 bg-red-500/10 text-red-400",
    icon: CircleMinus,
  },
  JUSTIFICADA: {
    label: "Justificada",
    className:
      "border-blue-500/30 bg-blue-500/10 text-blue-400",
    icon: FileCheck2,
  },
} satisfies Record<
  AttendanceStatus,
  {
    label: string;
    className: string;
    icon: typeof BadgeCheck;
  }
>;

export default function AttendanceStatusBadge({
  status,
}: AttendanceStatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${config.className}`}
    >
      <Icon size={14} />
      {config.label}
    </span>
  );
}