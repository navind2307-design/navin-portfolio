type CursorIconProps = {
  filterId: string;
  fill: string;
};

/**
 * Figma-style pointer used across the hero and contact sections.
 * Each instance needs its own filter id so the SVGs stay independent.
 */
export function CursorIcon({ filterId, fill }: CursorIconProps) {
  return (
    <svg
      preserveAspectRatio="none"
      width="15"
      height="17"
      viewBox="0 0 21.7849 23.5392"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g filter={`url(#${filterId})`}>
        <path
          d="M6.47489 17.1216L4.00903 2.58942C3.93912 2.17746 4.3754 1.86658 4.74197 2.06714L17.5232 9.06009C17.9445 9.29057 17.8302 9.92457 17.355 9.99355L11.0105 10.9145C10.8527 10.9374 10.7153 11.0342 10.6406 11.1752L7.40964 17.272C7.18605 17.694 6.55477 17.5923 6.47489 17.1216Z"
          fill={fill}
        />
        <path
          d="M3.02285 2.75718C2.81967 1.55981 4.04211 0.646628 5.11855 1.13804L5.22207 1.1898L18.0033 8.18296C19.2669 8.87447 18.924 10.7758 17.4984 10.9828L11.4047 11.8666L8.29335 17.7406C7.6225 19.0061 5.7283 18.7007 5.48867 17.2884L3.02285 2.75718Z"
          stroke="white"
          strokeWidth="2"
        />
      </g>
      <defs>
        <filter
          id={filterId}
          x="0"
          y="0"
          width="21.7849"
          height="23.5392"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="1" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}

export function LogoSmall() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="29"
      height="12"
      viewBox="0 0 29 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        className="js-header-logo-dot"
        d="M1.02129 5.67224C0.340431 5.03947 0 4.25284 0 3.31104C0 2.36923 0.340431 1.58261 1.02129 0.948495C1.70075 0.317057 2.53776 0 3.52811 0C4.51845 0 5.39204 0.317057 6.05743 0.948495C6.72282 1.58127 7.05481 2.36923 7.05481 3.3097C7.05481 4.25017 6.72141 5.03947 6.05743 5.6709C5.39204 6.30368 4.54799 6.6194 3.52811 6.6194C2.50822 6.6194 1.70216 6.30368 1.02129 5.6709V5.67224Z"
        fill="currentColor"
      />
      <path
        className="js-header-logo-bar"
        d="M7.69531 7.27637H28.8626V12.0001H7.69531V7.27637Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function LogoFull() {
  return (
    <svg
      width="150"
      height="24"
      viewBox="0 0 150 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Navin D"
    >
      <text
        x="0"
        y="21"
        fill="currentColor"
        fontFamily="Inter Display, Inter, Arial, sans-serif"
        fontSize="26"
        fontWeight="700"
        letterSpacing="-0.5"
      >
        NAVIN D
      </text>
    </svg>
  );
}
