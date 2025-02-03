import { screen,BrowserWindow } from "electron";
import { start } from "repl";

const animateWindowSize = async (
  window: BrowserWindow,
  startTop: number,
  endTop: number,
  startWindowHeight: number,
  endWindowHeight: number,
  duration: number = 100
) => {

  const steps = 30;
  const interval = duration / steps;

  for (let i = 0; i <= steps; i++) {
    const progress = i / steps;
    const currentTop = startTop - (startTop - endTop) * progress +38;
    const currentWindowHeight = startWindowHeight - (startWindowHeight - endWindowHeight) * progress;

    window.setBounds({
      y: currentTop,
      height: Math.round(currentWindowHeight),
    });

    await new Promise((resolve) => setTimeout(resolve, interval));
  }
};

// export const updateTaskPlayersBoundsOpened = async (window: BrowserWindow) => {
//   const { width, height } = screen.getPrimaryDisplay().workAreaSize;
//   await animateWindowSize(window, height, 500);
// };

export const updateTaskPlayersBoundsClosed = async (window: BrowserWindow) => {
  const { height:screenHeight } = screen.getPrimaryDisplay().workAreaSize;
  const startWindowHeight = 500
  const startTop = screenHeight  - startWindowHeight
  const endWindowHeight = 80
  const endTop = screenHeight  - 80
  await animateWindowSize(window, startTop, endTop,startWindowHeight,endWindowHeight);
};
