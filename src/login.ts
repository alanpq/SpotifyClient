// tslint:disable: object-literal-sort-keys
import { Console } from "console";
import { app, BrowserView, BrowserWindow, remote } from "electron";
import { getToken } from "./auth";
import { auth, getUser } from "./net/user";

export let loginWindow: BrowserWindow;
export let view: BrowserView;

export let accessToken: string;

const con = new Console(process.stdout, process.stderr);

async function createWindow(cb: any) { // TODO: get rid of this forsaken callback
  loginWindow = new remote.BrowserWindow({
    autoHideMenuBar: true,
    parent: remote.getCurrentWindow(),
    modal: true,
    width: 600,
    height: 800,
  });

  view = new remote.BrowserView();
  loginWindow.setBrowserView(view);
  view.setBounds({ x: 0, y: 0, width: 600, height: 800 });
  view.webContents.loadURL("https://accounts.spotify.com/en/login");

  loginWindow.on("closed", async () => {
    view.webContents.executeJavaScript("document.cookie").then((v) => {
      loginWindow = null;
      // con.log(v);
      getToken(v)
        .then(async () => cb(await getUser(auth.accessToken)));
    });
  });
}

export { createWindow };
