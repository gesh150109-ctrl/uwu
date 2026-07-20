import Link from "next/link";

export default function QuickActions() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <h2 className="text-2xl font-bold text-white">
        Acciones rápidas
      </h2>

      <div className="mt-6 grid gap-4">

        <Link
          href="/sesiones"
          className="rounded-xl bg-cyan-500 px-5 py-3 text-center font-semibold text-slate-950 transition hover:bg-cyan-400"
        >
          Gestionar sesiones
        </Link>

        <Link
          href="/materiales"
          className="rounded-xl bg-slate-800 px-5 py-3 text-center transition hover:bg-slate-700"
        >
          Materiales
        </Link>

        <Link
          href="/votaciones"
          className="rounded-xl bg-slate-800 px-5 py-3 text-center transition hover:bg-slate-700"
        >
          Votaciones
        </Link>

      </div>

    </div>
  );
}