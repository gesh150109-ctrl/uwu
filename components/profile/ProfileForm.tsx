"use client";

import { useActionState } from "react";
import {
  ImageIcon,
  LoaderCircle,
  Save,
  UserRound,
} from "lucide-react";

import type { Tables } from "@/types/database.types";
import type { ProfileFormState } from "@/app/(dashboard)/perfil/actions";
import ProfileAvatar from "./ProfileAvatar";

type Profile = Pick<
  Tables<"perfiles">,
  | "nombres"
  | "apellidos"
  | "foto_url"
  | "correo"
  | "es_admin"
  | "estado"
>;

interface ProfileFormProps {
  profile: Profile;
  action: (
    previousState: ProfileFormState,
    formData: FormData,
  ) => Promise<ProfileFormState>;
}

const initialState: ProfileFormState = {
  error: null,
};

const inputClassName =
  "w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-500 disabled:cursor-not-allowed disabled:opacity-60";

export default function ProfileForm({
  profile,
  action,
}: ProfileFormProps) {
  const [state, formAction, isPending] = useActionState(
    action,
    initialState,
  );

  return (
    <form
      action={formAction}
      className="space-y-8 rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg md:p-8"
    >
      {state.error && (
        <div
          role="alert"
          className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
        >
          {state.error}
        </div>
      )}

      <section className="flex flex-col gap-5 border-b border-slate-800 pb-8 sm:flex-row sm:items-center">
        <ProfileAvatar
          nombres={profile.nombres}
          apellidos={profile.apellidos}
          fotoUrl={profile.foto_url}
          size="xl"
        />

        <div>
          <h2 className="text-xl font-bold text-white">
            Fotografía de perfil
          </h2>

          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
            Por ahora puedes registrar la dirección pública de una imagen.
            Más adelante conectaremos la carga directa con Supabase Storage.
          </p>
        </div>
      </section>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="nombres"
            className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-200"
          >
            <UserRound size={17} className="text-cyan-400" />
            Nombres
          </label>

          <input
            id="nombres"
            name="nombres"
            type="text"
            required
            minLength={2}
            maxLength={100}
            disabled={isPending}
            defaultValue={profile.nombres}
            placeholder="Ingresa tus nombres"
            className={inputClassName}
          />
        </div>

        <div>
          <label
            htmlFor="apellidos"
            className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-200"
          >
            <UserRound size={17} className="text-cyan-400" />
            Apellidos
          </label>

          <input
            id="apellidos"
            name="apellidos"
            type="text"
            required
            minLength={2}
            maxLength={100}
            disabled={isPending}
            defaultValue={profile.apellidos ?? ""}
            placeholder="Ingresa tus apellidos"
            className={inputClassName}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="foto_url"
          className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-200"
        >
          <ImageIcon size={17} className="text-cyan-400" />
          URL de fotografía
        </label>

        <input
          id="foto_url"
          name="foto_url"
          type="url"
          maxLength={500}
          disabled={isPending}
          defaultValue={profile.foto_url ?? ""}
          placeholder="https://ejemplo.com/foto.jpg"
          className={inputClassName}
        />

        <p className="mt-2 text-xs text-slate-500">
          Debe ser una dirección pública que comience con http:// o https://.
        </p>
      </div>

      <section className="grid gap-5 border-t border-slate-800 pt-8 md:grid-cols-3">
        <ReadOnlyField
          label="Correo"
          value={profile.correo}
        />

        <ReadOnlyField
          label="Rol"
          value={profile.es_admin ? "Administrador" : "Miembro"}
        />

        <ReadOnlyField
  label="Estado"
  value={
    {
      PENDIENTE: "Pendiente",
      ACTIVO: "Activo",
      SUSPENDIDO: "Suspendido",
      INACTIVO: "Inactivo",
    }[profile.estado]
  }
/>
      </section>

      <div className="flex justify-end border-t border-slate-800 pt-6">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? (
            <LoaderCircle
              size={18}
              className="animate-spin"
            />
          ) : (
            <Save size={18} />
          )}

          {isPending ? "Guardando..." : "Guardar cambios"}
        </button>
      </div>
    </form>
  );
}

function ReadOnlyField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
      <p className="text-sm text-slate-500">
        {label}
      </p>

      <p className="mt-1 truncate font-medium text-slate-300">
        {value}
      </p>
    </div>
  );
}