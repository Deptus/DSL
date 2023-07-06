import fs from "fs";
import { app, ipcMain } from "electron";
const storePath = app.getPath("userData");
const gamePath = `${storePath}/.minecraft`;
export function initClient() {
    if(!fs.existsSync(gamePath))
        fs.mkdirSync(gamePath);
}
export { gamePath };