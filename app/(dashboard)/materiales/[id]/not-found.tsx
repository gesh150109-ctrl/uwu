import Link from "next/link";
import { FileQuestion } from "lucide-react";

export default function MaterialNotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="max-w-md rounded-2xl border border-blue-900/70 bg-slate-900/70 p-8 text-center">
        <FileQuestion
          size={48}
          className="mx-auto text-cyan-300"
        />

        <h1 className="mt-5 text-2xl font-bold text-white">
          Material no encontrado
        </h1>

        <p className="mt-2 text-slate-400">
          El material no existe o ya fue eliminado.
        </p>

        <Link
          href="/materiales"
          className="mt-6 inline-flex rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 hover:bg-cyan-400"
        >
          Volver a materiales
        </Link>
      </div>
    </div>
  );
}