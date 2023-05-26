import fs from "fs";
import { app, ipcMain } from "electron";
const storePath = app.getPath("userData");
const gamePath = `${storePath}/.minecraft`;
if(!fs.existsSync(gamePath))
    fs.mkdirSync(gamePath);