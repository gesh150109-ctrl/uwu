interface Props {
  session: {
    titulo: string;
    fecha: string;
    hora_inicio: string;
    hora_fin: string;
    lugar: string | null;
  } | null;
}

export default function NextSessionCard({
  session,
}: Props) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <h2 className="ttext-2xl font-bold text-cyan-300">
        Próxima sesión
      </h2>

      {!session && (
        <p className="mt-5 text-slate-400">
          No hay sesiones programadas.
        </p>
      )}

      {session && (
        <div className="mt-5 space-y-3">

          <div>
            <p className="text-blue-300">
              Curso
            </p>

            <p className="text-white">
              {session.titulo}
            </p>
          </div>

          <div>
            <p className="text-blue-300">
              Fecha
            </p>

            <p className="text-white"> 
              {session.fecha}</p>
          </div>

          <div>
            <p className="text-blue-300">
              Horario
            </p>

            <p className="text-white"> 
              {session.hora_inicio} - {session.hora_fin}
            </p>
          </div>

          <div>
            <p className="text-blue-300">
              Lugar
            </p>

            <p className="text-white">{session.lugar ?? "Sin asignar"}</p>
          </div>

        </div>
      )}

    </div>
  );
}