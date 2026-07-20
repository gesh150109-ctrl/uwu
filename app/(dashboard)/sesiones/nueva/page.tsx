import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import SessionForm from "@/components/sessions/SessionForm";
import { createSessionAction } from "../actions";

export default function NewSessionPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <header>
        <Link
          href="/sesiones"
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-cyan-400"
        >
          <ArrowLeft size={17} />
          Volver a sesiones
        </Link>

        <h1 className="text-3xl font-bold text-white md:text-4xl">
          Nueva sesión
        </h1>

        <p className="mt-2 text-slate-400">
          Registra los datos principales de la nueva sesión.
        </p>
      </header>

      <SessionForm
        action={createSessionAction}
        submitLabel="Crear sesión"
      />
    </div>
  );
}