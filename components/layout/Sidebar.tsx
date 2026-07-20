"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  Users,
  ClipboardCheck,
  FolderOpen,
  Vote,
  User,
} from "lucide-react";

interface SidebarProps {
  esAdmin: boolean;
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
}: SidebarProps) {
  const pathname = usePathname();

  const menu = esAdmin ? menuAdmin : menuMember;
  return (
    <aside className="sticky top-0 flex h-screen w-72 shrink-0 flex-col border-r border-slate-800 bg-slate-950 text-white">

      <div className="flex flex-col items-center border-b border-slate-800 p-8">

        <Image
          src="/images/logo-bytecode.png"
          alt="Bytecode"
          width={80}
          height={80}
          priority
        />

        <h1 className="mt-4 text-2xl font-bold tracking-wide text-cyan-400">
          BYTECODE
        </h1>

        <p className="mt-1 text-center text-sm text-slate-400">
          Círculo de Estudios
        </p>

      </div>

      <nav className="flex-1 space-y-2 overflow-y-auto p-4">
        {menu.map(({ title, href, icon: Icon }) => {
          const active =
            pathname === href || pathname.startsWith(`${href}/`);

          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                active
                  ? "bg-cyan-500 text-slate-950 font-semibold"
                  : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              <Icon size={20} />
              <span>{title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}