import fs from "fs"
import { app } from "electron"
const path = app.getPath("appData")
export function UserData(uuid: string, upath: string, filename: string, file: any): void {
    const userPath = `${path}/${uuid}`
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