import { redirect } from "next/navigation";

import ProfileCard from "@/components/profile/ProfileCard";
import { createClient } from "@/lib/supabase/server";
import { getProfile } from "@/services/profile/get-profile";

export default async function ProfilePage() {
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
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-white md:text-4xl">
          Mi perfil
        </h1>

        <p className="mt-2 text-slate-400">
          Consulta y administra la información de tu cuenta.
        </p>
      </header>

      <ProfileCard profile={profileWithEmail} />
    </div>
  );
}