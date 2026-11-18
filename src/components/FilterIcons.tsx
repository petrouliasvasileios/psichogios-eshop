/** Γραμμικά εικονίδια για τα φίλτρα. Χωρίς εξωτερικές βιβλιοθήκες. */

const s = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const Box = ({ children }: { children: React.ReactNode }) => (
  <svg viewBox="0 0 32 32" className="h-6 w-6 flex-none">{children}</svg>
);

export const IconCow = () => (
  <Box>
    <path d="M7 12c-2 0-3-1.5-3-3s2-2 3-1" {...s} />
    <path d="M25 12c2 0 3-1.5 3-3s-2-2-3-1" {...s} />
    <path d="M7 11h18v8a5 5 0 0 1-5 5h-8a5 5 0 0 1-5-5z" {...s} />
    <path d="M12 17h8v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2z" {...s} />
    <circle cx="14.5" cy="19.5" r=".9" fill="currentColor" />
    <circle cx="17.5" cy="19.5" r=".9" fill="currentColor" />
    <circle cx="12" cy="14" r="1" fill="currentColor" />
    <circle cx="20" cy="14" r="1" fill="currentColor" />
  </Box>
);

export const IconPig = () => (
  <Box>
    <path d="M8 12l-2-3 4 .5" {...s} />
    <path d="M24 12l2-3-4 .5" {...s} />
    <path d="M6 15a10 7 0 0 1 20 0 10 8 0 0 1-20 0z" {...s} />
    <ellipse cx="16" cy="18" rx="4" ry="3" {...s} />
    <circle cx="14.7" cy="18" r=".8" fill="currentColor" />
    <circle cx="17.3" cy="18" r=".8" fill="currentColor" />
    <circle cx="11" cy="13.5" r="1" fill="currentColor" />
    <circle cx="21" cy="13.5" r="1" fill="currentColor" />
  </Box>
);

export const IconChicken = () => (
  <Box>
    <path d="M14 5c1.5-1 3 0 2.5 1.5" {...s} />
    <path d="M11 9a6 6 0 0 1 11 3c0 3-2 4-2 7 0 2 1 3 1 5h-4l-1-3-1 3h-4c0-3-3-4-3-8a6 6 0 0 1 3-7z" {...s} />
    <circle cx="18" cy="11" r="1" fill="currentColor" />
    <path d="M21 13l3 1-3 1" {...s} />
  </Box>
);

export const IconSheep = () => (
  <Box>
    <path d="M11 13a4 4 0 1 1 2-6 4 4 0 0 1 6 0 4 4 0 1 1 2 6 4 4 0 0 1-10 0z" {...s} />
    <path d="M13 17h6v3a3 3 0 0 1-3 3 3 3 0 0 1-3-3z" {...s} />
    <circle cx="14.6" cy="19" r=".8" fill="currentColor" />
    <circle cx="17.4" cy="19" r=".8" fill="currentColor" />
    <path d="M11 24v3M21 24v3" {...s} />
  </Box>
);

export const IconSkewer = () => (
  <Box>
    <path d="M4 26L28 6" {...s} />
    <rect x="9" y="15" width="6" height="6" rx="1.5" transform="rotate(-40 12 18)" {...s} />
    <rect x="16" y="9" width="6" height="6" rx="1.5" transform="rotate(-40 19 12)" {...s} />
  </Box>
);

export const IconStar = () => (
  <Box>
    <path d="M16 5l3.4 6.9 7.6 1.1-5.5 5.4 1.3 7.6-6.8-3.6-6.8 3.6 1.3-7.6L5 13l7.6-1.1z" {...s} />
  </Box>
);

export const IconSnow = () => (
  <Box>
    <path d="M16 4v24M6 10l20 12M26 10L6 22" {...s} />
    <path d="M13 7l3 3 3-3M13 25l3-3 3 3" {...s} />
  </Box>
);

export const IconRabbit = () => (
  <Box>
    <path d="M12 13c-1-4-3-8-1-9s3 3 3.5 7" {...s} />
    <path d="M20 13c1-4 3-8 1-9s-3 3-3.5 7" {...s} />
    <path d="M10 19a6 6 0 0 1 12 0 5 5 0 0 1-5 5h-2a5 5 0 0 1-5-5z" {...s} />
    <circle cx="14" cy="19" r=".9" fill="currentColor" />
    <circle cx="18" cy="19" r=".9" fill="currentColor" />
  </Box>
);

export const IconTag = () => (
  <Box>
    <path d="M5 15V6h9l13 13-9 9z" {...s} />
    <circle cx="10" cy="11" r="1.6" {...s} />
  </Box>
);

export const IconEuro = () => (
  <Box>
    <circle cx="16" cy="16" r="11" {...s} />
    <path d="M21 11a7 7 0 1 0 0 10" {...s} />
    <path d="M9 14h8M9 18h8" {...s} />
  </Box>
);

export const ICONS: Record<string, () => React.JSX.Element> = {
  moschari: IconCow,
  choirino: IconPig,
  poulerika: IconChicken,
  oplifora: IconSheep,
  kouneli: IconRabbit,
  kreatoskevasmata: IconSkewer,
  premium: IconStar,
  katepsygmena: IconSnow,
  kreata: IconCow,
};
