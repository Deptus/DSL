import got from "got"
import TokenException from "./TokenException";
import { WriteUserData } from "./MCUserData";
interface MCProfile {
    id: string,
    name: string,
    skins: {
        id: string,
        state: "ACTIVE",
        url: string,
        variant: "CLASSIC" | "THIN",
        alias: string
    }[]
}
export async function MCProfile(profileName: string,token: string) {
    const Profile = await got.get("https://api.minecraftservices.com/minecraft/profile", {
        headers: {
            Authorization: `${token}`
        }
    }).json()
    WriteUserData(profileName, "token", "mcprofile", Profile)
}