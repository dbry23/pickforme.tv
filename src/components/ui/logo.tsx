interface LogoProps {
  className?: string;
  size?: number;
}

export default function Logo({ className = '', size = 32 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* TV Screen */}
      <rect
        x="2"
        y="4"
        width="28"
        height="20"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />

      {/* TV Stand */}
      <path
        d="M12 24 L12 28 M20 24 L20 28 M9 28 L23 28"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Shuffle/Dice dots inside TV */}
      <circle cx="10" cy="10" r="1.5" fill="currentColor" />
      <circle cx="10" cy="18" r="1.5" fill="currentColor" />
      <circle cx="16" cy="14" r="1.5" fill="currentColor" />
      <circle cx="22" cy="10" r="1.5" fill="currentColor" />
      <circle cx="22" cy="18" r="1.5" fill="currentColor" />
    </svg>
  );
}
