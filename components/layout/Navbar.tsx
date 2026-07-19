"use client";

import { Bell } from "lucide-react";
import LogoutButton from "@/components/auth/logout-button";

interface NavbarProps {
  nombre?: string;
  rol?: string;
}

export default function Navbar({
  nombre = "Administrador",
  rol = "Bytecode",
}: NavbarProps) {
  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-800 bg-slate-950 px-8">

      <div>
        <h2 className="text-2xl font-bold text-white">
          Dashboard
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Bienvenido al sistema Bytecode
        </p>
      </div>

      <div className="flex items-center gap-6">

        <button className="rounded-full p-2 transition hover:bg-slate-800">
          <Bell size={20} className="text-slate-400" />
        </button>

        <div className="text-right">
          <p className="font-semibold text-white">
            {nombre}
          </p>

          <p className="text-sm text-slate-400">
            {rol}
          </p>
        </div>

        <LogoutButton />

      </div>

    </header>
  );
}