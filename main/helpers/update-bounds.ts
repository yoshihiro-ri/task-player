import { screen,BrowserWindow } from "electron";

const animateWindowSize = async (
  window: BrowserWindow,
  startTop: number,
  endTop: number,
  startWindowHeight: number,
  endWindowHeight: number,
  duration: number = 60
) => {

  const steps = 30;
  const interval = duration / steps;

  for (let i = 0; i <= steps; i++) {
    const progress = i / steps;
    const currentTop = startTop - (startTop - endTop) * progress ;
    const currentWindowHeight = startWindowHeight - (startWindowHeight - endWindowHeight) * progress;

    window.setBounds({
      y: currentTop,
      height: Math.round(currentWindowHeight),
    });

    await new Promise((resolve) => setTimeout(resolve, interval));
  }
};

export const updateTaskPlayersBoundsOpened = async (window: BrowserWindow) => {
  if (window.getBounds().height === 500) return
  const { height:screenHeight } = screen.getPrimaryDisplay().workAreaSize;
  const startWindowHeight = 66
  const startTop = screenHeight  - 66
  const endWindowHeight = 500
  const endTop = screenHeight  - 500
  await animateWindowSize(window, startTop, endTop,startWindowHeight,endWindowHeight);
};

export const updateTaskPlayersBoundsClosed = async (window: BrowserWindow) => {
  if (window.getBounds().height === 66) return
  const { height:screenHeight } = screen.getPrimaryDisplay().workAreaSize;
  const startWindowHeight = 500
  const startTop = screenHeight  - startWindowHeight
  const endWindowHeight = 66
  const endTop = screenHeight  - 66
  await animateWindowSize(window, startTop, endTop,startWindowHeight,endWindowHeight);
};
