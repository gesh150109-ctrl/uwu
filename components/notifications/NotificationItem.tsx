import Link from "next/link";
import {
  Bell,
  CheckCircle2,
  FileText,
  MessageSquareText,
  UserCheck,
  Vote,
} from "lucide-react";

import { markNotificationReadAction } from "@/app/(dashboard)/notificaciones/actions";
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

interface NotificationItemProps {
  notification: Notification;
}

function getIcon(tipo: Notification["tipo"]) {
  switch (tipo) {
    case "SESION":
      return MessageSquareText;

    case "VOTACION":
      return Vote;

    case "SOLICITUD":
      return UserCheck;

    case "MATERIAL":
      return FileText;

    default:
      return Bell;
  }
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("es-PE", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export default function NotificationItem({
  notification,
}: NotificationItemProps) {
  const Icon = getIcon(notification.tipo);

  return (
    <article
      className={`rounded-2xl border p-5 ${
        notification.leida
          ? "border-slate-800 bg-slate-900/50"
          : "border-cyan-800/70 bg-cyan-950/20"
      }`}
    >
      <div className="flex gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-300">
          <Icon size={21} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="font-semibold text-white">
                {notification.titulo}
              </h2>

              <p className="mt-1 text-sm leading-6 text-slate-300">
                {notification.mensaje}
              </p>
            </div>

            <span className="shrink-0 text-xs text-slate-500">
              {formatDate(notification.created_at)}
            </span>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            {notification.enlace && (
              <Link
                href={notification.enlace}
                className="text-sm font-semibold text-cyan-300 hover:text-cyan-200"
              >
                Ver detalle
              </Link>
            )}

            {!notification.leida && (
              <form action={markNotificationReadAction}>
                <input
                  type="hidden"
                  name="id"
                  value={notification.id}
                />

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"
                >
                  <CheckCircle2 size={16} />
                  Marcar como leída
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}