import { ipcMain } from "electron";
import * as Auth from "./authentication";

ipcMain.handle("authentication", async (_e) => {
    const MSCode = await Auth.MSLogin();
    const MSOAuthToken = await Auth.getMSOAuthToken(MSCode);
    const XboxAuthToken = await Auth.XboxAuth(MSOAuthToken);
    const XSTSToken = await Auth.XSTSAuth(XboxAuthToken.DisplayClaims.xui[0].uhs);
    const MCAuthToken = await Auth.MCAuth(XSTSToken);
    const GameAvailable = await Auth.checkGameAvailability(MCAuthToken);
    if(!GameAvailable) {
        
    }
})