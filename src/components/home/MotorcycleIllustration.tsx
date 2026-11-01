export function MotorcycleIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 640 420"
      className={className}
      role="img"
      aria-label="Technical drawing of a sport motorcycle"
    >
      <defs>
        <linearGradient id="body" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#191F24" />
          <stop offset="100%" stopColor="#0B0D0F" />
        </linearGradient>
      </defs>
      <rect width="640" height="420" fill="url(#body)" />
      <g opacity="0.35" stroke="#293138" strokeWidth="1">
        {Array.from({ length: 12 }).map((_, index) => (
          <line key={`v-${index}`} x1={index * 56} y1="0" x2={index * 56} y2="420" />
        ))}
        {Array.from({ length: 8 }).map((_, index) => (
          <line key={`h-${index}`} x1="0" y1={index * 56} x2="640" y2={index * 56} />
        ))}
      </g>
      <g fill="none" stroke="#C8FF00" strokeWidth="2.2" strokeLinecap="round">
        <circle cx="168" cy="286" r="58" />
        <circle cx="168" cy="286" r="22" />
        <circle cx="456" cy="286" r="58" />
        <circle cx="456" cy="286" r="22" />
        <path d="M168 286 248 168h92l36 48 80 8 42 62" />
        <path d="M248 168 228 128h74l28 40" />
        <path d="M270 128c18-28 64-36 102-10" />
        <path d="M340 216 318 268h86" />
        <path d="M248 168l-54 72" />
      </g>
      <g fill="none" stroke="#929BA3" strokeWidth="1.4">
        <path d="M214 214h48M300 188v36M412 230 456 286" />
        <circle cx="312" cy="204" r="6" />
      </g>
      <text
        x="48"
        y="56"
        fill="#C8FF00"
        fontSize="12"
        letterSpacing="3"
        fontFamily="monospace"
      >
        SPEC / BD-DESK
      </text>
    </svg>
  );
}
