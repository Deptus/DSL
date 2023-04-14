import { BrowserWindow, ipcMain } from "electron";
import { CodeChallenge } from "./env";

let LoginURL =
    "https://login.microsoftonline.com/consumers/oauth2/v2.0/authorize?" +
    "client_id=391fbcc2-29ef-4c2f-82e1-2ed757b47f3c" +
    "&response_type=code" +
    "&prompt=login" + 
    "&redirect_uri=https%3A%2F%2Flogin.microsoftonline.com%2Fcommon%2Foauth2%2Fnativeclient" +
    "&code_challenge=" + CodeChallenge +
    "&code_challenge_method=S256" +
    "&scope=XboxLive.signin"

ipcMain.handle("mslogin", () =>
    new Promise((resolve) => {
      const win = new BrowserWindow({
        width: 1000,
        height: 800,
        autoHideMenuBar: true,
        frame: false
      });
      win.loadURL(LoginURL);
      win.webContents.on("will-redirect", (_ev, url) => {
        const prefix = "https://login.microsoftonline.com/common/oauth2/nativeclient?";
        if (url.startsWith(prefix + "code=")) {
          win.close();
          resolve(url.substring(prefix.length));
        }
      });
      win.on("closed", () => resolve("null"));
    })
);
export default LoginURL