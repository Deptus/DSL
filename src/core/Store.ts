import { app, ipcMain, ipcRenderer } from "electron"
import fs from "fs"
import StoreException from "./StoreException"
export const storePath: string = app.getPath("userData")
ipcMain.handle("wuserdata", (_event, content: string, upath: string, filename: string, file: any) => new Promise((resolve, reject) =>{
    const userPath = `${storePath}/${content}`
    if(!fs.existsSync(userPath))
        fs.mkdirSync(userPath)
    if(!fs.existsSync(`${userPath}/${upath}`))
        fs.mkdirSync(`${userPath}/${upath}`)
    if(fs.existsSync(`${userPath}/${upath}/${filename}.json`))
        fs.rmSync(`${userPath}/${upath}/${filename}.json`)
    const FileString = JSON.stringify(file);
    fs.writeFileSync(`${userPath}/${upath}/${filename}.json`, FileString)
    resolve(1)
}))
const configPath = `${storePath}/config.json`
if(!fs.existsSync(configPath)) {
    const configFile = {
        profile_amount: 0,
        logged_in: false,
    }
    fs.writeFileSync(configPath, JSON.stringify(configFile))
}