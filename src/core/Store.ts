import { app, ipcMain, ipcRenderer } from "electron"
import fs from "fs"
import path from "path"
import StoreException from "./StoreException"
const storePath: string = "/home/encvar/Desktop"
ipcMain.handle("wuserdata", (_event, uuid: string, upath: string, filename: string, file: any) => new Promise((resolve, reject) =>{
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
    profile_amount: number,
    path: string,
    last_login: Date
}
//Add configure
function Configure(opt: "profiles" | "path" | "last_login", value: number | string | Date) {
    switch(opt) {
        case "profiles":
            if(!(typeof value === "number"))
                throw new StoreException(`Profile Amount must be a number but read a ${typeof value}`)
            
    }
}