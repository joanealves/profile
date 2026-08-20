/**
 * Novo Símbolo de Acessibilidade da ONU: figura humana estilizada de
 * braços e pernas abertos dentro de um círculo. Substitui o ícone
 * `Accessibility` do lucide-react, que representa uma figura em
 * movimento e não o símbolo oficial.
 */
export default function AccessibilityIcon({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="7.2" r="1.4" fill="currentColor" stroke="none" />
      <path d="M8 10.2h8" />
      <path d="M12 10.2v4.2" />
      <path d="M12 10.2 8.5 17" />
      <path d="M12 10.2 15.5 17" />
      <path d="M8 10.2 6 13.6" />
      <path d="M16 10.2 18 13.6" />
    </svg>
  );
}
