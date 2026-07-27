import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// This project's custom typography utilities (app/globals.css) aren't part of
// tailwind-merge's built-in font-size scale, so by default it misclassifies
// them as text-color classes and silently evicts real color utilities like
// `text-white` whenever both are merged (e.g. Button's variant + size props).
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        "text-headline-lg",
        "text-headline-md",
        "text-body-lg",
        "text-body-md",
        "text-label-md",
        "text-label-sm",
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
