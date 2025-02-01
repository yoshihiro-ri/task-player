import path from "path";
import { app, ipcMain, BrowserWindow } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import { updateBoundsActive,updateBoundsInactive } from "./helpers/update-bounds";
const isProd = process.env.NODE_ENV === "production";
let mainWindow: BrowserWindow;

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

  const updateBounds = (status: "focus" | "blur") => {
    if (status === "focus") {
      updateBoundsActive(mainWindow);
    } else {
      updateBoundsInactive(mainWindow);
    }
  };

  // mainWindow.on("focus", () => {
  //   updateBounds(mainWindow, "focus");
  //   console.log("focus");
  // });

  mainWindow.on("blur", () => {
    updateBounds("blur");
    console.log("blur");
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

ipcMain.on("message", async (event, arg) => {
  event.reply("message", `${arg} World!`);
});

ipcMain.on('update-bounds', (_, status) => {
  if (status === 'active') {
    updateBoundsActive(mainWindow);
  } else {
    updateBoundsInactive(mainWindow);
  }
});

export { mainWindow };
