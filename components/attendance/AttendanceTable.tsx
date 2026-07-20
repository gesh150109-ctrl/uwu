"use client";

import {
  useActionState,
  useState,
} from "react";
import {
  CheckCircle2,
  LoaderCircle,
  Save,
  UsersRound,
} from "lucide-react";

import ProfileAvatar from "@/components/profile/ProfileAvatar";
import AttendanceStatusBadge from "./AttendanceStatusBadge";

import type {
  AttendanceFormState,
} from "@/app/(dashboard)/asistencia/[sesionId]/actions";

import type {
  Database,
  Tables,
} from "@/types/database.types";

type AttendanceStatus =
  Database["public"]["Enums"]["estado_asistencia"];

type Profile = Pick<
  Tables<"perfiles">,
  | "id"
  | "nombres"
  | "apellidos"
  | "foto_url"
  | "estado"
>;

type Attendance = Pick<
  Tables<"asistencia">,
  | "id"
  | "perfil_id"
  | "estado"
  | "justificacion"
>;

export interface AttendanceMember {
  memberId: string;
  profileId: string;
  fechaIngreso: string | null;
  fechaSalida: string | null;
  observaciones: string | null;
  profile: Profile | null;
  attendance: Attendance | null;
}

interface AttendanceTableProps {
  members: AttendanceMember[];
  action: (
    previousState: AttendanceFormState,
    formData: FormData,
  ) => Promise<AttendanceFormState>;
}

const initialState: AttendanceFormState = {
  error: null,
  success: null,
};

export default function AttendanceTable({
  members,
  action,
}: AttendanceTableProps) {
  const [state, formAction, isPending] = useActionState(
    action,
    initialState,
  );

  return (
    <form
      action={formAction}
      className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-lg"
    >
      <div className="flex flex-col justify-between gap-4 border-b border-slate-800 p-6 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-cyan-500/10 p-3 text-cyan-400">
            <UsersRound size={22} />
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">
              Registro de asistencia
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              {members.length}{" "}
              {members.length === 1
                ? "miembro activo"
                : "miembros activos"}
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? (
            <LoaderCircle
              size={18}
              className="animate-spin"
            />
          ) : (
            <Save size={18} />
          )}

          {isPending
            ? "Guardando..."
            : "Guardar asistencia"}
        </button>
      </div>

      {(state.error || state.success) && (
        <div className="px-6 pt-6">
          {state.error && (
            <div
              role="alert"
              className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
            >
              {state.error}
            </div>
          )}

          {state.success && (
            <div
              role="status"
              className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300"
            >
              <CheckCircle2 size={18} />
              {state.success}
            </div>
          )}
        </div>
      )}

      <div className="divide-y divide-slate-800">
        {members.map((member, index) => (
          <AttendanceRow
            key={member.profileId}
            member={member}
            index={index}
            disabled={isPending}
          />
        ))}
      </div>

      <div className="flex justify-end border-t border-slate-800 p-6">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? (
            <LoaderCircle
              size={18}
              className="animate-spin"
            />
          ) : (
            <Save size={18} />
          )}

          {isPending
            ? "Guardando..."
            : "Guardar asistencia"}
        </button>
      </div>
    </form>
  );
}

interface AttendanceRowProps {
  member: AttendanceMember;
  index: number;
  disabled: boolean;
}

function AttendanceRow({
  member,
  index,
  disabled,
}: AttendanceRowProps) {
  const initialStatus: AttendanceStatus =
    member.attendance?.estado ?? "PRESENTE";

  const [status, setStatus] =
    useState<AttendanceStatus>(initialStatus);

  const profile = member.profile;

  const nombres =
    profile?.nombres || "Miembro";

  const apellidos =
    profile?.apellidos || "sin perfil";

  const fullName =
    `${nombres} ${apellidos}`.trim();

  return (
    <article className="p-6">
      <input
        type="hidden"
        name="profile_id"
        value={member.profileId}
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(220px,1fr)_220px_minmax(240px,1fr)] lg:items-start">
        <div className="flex items-center gap-4">
          <ProfileAvatar
            nombres={nombres}
            apellidos={apellidos}
            fotoUrl={profile?.foto_url}
            size="md"
          />

          <div className="min-w-0">
            <p className="truncate font-semibold text-white">
              {fullName}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Miembro #{index + 1}
            </p>

            {member.attendance && (
              <div className="mt-2">
                <AttendanceStatusBadge
                  status={member.attendance.estado}
                />
              </div>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor={`estado_${member.profileId}`}
            className="mb-2 block text-sm font-semibold text-slate-300"
          >
            Estado
          </label>

          <select
            id={`estado_${member.profileId}`}
            name={`estado_${member.profileId}`}
            value={status}
            disabled={disabled}
            onChange={(event) =>
              setStatus(
                event.target.value as AttendanceStatus,
              )
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <option value="PRESENTE">
              Presente
            </option>

            <option value="MEDIA_FALTA">
              Media falta
            </option>

            <option value="FALTA">
              Falta
            </option>

            <option value="JUSTIFICADA">
              Justificada
            </option>
          </select>
        </div>

        <div>
          <label
            htmlFor={`justificacion_${member.profileId}`}
            className="mb-2 block text-sm font-semibold text-slate-300"
          >
            Justificación
          </label>

          <textarea
            id={`justificacion_${member.profileId}`}
            name={`justificacion_${member.profileId}`}
            rows={2}
            maxLength={500}
            disabled={
              disabled || status !== "JUSTIFICADA"
            }
            required={status === "JUSTIFICADA"}
            defaultValue={
              member.attendance?.estado === "JUSTIFICADA"
                ? member.attendance.justificacion ?? ""
                : ""
            }
            placeholder={
              status === "JUSTIFICADA"
                ? "Describe el motivo de la falta..."
                : "Disponible para faltas justificadas"
            }
            className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-500 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
      </div>
    </article>
  );
}