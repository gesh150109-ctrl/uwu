"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Calendar,
  ClipboardCheck,
  FolderOpen,
  LayoutDashboard,
  User,
  Users,
  Vote,
  X,
} from "lucide-react";

interface SidebarProps {
  esAdmin: boolean;
  abierto: boolean;
  onClose: () => void;
}

const menuAdmin = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Sesiones",
    href: "/sesiones",
    icon: Calendar,
  },
  {
    title: "Asistencia",
    href: "/asistencia",
    icon: ClipboardCheck,
  },
  {
    title: "Solicitudes",
    href: "/solicitudes",
    icon: Users,
  },
  {
    title: "Miembros",
    href: "/miembros",
    icon: Users,
  },
  {
    title: "Materiales",
    href: "/materiales",
    icon: FolderOpen,
  },
  {
    title: "Votaciones",
    href: "/votaciones",
    icon: Vote,
  },
  {
    title: "Mi perfil",
    href: "/perfil",
    icon: User,
  },
];

const menuMember = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Sesiones",
    href: "/sesiones",
    icon: Calendar,
  },
  {
    title: "Materiales",
    href: "/materiales",
    icon: FolderOpen,
  },
  {
    title: "Votaciones",
    href: "/votaciones",
    icon: Vote,
  },
  {
    title: "Mi perfil",
    href: "/perfil",
    icon: User,
  },
];

export default function Sidebar({
  esAdmin,
  abierto,
  onClose,
}: SidebarProps) {
  const pathname = usePathname();
  const menu = esAdmin ? menuAdmin : menuMember;

  return (
    <>
      {abierto && (
        <button
          type="button"
          aria-label="Cerrar menú"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex h-dvh w-72
          flex-col border-r border-slate-800 bg-slate-950 text-white
          transition-transform duration-300 ease-in-out
          md:sticky md:top-0 md:z-20 md:h-screen md:translate-x-0
          ${abierto ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="relative flex flex-col items-center border-b border-slate-800 px-6 py-6 md:p-8">
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar menú"
            className="absolute right-4 top-4 rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white md:hidden"
          >
            <X size={22} />
          </button>

          <Image
            src="/images/logo-bytecode.png"
            alt="ByteCode"
            width={72}
            height={72}
            priority
          />

          <h1 className="mt-4 text-xl font-bold tracking-wide text-cyan-400 md:text-2xl">
            BYTECODE
          </h1>

          <p className="mt-1 text-center text-sm text-slate-400">
            Círculo de Estudios
          </p>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto p-4">
          {menu.map(({ title, href, icon: Icon }) => {
            const active =
              pathname === href ||
              pathname.startsWith(`${href}/`);

            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={`
                  flex items-center gap-3 rounded-xl px-4 py-3 transition
                  ${
                    active
                      ? "bg-cyan-500 font-semibold text-slate-950"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }
                `}
              >
                <Icon size={20} className="shrink-0" />
                <span>{title}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}