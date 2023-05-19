import { app, ipcRenderer } from "electron"
import fs from "fs"
import path from "path"
const storePath: string = "/home/encvar/Desktop"
export function UserData(uuid: string, upath: string, filename: string, file: any): void {
    const userPath = `${storePath}/${uuid}`
    if(!fs.existsSync(userPath))
        fs.mkdirSync(userPath)
    if(!fs.existsSync(`${userPath}/${upath}`))
        fs.mkdirSync(`${userPath}/${upath}`)
    if(fs.existsSync(`${userPath}/${upath}/${filename}.json`))
        fs.rmSync(`${userPath}/${upath}/${filename}.json`)
    const FileString = JSON.stringify(file);
    fs.writeFileSync(`${userPath}/${upath}/${filename}.json`, FileString)
    return;
}
interface Config {
    profiles: number
}
export function Configure(): any {
    
}
