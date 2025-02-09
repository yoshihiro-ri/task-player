import path from "path";
import { app, ipcMain, BrowserWindow, contextBridge } from "electron";
import serve from "electron-serve";

import {
  updateTaskPlayersBoundsOpened,
  updateTaskPlayersBoundsClosed,
} from "./helpers/update-bounds";
import { screen } from "electron";
const isProd = process.env.NODE_ENV === "production";
let mainWindow: BrowserWindow;
let isTaskPlayerOpened = false;

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

(async () => {
  await app.whenReady();

  const { width: screenWidth, height: screenHeight } =
    screen.getPrimaryDisplay().workAreaSize;

  mainWindow = new BrowserWindow({
    width: 500,
    height: 80,
    x: (screenWidth - 500) / 2,
    y: screenHeight - 80,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    opacity: 0.9,
  });

  const updateBounds = (isOpened: boolean) => {
    isTaskPlayerOpened = isOpened;
    if (isTaskPlayerOpened) {
      updateTaskPlayersBoundsOpened(mainWindow);
    } else {
      updateTaskPlayersBoundsClosed(mainWindow);
    }
  };

  mainWindow.on("blur", () => {
    updateBounds(false);
    mainWindow.webContents.send("task-player-status-changed", false);
  });

  ipcMain.on("update-bounds", (_, status) => {
    updateBounds(status);
  });

  if (isProd) {
    await mainWindow.loadURL("app://./home");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
  }
})();

app.on("window-all-closed", () => {
  app.quit();
});

ipcMain.handle("get-status", () => {
  return isTaskPlayerOpened;
});

export { mainWindow, isTaskPlayerOpened };
