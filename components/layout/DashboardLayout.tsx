import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

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
    <div className="flex min-h-screen bg-slate-900">
      <Sidebar esAdmin={esAdmin} />

      <main className="min-w-0 flex-1">
        <Navbar
          nombre={nombre}
          rol={esAdmin ? "Administrador" : "Miembro"}
          notificacionesNoLeidas={notificacionesNoLeidas}
        />

        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}