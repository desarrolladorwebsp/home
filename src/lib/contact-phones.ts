const label = "+56 9 9183 1319";

export const contactPhone = {
  label,
  href: `tel:${label.replace(/\s/g, "")}`,
} as const;
