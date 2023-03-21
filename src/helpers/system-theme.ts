export const isSystemDark =
  typeof window === "undefined"
    ? false
    : window.matchMedia("(prefers-color-scheme: dark)").matches;
