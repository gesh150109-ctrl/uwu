interface HeaderProps {
  nombre: string;
}

export default function Header({
  nombre,
}: HeaderProps) {
  return (
    <div>
      <h1 className="text-4xl font-bold text-white">
        ¡Hola, {nombre}!
      </h1>

      <p className="mt-2 text-slate-400">
        Bienvenido nuevamente a ByteCode Platform.
      </p>
    </div>
  );
}