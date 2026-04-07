interface HelmetIconProps {
  size?: number;
  className?: string;
}

export default function HelmetIcon({ size = 28, className = "" }: HelmetIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Helmet dome */}
      <path
        d="M6.5 19 C6.5 12 9.5 7 14 7 C18.5 7 21.5 12 21.5 19 Z"
        fill="#e8622a"
      />
      {/* Helmet brim */}
      <path
        d="M4 19 L24 19 L24 21 Q14 23.5 4 21 Z"
        fill="#c94f1c"
      />
      {/* Shine highlight */}
      <path
        d="M9.5 13 Q11.5 10.5 14 9.5"
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
