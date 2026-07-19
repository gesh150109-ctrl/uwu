import { createClient } from "@/lib/supabase/server";
import LogoutButton from "@/components/auth/logout-button";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">
        Dashboard
      </h1>

      <p className="mt-2 text-slate-400">
        Bienvenido {user?.email}
      </p>

      <div className="mt-8">
        <LogoutButton />
      </div>
    </main>
  );
}