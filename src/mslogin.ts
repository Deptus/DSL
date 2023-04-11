import { BrowserWindow, ipcMain } from "electron";

ipcMain.handle("mslogin", () =>
    new Promise((resolve) => {
      const win = new BrowserWindow({
        width: 1000,
        height: 800,
        autoHideMenuBar: true,
        frame: false
      });
      win.loadURL("https://login.live.com/oauth20_authorize.srf?client_id=00000000402b5328&response_type=code&prompt=login&scope=service%3A%3Auser.auth.xboxlive.com%3A%3AMBI_SSL&redirect_uri=https%3A%2F%2Flogin.live.com%2Foauth20_desktop.srf");
      win.webContents.on("will-redirect", (_ev, url) => {
        const prefix = "https://login.live.com/oauth20_desktop.srf?";
        if (url.startsWith(prefix + "code=")) {
          win.close();
          resolve(url.substring(prefix.length));
        }
      });
      win.on("closed", () => resolve("null"));
    })
);