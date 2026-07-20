import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import SessionForm from "@/components/sessions/SessionForm";
import { getSession } from "@/services/sessions/get-session";
import { updateSessionAction } from "../../actions";

interface EditSessionPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditSessionPage({
  params,
}: EditSessionPageProps) {
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

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <header>
        <Link
          href={`/sesiones/${session.id}`}
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-cyan-400"
        >
          <ArrowLeft size={17} />
          Volver al detalle
        </Link>

        <h1 className="text-3xl font-bold text-white md:text-4xl">
          Editar sesión
        </h1>

        <p className="mt-2 text-slate-400">
          Modifica la información y el estado de la sesión.
        </p>
      </header>

      <SessionForm
        action={updateSessionAction}
        session={session}
        submitLabel="Guardar cambios"
      />
    </div>
  );
}