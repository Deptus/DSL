import { app, ipcMain, ipcRenderer } from "electron"
import fs from "fs"
import path from "path"
const storePath: string = "/home/encvar/Desktop"
ipcMain.handle("userdata", (_event, uuid: string, upath: string, filename: string, file: any) => new Promise((resolve, reject) =>{
    const userPath = `${storePath}/${uuid}`
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
interface Config {
    profiles: number,
    path: string,
    last_login: Date
}

