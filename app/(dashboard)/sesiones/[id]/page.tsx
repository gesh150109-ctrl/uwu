import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  Pencil,
} from "lucide-react";

import { getSession } from "@/services/sessions/get-session";
import SessionDetails from "@/components/sessions/SessionDetails";
import DeleteSessionButton from "@/components/sessions/DeleteSessionButton";
import { deleteSessionAction } from "../actions";

interface SessionDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function SessionDetailPage({
  params,
}: SessionDetailPageProps) {
  const { id } = await params;

  let session;

  try {
    session = await getSession(id);
  } catch (error) {
    console.error("Error al obtener la sesión:", error);
    notFound();
  }

  if (!session) {
    notFound();
  }

  const deleteAction = deleteSessionAction.bind(
    null,
    session.id,
  );

  return (
    <div className="space-y-8">
      <header>
        <Link
          href="/sesiones"
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-cyan-400"
        >
          <ArrowLeft size={17} />
          Volver a sesiones
        </Link>

        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-cyan-400">
              Detalle de sesión
            </p>

            <p className="mt-1 text-sm text-slate-400">
              Consulta y administra la información registrada.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href={`/sesiones/${session.id}/editar`}
              className="inline-flex items-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-2.5 text-sm font-semibold text-cyan-400 transition hover:bg-cyan-500/20"
            >
              <Pencil size={17} />
              Editar sesión
            </Link>

            <DeleteSessionButton action={deleteAction} />
          </div>
        </div>
      </header>

      <SessionDetails session={session} />

      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6 md:p-8">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-cyan-500/10 p-3 text-cyan-400">
            <BookOpen size={22} />
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">
              Cursos y expositores
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Cursos asignados y miembros responsables de exponer.
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-dashed border-slate-700 bg-slate-950/50 px-6 py-10 text-center">
          <p className="font-medium text-slate-300">
            Todavía no hay cursos asignados.
          </p>

          <p className="mt-2 text-sm text-slate-500">
            La administración de cursos se agregará en el siguiente paso.
          </p>
        </div>
      </section>
    </div>
  );
}