import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Download,
  ExternalLink,
  FileText,
} from "lucide-react";

import { getMaterial } from "@/services/materials/get-material";
import { getMaterialUrl } from "@/services/materials/get-material-url";

interface MaterialPageProps {
  params: Promise<{
    id: string;
  }>;
}

function formatFileSize(size: number | null) {
  if (!size) {
    return "No disponible";
  }

  if (size < 1024) {
    return `${size} B`;
  }

  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} KB`;
  }

  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(date: string | null) {
  if (!date) {
    return "Sin fecha";
  }

  return new Intl.DateTimeFormat("es-PE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export default async function MaterialPage({
  params,
}: MaterialPageProps) {
  const { id } = await params;

  let material;

  try {
    material = await getMaterial(id);
  } catch {
    notFound();
  }

  const esEnlace =
    material.tipo === "LINK" ||
    material.tipo === "VIDEO";

  let signedUrl: string | null = null;

  if (!esEnlace && material.archivo_path) {
    signedUrl = await getMaterialUrl(
      material.archivo_path,
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Link
        href="/materiales"
        className="inline-flex items-center gap-2 text-sm font-medium text-cyan-300 hover:text-cyan-200"
      >
        <ArrowLeft size={18} />
        Volver a materiales
      </Link>

      <section className="rounded-2xl border border-blue-900/70 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-6 shadow-xl md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-300">
              <FileText size={28} />
            </div>

            <div>
              <span className="inline-flex rounded-full border border-blue-800 bg-blue-950 px-3 py-1 text-xs font-semibold text-blue-300">
                {material.tipo}
              </span>

              <h1 className="mt-3 text-3xl font-bold text-white">
                {material.titulo}
              </h1>

              {material.categoria && (
                <p className="mt-2 text-sm text-cyan-300">
                  {material.categoria}
                </p>
              )}
            </div>
          </div>
        </div>

        {material.descripcion && (
          <div className="mt-8 border-t border-slate-800 pt-6">
            <h2 className="text-lg font-semibold text-white">
              Descripción
            </h2>

            <p className="mt-3 whitespace-pre-line leading-7 text-slate-300">
              {material.descripcion}
            </p>
          </div>
        )}

        <div className="mt-8 grid gap-4 border-t border-slate-800 pt-6 sm:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Archivo
            </p>

            <p className="mt-1 break-all text-sm text-slate-200">
              {material.archivo_nombre ??
                "Recurso externo"}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Tamaño
            </p>

            <p className="mt-1 text-sm text-slate-200">
              {esEnlace
                ? "No aplica"
                : formatFileSize(
                    material.archivo_tamano,
                  )}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Publicado
            </p>

            <p className="mt-1 text-sm text-slate-200">
              {formatDate(material.created_at)}
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-800 pt-6">
          {esEnlace && material.archivo_url ? (
            <a
              href={material.archivo_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              <ExternalLink size={18} />
              Abrir recurso
            </a>
          ) : signedUrl ? (
            <a
              href={signedUrl}
              download={material.archivo_nombre ?? undefined}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              <Download size={18} />
              Descargar archivo
            </a>
          ) : (
            <p className="text-sm text-red-300">
              El archivo no está disponible.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}