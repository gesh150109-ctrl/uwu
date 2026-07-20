import { createClient } from "@/lib/supabase/server";
import { getDashboardData } from "@/services/dashboard/get-dashboard-data";

import DashboardAdmin from "@/components/dashboard/DashboardAdmin";
import DashboardMember from "@/components/dashboard/DashboardMember";

import {
  AdminDashboardData,
  MemberDashboardData,
} from "@/types/dashboard";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const dashboard = await getDashboardData(user.id);

  if (dashboard.profile.es_admin) {
    const adminData = dashboard as AdminDashboardData;

    return (
      <DashboardAdmin
        nombre={adminData.profile.nombres}
        totalMiembros={adminData.totalMiembros}
        solicitudesPendientes={adminData.solicitudesPendientes}
        materialesRecientes={adminData.materialesRecientes}
        votacionesActivas={adminData.votacionesActivas}
        proximaSesion={adminData.proximaSesion}
      />
    );
  }

  const memberData = dashboard as MemberDashboardData;

  return (
    <DashboardMember
      nombre={memberData.profile.nombres}
      porcentajeAsistencia={memberData.porcentajeAsistencia}
      materialesNuevos={memberData.materialesNuevos}
      votacionesDisponibles={memberData.votacionesDisponibles}
      proximaSesion={memberData.proximaSesion}
    />
  );
}