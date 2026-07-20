"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

interface DashboardShellProps {
  children: React.ReactNode;
  nombre: string;
  esAdmin: boolean;
  notificacionesNoLeidas: number;
}

export default function DashboardShell({
  children,
  nombre,
  esAdmin,
  notificacionesNoLeidas,
}: DashboardShellProps) {
  const [menuAbierto, setMenuAbierto] =
    useState(false);

  const pathname = usePathname();

  useEffect(() => {
    setMenuAbierto(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuAbierto
      ? "hidden"
      : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuAbierto]);

  return (
    <div className="flex min-h-dvh w-full bg-slate-900">
      <Sidebar
        esAdmin={esAdmin}
        abierto={menuAbierto}
        onClose={() => setMenuAbierto(false)}
      />

      <main className="min-w-0 flex-1">
        <div className="relative">
          <button
            type="button"
            aria-label="Abrir menú"
            onClick={() => setMenuAbierto(true)}
            className="fixed left-3 top-3 z-30 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-950 text-white shadow-lg transition hover:bg-slate-800 md:hidden"
          >
            <Menu size={22} />
          </button>

          <Navbar
            nombre={nombre}
            rol={
              esAdmin
                ? "Administrador"
                : "Miembro"
            }
            notificacionesNoLeidas={
              notificacionesNoLeidas
            }
          />
        </div>

        <div className="w-full min-w-0 overflow-x-hidden p-4 sm:p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}