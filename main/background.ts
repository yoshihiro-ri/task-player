import path from "path";
import { app, ipcMain, BrowserWindow, contextBridge } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import {
  updateTaskPlayersBoundsOpened,
  updateTaskPlayersBoundsClosed,
} from "./helpers/update-bounds";
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

  mainWindow = createWindow("main", {
    fullscreen: false,
    height: 200,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  const updateBounds = (isOpened: boolean) => {
    console.log("isOpened", isOpened);
    isTaskPlayerOpened = isOpened;
    console.log(isTaskPlayerOpened);
    if (isTaskPlayerOpened) {
      updateTaskPlayersBoundsOpened(mainWindow);
    } else {
      updateTaskPlayersBoundsClosed(mainWindow);
    }
  };

  mainWindow.on("blur", () => {
    updateBounds(false);
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
