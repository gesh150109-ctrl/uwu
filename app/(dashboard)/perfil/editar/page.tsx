import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import ProfileForm from "@/components/profile/ProfileForm";
import { createClient } from "@/lib/supabase/server";
import { getProfile } from "@/services/profile/get-profile";
import { updateProfileAction } from "../actions";

export default async function EditProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/login");
  }

  const profile = await getProfile(user.id);

  if (!profile) {
    throw new Error(
      "No existe un perfil asociado al usuario autenticado.",
    );
  }

  const profileWithEmail = {
    ...profile,
    correo: user.email ?? "Correo no disponible",
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <header>
        <Link
          href="/perfil"
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-cyan-400"
        >
          <ArrowLeft size={17} />
          Volver al perfil
        </Link>

        <h1 className="text-3xl font-bold text-white md:text-4xl">
          Editar perfil
        </h1>

        <p className="mt-2 text-slate-400">
          Actualiza tus nombres, apellidos y fotografía.
        </p>
      </header>

      <ProfileForm
        profile={profileWithEmail}
        action={updateProfileAction}
      />
    </div>
  );
}