"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bell } from "lucide-react";

import LogoutButton from "@/components/auth/logout-button";
import { createClient } from "@/lib/supabase/client";

interface NavbarProps {
  nombre?: string;
  rol?: string;
  notificacionesNoLeidas?: number;
}

export default function Navbar({
  nombre = "Usuario",
  rol = "Miembro",
  notificacionesNoLeidas = 0,
}: NavbarProps) {
  const [unreadCount, setUnreadCount] = useState(
    notificacionesNoLeidas,
  );

  const [hasNewNotification, setHasNewNotification] =
    useState(false);

  useEffect(() => {
    setUnreadCount(notificacionesNoLeidas);
  }, [notificacionesNoLeidas]);

  useEffect(() => {
    const supabase = createClient();

    let channel:
      | ReturnType<typeof supabase.channel>
      | undefined;

    let mounted = true;
    let animationTimeout: ReturnType<
      typeof setTimeout
    > | null = null;

    async function updateUnreadCount(userId: string) {
      const { count, error } = await supabase
        .from("notificaciones")
        .select("id", {
          count: "exact",
          head: true,
        })
        .eq("usuario_id", userId)
        .eq("leida", false);

      if (error) {
        console.error(
          "Error al obtener notificaciones no leídas:",
          error,
        );

        return;
      }

      if (mounted) {
        setUnreadCount(count ?? 0);
      }
    }

    async function subscribeToNotifications() {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user || !mounted) {
        return;
      }

      await updateUnreadCount(user.id);

      channel = supabase
        .channel(`notificaciones-${user.id}`)
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "notificaciones",
            filter: `usuario_id=eq.${user.id}`,
          },
          async (payload) => {
            await updateUnreadCount(user.id);

            if (
              mounted &&
              payload.eventType === "INSERT"
            ) {
              setHasNewNotification(true);

              if (animationTimeout) {
                clearTimeout(animationTimeout);
              }

              animationTimeout = setTimeout(() => {
                if (mounted) {
                  setHasNewNotification(false);
                }
              }, 2000);
            }
          },
        )
        .subscribe();
    }

    void subscribeToNotifications();

    return () => {
      mounted = false;

      if (animationTimeout) {
        clearTimeout(animationTimeout);
      }

      if (channel) {
        void supabase.removeChannel(channel);
      }
    };
  }, []);

  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-800 bg-slate-950 px-8">
      <div>
        <h2 className="text-2xl font-bold text-white">
          ByteCode Platform
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Panel de gestión
        </p>
      </div>

      <div className="flex items-center gap-6">
        <Link
          href="/notificaciones"
          aria-label={
            unreadCount > 0
              ? `${unreadCount} notificaciones no leídas`
              : "Notificaciones"
          }
          className={`relative rounded-full p-2 transition hover:bg-slate-800 ${
            hasNewNotification
              ? "animate-bounce bg-cyan-500/10"
              : ""
          }`}
        >
          <Bell
            size={20}
            className={
              unreadCount > 0
                ? "text-cyan-400"
                : "text-slate-400"
            }
          />

          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-cyan-500 px-1 text-[10px] font-bold text-slate-950">
              {unreadCount > 99
                ? "99+"
                : unreadCount}
            </span>
          )}
        </Link>

        <div className="text-right">
          <p className="font-semibold text-white">
            {nombre}
          </p>

          <p className="text-sm text-cyan-400">
            {rol}
          </p>
        </div>

        <LogoutButton />
      </div>
    </header>
  );
}