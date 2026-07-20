import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { getProfile } from "@/services/profile/get-profile";

interface Props {
  children: ReactNode;
}

export default async function Layout({
  children,
}: Props) {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  const profile = await getProfile(user.id);

  if (!profile) {
    redirect("/completar-perfil");
  }

  return (
    <DashboardLayout
      nombre={profile.nombres}
      esAdmin={profile.es_admin ?? false}
    >
      {children}
    </DashboardLayout>
  );
}