import Link from "next/link";
import {
  BadgeCheck,
  Mail,
  Pencil,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import type { Tables } from "@/types/database.types";
import ProfileAvatar from "./ProfileAvatar";

type Profile = Pick<
  Tables<"perfiles">,
  | "correo"
  | "nombres"
  | "apellidos"
  | "foto_url"
  | "es_admin"
  | "estado"
>;

interface ProfileCardProps {
  profile: Profile;
}

const statusStyles = {
  PENDIENTE: {
    label: "Pendiente",
    className:
      "border-amber-500/30 bg-amber-500/10 text-amber-400",
  },
  ACTIVO: {
    label: "Activo",
    className:
      "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  },
  SUSPENDIDO: {
    label: "Suspendido",
    className:
      "border-orange-500/30 bg-orange-500/10 text-orange-400",
  },
  INACTIVO: {
    label: "Inactivo",
    className:
      "border-red-500/30 bg-red-500/10 text-red-400",
  },
} as const;

export default function ProfileCard({
  profile,
}: ProfileCardProps) {
  const fullName =
    `${profile.nombres} ${profile.apellidos ?? ""}`.trim();

  const status = statusStyles[profile.estado];

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-lg">
      <div className="h-32 bg-gradient-to-r from-cyan-500/20 via-blue-500/10 to-slate-900" />

      <div className="px-6 pb-8 md:px-8">
        <div className="-mt-14 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <ProfileAvatar
              nombres={profile.nombres}
              apellidos={profile.apellidos}
              fotoUrl={profile.foto_url}
              size="xl"
              className="border-4 border-slate-900"
            />

            <div className="pb-1">
              <h1 className="text-3xl font-bold text-white">
                {fullName}
              </h1>

              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${status.className}`}
                >
                  <BadgeCheck size={14} />
                  {status.label}
                </span>

                <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-400">
                  {profile.es_admin ? (
                    <ShieldCheck size={14} />
                  ) : (
                    <UserRound size={14} />
                  )}

                  {profile.es_admin ? "Administrador" : "Miembro"}
                </span>
              </div>
            </div>
          </div>

          <Link
            href="/perfil/editar"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-2.5 text-sm font-semibold text-cyan-400 transition hover:bg-cyan-500/20"
          >
            <Pencil size={17} />
            Editar perfil
          </Link>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-cyan-500/10 p-2.5 text-cyan-400">
                <Mail size={20} />
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Correo electrónico
                </p>

                <p className="mt-1 font-medium text-white">
                  {profile.correo}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-cyan-500/10 p-2.5 text-cyan-400">
                <ShieldCheck size={20} />
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Tipo de cuenta
                </p>

                <p className="mt-1 font-medium text-white">
                  {profile.es_admin
                    ? "Cuenta administrativa"
                    : "Cuenta de miembro"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}