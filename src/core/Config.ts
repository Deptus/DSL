import { app, ipcMain } from "electron"
import fs from "fs"
import StoreException from "./StoreException"

const storePath: string = app.getPath("userData")
interface Date {
    year: number,
    month: number,
    day: number,
}
interface Config {
    profile_amount: number,
    logged_in: boolean,
    last_login?: Date,
    Xbox_expire_date?: Date,
}
//Add configure
export function Configure(opt: string, value: any) {
    const configFile = JSON.parse(fs.readFileSync(`${storePath}/config.json`, { encoding: "utf-8" })) as Config
    switch (opt) {
        case "profile_amount":
            configFile.profile_amount = value
            break
        case "last_login":
            configFile.last_login = value
            break
        case "XSTS_expire_date":
            configFile.Xbox_expire_date = value
            break
        case "logged_in":
            configFile.logged_in = value
            break
        default:
            throw new StoreException("Invalid configure option")
    }
    fs.rmSync(`${storePath}/config.json`);
    fs.writeFileSync(`${storePath}/config.json`, JSON.stringify(configFile))
}
ipcMain.handle("config", (event, opt, value) => Configure(opt, value))