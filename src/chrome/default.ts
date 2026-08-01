import type { Chrome } from "./types";

/** Full chrome — motion, elevation, blur (default `@qpub/qui` entry). */
export const chrome: Chrome = {
  overlayMotion:
    "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
  overlayFade:
    "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
  overlaySlide:
    "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  sheetMotion:
    "data-[state=open]:animate-in data-[state=closed]:animate-out transition ease-in-out data-[state=closed]:duration-100 data-[state=open]:duration-200",
  sheetSlideRight:
    "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
  sheetSlideLeft:
    "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",
  sheetSlideTop:
    "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
  sheetSlideBottom:
    "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
  elevationSm: "shadow-sm",
  elevationMd: "shadow-md",
  elevationLg: "shadow-lg",
  cardElevation: "shadow-sm",
  scrimBlur: "backdrop-blur-sm",
  scrimSaturate: "backdrop-saturate-150",
  controlTransition: "transition-all",
  buttonPress:
    "motion-safe:active:scale-[0.98] motion-safe:data-[state=open]:scale-[0.98]",
  skeletonMotion: "animate-pulse",
  spinnerMotion: "animate-spin",
  copyMotion: "transition-all duration-200",
  navContentMotion: [
    "data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out",
    "data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out",
    "data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52",
    "data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52",
    "group-data-[viewport=false]/navigation-menu:data-[state=open]:animate-in",
    "group-data-[viewport=false]/navigation-menu:data-[state=closed]:animate-out",
    "group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-95",
    "group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-95",
    "group-data-[viewport=false]/navigation-menu:data-[state=open]:fade-in-0",
    "group-data-[viewport=false]/navigation-menu:data-[state=closed]:fade-out-0",
    "group-data-[viewport=false]/navigation-menu:duration-200",
  ].join(" "),
  navViewportMotion:
    "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90",
  navIndicatorMotion:
    "data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
};
