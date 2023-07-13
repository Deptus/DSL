import got from "got"
import { WriteUserData } from "./MCUserData";
import { ipcRenderer } from "electron";
interface MCProfile {
    id: string,
    name: string,
    skins: {
        id: string,
        state: string,
        url: string,
        variant: string,
        alias: string
    }[]
}
export async function MCProfile(profileName: string, token: string) {
    const Profile = await got.get("https://api.minecraftservices.com/minecraft/profile", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).json() as MCProfile
    WriteUserData(profileName, "token", "mcprofile", Profile)
    //ipcRenderer.invoke("config", "logged_in", true)
}