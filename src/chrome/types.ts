/**
 * Chrome traits composed into component class strings.
 * Default keeps motion / elevation / blur; lite omits them for smaller CSS.
 */
export type Chrome = {
  /** Fade + zoom open/close (dialogs, popovers, menus, tooltips) */
  overlayMotion: string;
  /** Side-slide helpers for floating content */
  overlaySlide: string;
  /** Sheet open/close + duration */
  sheetMotion: string;
  sheetSlideRight: string;
  sheetSlideLeft: string;
  sheetSlideTop: string;
  sheetSlideBottom: string;
  elevationSm: string;
  elevationMd: string;
  elevationLg: string;
  cardElevation: string;
  /** Backdrop blur / saturate on scrims */
  scrimBlur: string;
  scrimSaturate: string;
  controlTransition: string;
  buttonPress: string;
  skeletonMotion: string;
  spinnerMotion: string;
  copyMotion: string;
  /** Overlay fade only (dialog/sheet/drawer overlays) */
  overlayFade: string;
  /** Navigation menu panel / viewport / indicator motion */
  navContentMotion: string;
  navViewportMotion: string;
  navIndicatorMotion: string;
};
