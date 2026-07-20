"use client";

import { Trash2 } from "lucide-react";

interface DeleteSessionButtonProps {
  action: () => Promise<void>;
}

export default function DeleteSessionButton({
  action,
}: DeleteSessionButtonProps) {
  return (
    <form
      action={action}
      onSubmit={(event) => {
        const confirmed = window.confirm(
          "¿Estás seguro de eliminar esta sesión? Esta acción no se puede deshacer.",
        );

        if (!confirmed) {
          event.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm font-semibold text-red-400 transition hover:bg-red-500/20"
      >
        <Trash2 size={17} />
        Eliminar
      </button>
    </form>
  );
}