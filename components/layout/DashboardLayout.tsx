import DashboardShell from "./DashboardShell";

import { getUnreadNotificationsCount } from "@/services/notifications/get-unread-count";

interface Props {
  children: React.ReactNode;
  nombre: string;
  esAdmin: boolean;
}

export default async function DashboardLayout({
  children,
  nombre,
  esAdmin,
}: Props) {
  const notificacionesNoLeidas =
    await getUnreadNotificationsCount();

  return (
    <DashboardShell
      nombre={nombre}
      esAdmin={esAdmin}
      notificacionesNoLeidas={
        notificacionesNoLeidas
      }
    >
      {children}
    </DashboardShell>
  );
}