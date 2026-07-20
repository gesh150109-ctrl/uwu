import Link from "next/link";
import {
  Archive,
  ExternalLink,
  File,
  FileText,
  FolderOpen,
  Presentation,
  Video,
} from "lucide-react";

import type { Tables } from "@/types/database.types";

type Material = Pick<
  Tables<"materiales">,
  | "id"
  | "titulo"
  | "descripcion"
  | "categoria"
  | "tipo"
  | "archivo_url"
  | "archivo_path"
  | "archivo_nombre"
  | "archivo_tamano"
  | "created_at"
>;

interface MaterialCardProps {
  material: Material;
}

function getMaterialIcon(tipo: Material["tipo"]) {
  switch (tipo) {
    case "PDF":
      return FileText;

    case "PPT":
      return Presentation;

    case "DOCX":
      return FileText;

    case "ZIP":
      return Archive;

    case "LINK":
      return ExternalLink;

    case "VIDEO":
      return Video;

    default:
      return File;
  }
}

function formatFileSize(size: number | null) {
  if (!size) {
    return null;
  }

  if (size < 1024) {
    return `${size} B`;
  }

  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} KB`;
  }

  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("es-PE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export default function MaterialCard({
  material,
}: MaterialCardProps) {
  const Icon = getMaterialIcon(material.tipo);

  const esEnlace =
    material.tipo === "LINK" ||
    material.tipo === "VIDEO";

  const fileSize = formatFileSize(
    material.archivo_tamano,
  );

  return (
    <article className="flex h-full flex-col rounded-2xl border border-blue-900/70 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-6 shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-300">
          <Icon size={24} />
        </div>

        <span className="rounded-full border border-blue-800 bg-blue-950 px-3 py-1 text-xs font-semibold text-blue-300">
          {material.tipo}
        </span>
      </div>

      <div className="mt-5 flex-1">
        <h2 className="line-clamp-2 text-xl font-bold text-white">
          {material.titulo}
        </h2>

        {material.descripcion && (
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-300">
            {material.descripcion}
          </p>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          {material.categoria && (
            <span className="rounded-lg bg-slate-800 px-3 py-1 text-xs text-slate-300">
              {material.categoria}
            </span>
          )}

          {fileSize && (
            <span className="rounded-lg bg-slate-800 px-3 py-1 text-xs text-slate-300">
              {fileSize}
            </span>
          )}
        </div>
      </div>

      <div className="mt-6 border-t border-slate-800 pt-5">
        <div className="mb-4 flex items-center justify-between gap-3 text-xs text-slate-400">
          <span>
            {material.archivo_nombre ??
              (esEnlace
                ? "Recurso externo"
                : "Archivo")}
          </span>

          <span>{formatDate(material.created_at)}</span>
        </div>

        {esEnlace && material.archivo_url ? (
          <a
            href={material.archivo_url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            <ExternalLink size={18} />
            Abrir recurso
          </a>
        ) : (
          <Link
            href={`/materiales/${material.id}`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            <FolderOpen size={18} />
            Ver material
          </Link>
        )}
      </div>
    </article>
  );
}