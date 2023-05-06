import { BrowserWindow, ipcMain } from "electron";
import { CodeChallenge } from "../../env";

{
  let LoginURL =
    "https://login.microsoftonline.com/consumers/oauth2/v2.0/authorize?" +
    "client_id=391fbcc2-29ef-4c2f-82e1-2ed757b47f3c" +
    "&response_type=code" +
    "&scope=XboxLive.signin" +
    "&prompt=login" +
    "&redirect_uri=https%3A%2F%2Flogin.microsoftonline.com%2Fcommon%2Foauth2%2Fnativeclient" +
    "&code_challenge=" + CodeChallenge +
    "&code_challenge_method=S256"
    
  ipcMain.handle("mslogin", () =>
    new Promise((resolve, reject) => {
      const win = new BrowserWindow({
        width: 1000,
        height: 800,
        autoHideMenuBar: true,
      });
      win.loadURL(LoginURL);
      
      win.webContents.on("will-redirect", (_ev, url) => {
        const prefix = "https://login.microsoftonline.com/common/oauth2/nativeclient?";
        if (url.startsWith(prefix + "code=")) {
          win.close();
          console.log(url.substring(prefix.length + 5))
          resolve(url.substring(prefix.length + 5));
        }
      });
      win.on("closed", () => resolve("null"));
    })
  );
}

{
  let LoginURL =
    "https://login.live.com/oauth20_authorize.srf" +
    "?client_id=00000000402b5328" +
    "&response_type=code" +
    "&prompt=login" +
    "&scope=service%3A%3Auser.auth.xboxlive.com%3A%3AMBI_SSL" +
    "&redirect_uri=https%3A%2F%2Flogin.live.com%2Foauth20_desktop.srf"

  ipcMain.handle("mclogin", () =>
    new Promise((resolve, reject) => {
      const win = new BrowserWindow({
        width: 1000,
        height: 800,
        autoHideMenuBar: true,
      });
      win.loadURL(LoginURL);
      win.webContents.on("will-redirect", (_ev, url) => {
        const prefix = "https://login.live.com/oauth20_authorize.srf?";
        if (url.startsWith(prefix + "code=")) {
          win.close();
          resolve(url.substring(prefix.length + 5));
        }
      });
      win.on("closed", () => resolve("null"));
    })
  );
}