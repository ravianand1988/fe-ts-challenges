import type { ReactNode } from "react";

/**
 * Small stroke icons drawn for this illustration (the project has no icon set).
 * They inherit `currentColor` and are decorative: always paired with text.
 */
const PATHS: Record<string, ReactNode> = {
  code: <path d="M5 4 1 8l4 4M11 4l4 4-4 4" />,
  issue: (
    <>
      <circle cx="8" cy="8" r="6.5" />
      <circle cx="8" cy="8" r="1" />
    </>
  ),
  pr: (
    <>
      <circle cx="4" cy="3.5" r="1.5" />
      <circle cx="4" cy="12.5" r="1.5" />
      <circle cx="12" cy="12.5" r="1.5" />
      <path d="M4 5v6M12 11V6.5A2 2 0 0 0 10 4.5H7.5M9 3 7.5 4.5 9 6" />
    </>
  ),
  discussion: <path d="M2 3h9v6H6l-3 2.5V9H2zM11 6h3v6h-1v2l-2.5-2H7" />,
  play: (
    <>
      <circle cx="8" cy="8" r="6.5" />
      <path d="M6.5 5.5v5l4-2.5z" />
    </>
  ),
  table: <path d="M2 2.5h12v11H2zM2 6h12M6 6v7.5" />,
  shield: (
    <path d="M8 1.5 13.5 3.5V8c0 3-2.5 5.3-5.5 6.5C5 13.3 2.5 11 2.5 8V3.5z" />
  ),
  graph: <path d="M1.5 14.5h13M3 11l3.5-4 3 2.5 4-5.5" />,
  branch: (
    <>
      <circle cx="4.5" cy="3.5" r="1.5" />
      <circle cx="4.5" cy="12.5" r="1.5" />
      <circle cx="11.5" cy="4.5" r="1.5" />
      <path d="M4.5 5v6M11.5 6c0 3-7 2.5-7 5" />
    </>
  ),
  tag: (
    <>
      <path d="M1.5 2.5v5l7 7 5-5-7-7z" />
      <circle cx="4.75" cy="5.75" r="1" />
    </>
  ),
  folder: <path d="M1.5 3h4.5l1.5 1.5h7v8.5h-13z" />,
  file: <path d="M3.5 1.5h6l3 3v10h-9zM9.5 1.5v3h3" />,
  clock: (
    <>
      <circle cx="8" cy="8" r="6.5" />
      <path d="M8 4.5V8l2.5 1.5" />
    </>
  ),
  search: (
    <>
      <circle cx="7" cy="7" r="4.5" />
      <path d="m10.5 10.5 4 4" />
    </>
  ),
  link: (
    <path d="M7 9a3 3 0 0 0 4.2 0l2.3-2.3a3 3 0 0 0-4.2-4.2L8.5 3.3M9 7a3 3 0 0 0-4.2 0L2.5 9.3a3 3 0 0 0 4.2 4.2l.8-.8" />
  ),
  heart: (
    <path d="M8 13.5S1.5 9.6 1.5 5.5A3 3 0 0 1 8 4a3 3 0 0 1 6.5 1.5c0 4.1-6.5 8-6.5 8z" />
  ),
  bell: <path d="M4 11V7a4 4 0 0 1 8 0v4l1.5 1.5h-11zM6.5 14h3" />,
  fork: (
    <>
      <circle cx="4" cy="3.5" r="1.5" />
      <circle cx="12" cy="3.5" r="1.5" />
      <circle cx="8" cy="12.5" r="1.5" />
      <path d="M4 5v1.5A1.5 1.5 0 0 0 5.5 8h5A1.5 1.5 0 0 0 12 6.5V5M8 8v3" />
    </>
  ),
  eye: (
    <>
      <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" />
      <circle cx="8" cy="8" r="2" />
    </>
  ),
  book: (
    <path d="M2 2.5h4.5A1.5 1.5 0 0 1 8 4v10a1.5 1.5 0 0 0-1.5-1.5H2zM14 2.5H9.5A1.5 1.5 0 0 0 8 4v10a1.5 1.5 0 0 1 1.5-1.5H14z" />
  ),
  scale: (
    <path d="M8 1.5v13M4 14.5h8M2 4h12M4 4 1.5 9.5a2.5 2.5 0 0 0 5 0zM12 4 9.5 9.5a2.5 2.5 0 0 0 5 0z" />
  ),
  people: (
    <>
      <circle cx="5.5" cy="5" r="2.5" />
      <path d="M1 14c0-2.5 2-4.5 4.5-4.5S10 11.5 10 14M10.5 2.8a2.5 2.5 0 0 1 0 4.4M12 9.8c1.8.6 3 2.2 3 4.2" />
    </>
  ),
  pulse: <path d="M1 8h3l2-5 4 10 2-5h3" />,
  note: <path d="M2 2.5h12v11H2zM4.5 6h7M4.5 9h4" />,
};

export type TIconName = keyof typeof PATHS;

export const Icon = ({
  name,
  size = 16,
}: {
  name: TIconName;
  size?: number;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.3}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    {PATHS[name]}
  </svg>
);
