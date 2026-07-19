"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function cerrarSesion() {
    const supabase = createClient();

    await supabase.auth.signOut();

    router.replace("/login");
    router.refresh();
  }

  return (
    <button
      onClick={cerrarSesion}
      className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-500 transition"
    >
      Cerrar sesión
    </button>
  );
}