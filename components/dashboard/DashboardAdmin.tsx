import Header from "./Header";
import NextSessionCard from "./NextSessionCard";
import QuickActions from "./QuickActions";
import StatCard from "./StatCard";

interface Props {
  nombre: string;

  totalMiembros: number;

  solicitudesPendientes: number;

  materialesRecientes: number;

  votacionesActivas: number;

  proximaSesion: {
    titulo: string;
    fecha: string;
    hora_inicio: string;
    hora_fin: string;
    lugar: string | null;
  } | null;
}

export default function DashboardAdmin({
  nombre,
  totalMiembros,
  solicitudesPendientes,
  materialesRecientes,
  votacionesActivas,
  proximaSesion,
}: Props) {
  return (
    <div className="space-y-8">

      <Header nombre={nombre} />

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Miembros"
          value={totalMiembros}
        />

        <StatCard
          title="Solicitudes"
          value={solicitudesPendientes}
        />

        <StatCard
          title="Materiales"
          value={materialesRecientes}
        />

        <StatCard
          title="Votaciones"
          value={votacionesActivas}
        />

      </section>

      <section className="grid gap-6 lg:grid-cols-2">

        <NextSessionCard
          session={proximaSesion}
        />

        <QuickActions />

      </section>

    </div>
  );
}