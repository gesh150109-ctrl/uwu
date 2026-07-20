import { CrearVotacionForm } from "@/components/votaciones/crear-votacion-form";
import { VotacionCard } from "@/components/votaciones/votacion-card";
import { obtenerVotaciones } from "@/services/votaciones.service";

export default async function VotacionesPage() {
  const { votaciones, esAdmin } = await obtenerVotaciones();

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-8 text-slate-100">
      <div className="space-y-6">
        <header>
          <h1 className="text-3xl font-bold text-white">
            Votaciones
          </h1>

          <p className="mt-2 text-sm text-blue-300">
            Participa y consulta los resultados de las votaciones.
          </p>
        </header>

        <CrearVotacionForm esAdmin={esAdmin} />

        {votaciones.length === 0 ? (
          <div className="rounded-2xl border border-blue-900/70 bg-blue-950/30 p-10 text-center">
            <p className="text-sm text-slate-400">
              No hay votaciones registradas.
            </p>
          </div>
        ) : (
          <div className="grid gap-5">
            {votaciones.map((votacion) => (
              <VotacionCard
                key={votacion.id}
                votacion={votacion}
                esAdmin={esAdmin}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}