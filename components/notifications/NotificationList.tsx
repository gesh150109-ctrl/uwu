import NotificationItem from "./NotificationItem";

import type { Tables } from "@/types/database.types";

type Notification = Pick<
  Tables<"notificaciones">,
  | "id"
  | "titulo"
  | "mensaje"
  | "tipo"
  | "enlace"
  | "leida"
  | "created_at"
>;

interface NotificationListProps {
  notifications: Notification[];
}

export default function NotificationList({
  notifications,
}: NotificationListProps) {
  if (notifications.length === 0) {
    return (
      <div className="rounded-2xl border border-blue-900/70 bg-slate-900/70 px-6 py-16 text-center">
        <p className="text-lg font-semibold text-white">
          No tienes notificaciones
        </p>

        <p className="mt-2 text-sm text-slate-400">
          Las novedades importantes aparecerán aquí.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
        />
      ))}
    </div>
  );
}