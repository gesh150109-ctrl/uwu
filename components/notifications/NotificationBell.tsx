import Link from "next/link";
import { Bell } from "lucide-react";

import { getUnreadNotificationsCount } from "@/services/notifications/get-unread-count";

export default async function NotificationBell() {
  const unreadCount =
    await getUnreadNotificationsCount();

  return (
    <Link
      href="/notificaciones"
      aria-label="Notificaciones"
      className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-slate-300 transition hover:border-cyan-800 hover:text-white"
    >
      <Bell size={20} />

      {unreadCount > 0 && (
        <span className="absolute -right-1 -top-1 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-cyan-500 px-1 text-[10px] font-bold text-slate-950">
          {unreadCount > 99 ? "99+" : unreadCount}
        </span>
      )}
    </Link>
  );
}