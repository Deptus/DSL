import fs from "fs";
import { app, ipcMain } from "electron";
import { platform } from "os";
const storePath = app.getPath("userData");
const gamePath = `${storePath}/${platform() === "win32" ? ".minecraft" : "minecraft"}`;
if(!fs.existsSync(gamePath))
    fs.mkdirSync(gamePath);
export { gamePath };