import { cn } from "@/lib/utils";

export const Logo = ({ className }: { className?: string }) => {
  return (
    <svg
      className={cn("size-7 w-7", className)}
      viewBox="0 0 300 300"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <style>
        {`
          .st0 { fill: #22B1E7; }
          .st1 { fill: #095291; }
          .st2 { fill: #189AD5; }
          .st3 { fill: #1481C5; }
        `}
      </style>
      <g id="Layer_3">
        <path
          className="st0"
          d="M282.7,8.2l-33.4,57.7H118v22.2l-62.3,35.5V63.3c0,0,5.9-47,58.2-55.1H282.7z"
        />
      </g>
      <g id="Layer_4">
        <polygon className="st1" points="55.7,123.6 118,123.6 118,88.1" />
      </g>
      <g id="Layer_5">
        <polygon
          className="st2"
          points="55.7,123.6 221.4,123.6 176.2,175.9 1.3,175.9"
        />
      </g>
      <g id="Layer_7">
        <polyline
          className="st3"
          points="56.2,175.9 56.3,292.4 118.1,254.1 118,175.9"
        />
      </g>
      <g id="Layer_6">
        <polygon className="st1" points="118,175.9 118,192.1 56.2,175.9" />
      </g>
    </svg>
  );
};

export const LogoStroke = ({ className }: { className?: string }) => {
  return (
    <svg
      className={cn("size-7 w-7", className)}
      viewBox="0 0 300 300"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <g id="Layer_3">
        <path d="M282.7,8.2l-33.4,57.7H118v22.2l-62.3,35.5V63.3c0,0,5.9-47,58.2-55.1H282.7z" />
      </g>
      <g id="Layer_4">
        <polygon points="55.7,123.6 118,123.6 118,88.1" />
      </g>
      <g id="Layer_5">
        <polygon points="55.7,123.6 221.4,123.6 176.2,175.9 1.3,175.9" />
      </g>
      <g id="Layer_7">
        <polyline points="56.2,175.9 56.3,292.4 118.1,254.1 118,175.9" />
      </g>
      <g id="Layer_6">
        <polygon points="118,175.9 118,192.1 56.2,175.9" />
      </g>
    </svg>
  );
};
