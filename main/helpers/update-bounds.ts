import { screen, BrowserWindow } from "electron";

const activeWindowHeight = 500;
const inactiveWindowHeight = 80;

export const updateBoundsActive = (
  window: BrowserWindow,
) => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

    window.setBounds({
      x: 0,
      y: height - activeWindowHeight + 38,
      width: width,
      height: activeWindowHeight,
    });

};

export const updateBoundsInactive = (window: BrowserWindow) => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  window.setBounds({
    x: 0,
    y: height - inactiveWindowHeight + 38,
    width: width,
    height: inactiveWindowHeight,
  });
};
