import { app, BrowserWindow } from "electron";
import * as path from "path";
let mainWindow: Electron.BrowserWindow;

import * as fs from "fs";
fs.writeFileSync(path.resolve(__dirname, "bruh.txt"), "sup");

function createWindow() {
  mainWindow = new BrowserWindow({
    autoHideMenuBar: true,
    backgroundColor: "#121212",
    height: 800,
    webPreferences: {
      nodeIntegration: true,
    },
    width: 1000,
  });

  mainWindow.loadFile(path.resolve(__dirname, "index.html"));

  mainWindow.webContents.openDevTools();

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it"s common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
