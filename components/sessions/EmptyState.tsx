import Link from "next/link";
import { CalendarPlus } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-900 py-20 text-center">

      <CalendarPlus
        size={64}
        className="text-slate-500"
      />

      <h2 className="mt-6 text-2xl font-bold text-white">
        No hay sesiones registradas
      </h2>

      <p className="mt-3 max-w-md text-slate-400">
        Empieza creando la primera sesión del círculo de estudios.
      </p>

      <Link
        href="/sesiones/nueva"
        className="mt-8 rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
      >
        Crear sesión
      </Link>

    </div>
  );
}