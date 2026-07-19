import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-700/50 bg-white/5 shadow-2xl backdrop-blur-xl">

        <div className="grid md:grid-cols-2">

          <div className="flex flex-col items-center justify-center p-10">
            <Image
              src="/images/logo-bytecode.png"
              alt="Logo Bytecode"
              width={220}
              height={220}
              priority
            />

            <h1 className="mt-8 text-5xl font-bold tracking-wide text-cyan-400">
              BYTECODE
            </h1>

            <h2 className="mt-3 text-center text-xl font-semibold">
              Círculo de Estudios de Ingeniería de Sistemas
            </h2>

            <p className="mt-2 text-center text-slate-300">
              Universidad Nacional de la Amazonía Peruana
            </p>

            <p className="mt-8 italic text-cyan-300">
              Aprende • Comparte • Crece
            </p>
          </div>

          <div className="flex flex-col justify-center bg-slate-900/40 p-10">
            <h3 className="text-3xl font-bold">
              Bienvenido
            </h3>

            <p className="mt-4 leading-7 text-slate-300">
              Plataforma oficial del Círculo de Estudios Bytecode.
            </p>

            <p className="mt-3 text-slate-400">
              Aquí podrás consultar las sesiones, registrar tu asistencia,
              participar en votaciones y acceder al material de estudio.
            </p>

            <Link
              href="/login"
              className="mt-10 rounded-xl bg-cyan-500 py-3 text-center text-lg font-semibold transition hover:bg-cyan-400"
            >
              Iniciar sesión
            </Link>

            <Link
              href="/solicitar-ingreso"
              className="mt-4 rounded-xl border border-cyan-500 py-3 text-center text-lg font-semibold text-cyan-300 transition hover:bg-cyan-500 hover:text-white"
            >
              Solicitar ingreso
            </Link>
          </div>

        </div>

      </div>
    </main>
  );
}