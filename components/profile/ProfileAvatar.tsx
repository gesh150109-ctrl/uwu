import { UserRound } from "lucide-react";

interface ProfileAvatarProps {
  nombres: string;
  apellidos?: string | null;
  fotoUrl?: string | null;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeStyles = {
  sm: {
    container: "h-10 w-10",
    text: "text-sm",
    icon: 20,
  },
  md: {
    container: "h-14 w-14",
    text: "text-lg",
    icon: 26,
  },
  lg: {
    container: "h-20 w-20",
    text: "text-2xl",
    icon: 36,
  },
  xl: {
    container: "h-28 w-28",
    text: "text-3xl",
    icon: 48,
  },
} as const;

function getInitials(
  nombres: string,
  apellidos?: string | null,
) {
  const firstNameInitial =
    nombres.trim().charAt(0).toUpperCase();

  const lastNameInitial = apellidos
    ?.trim()
    .charAt(0)
    .toUpperCase();

  return `${firstNameInitial}${lastNameInitial ?? ""}`;
}

export default function ProfileAvatar({
  nombres,
  apellidos,
  fotoUrl,
  size = "lg",
  className = "",
}: ProfileAvatarProps) {
  const styles = sizeStyles[size];
  const initials = getInitials(nombres, apellidos);
  const accessibleName =
    `${nombres} ${apellidos ?? ""}`.trim();

  return (
    <div
      className={`
        relative shrink-0 overflow-hidden rounded-full
        border-2 border-cyan-500/30
        bg-gradient-to-br from-cyan-500/20 to-blue-500/20
        ${styles.container}
        ${className}
      `}
      aria-label={`Foto de perfil de ${accessibleName}`}
    >
      {fotoUrl ? (
        // Se usa img porque la URL puede proceder de Supabase Storage
        // o de otro dominio no declarado en next.config.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={fotoUrl}
          alt={`Foto de perfil de ${accessibleName}`}
          className="h-full w-full object-cover"
          referrerPolicy="no-referrer"
        />
      ) : (
        <div
          className={`
            flex h-full w-full items-center justify-center
            font-bold text-cyan-300
            ${styles.text}
          `}
        >
          {initials || (
            <UserRound
              size={styles.icon}
              aria-hidden="true"
            />
          )}
        </div>
      )}
    </div>
  );
}