import { type SVGProps } from 'react';

const Logo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="50" cy="50" r="45" className="stroke-purple-600" strokeWidth="2" />
    <path
      d="M30 50C30 38.954 38.954 30 50 30C61.046 30 70 38.954 70 50C70 61.046 61.046 70 50 70"
      className="stroke-purple-600"
      strokeWidth="4"
      strokeLinecap="round"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 50 50"
        to="360 50 50"
        dur="2s"
        repeatCount="indefinite"
      />
    </path>
    <circle cx="50" cy="50" r="8" className="fill-purple-600">
      <animate
        attributeName="r"
        values="8;10;8"
        dur="1.5s"
        repeatCount="indefinite"
      />
    </circle>
  </svg>
);

export default Logo;