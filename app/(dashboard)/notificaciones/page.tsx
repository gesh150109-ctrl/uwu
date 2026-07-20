import { CheckCheck } from "lucide-react";

import NotificationList from "@/components/notifications/NotificationList";
import { getNotifications } from "@/services/notifications/get-notifications";
import { getUnreadNotificationsCount } from "@/services/notifications/get-unread-count";

import { markAllNotificationsReadAction } from "./actions";

export default async function NotificationsPage() {
  const [notifications, unreadCount] =
    await Promise.all([
      getNotifications(50),
      getUnreadNotificationsCount(),
    ]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Notificaciones
          </h1>

          <p className="mt-2 text-slate-400">
            {unreadCount > 0
              ? `${unreadCount} notificación${
                  unreadCount === 1 ? "" : "es"
                } sin leer`
              : "Estás al día"}
          </p>
        </div>

        {unreadCount > 0 && (
          <form action={markAllNotificationsReadAction}>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-800 px-4 py-3 font-semibold text-cyan-300 hover:bg-cyan-950/40"
            >
              <CheckCheck size={18} />
              Marcar todas como leídas
            </button>
          </form>
        )}
      </div>

      <NotificationList notifications={notifications} />
    </div>
  );
}