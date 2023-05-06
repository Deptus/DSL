import got from "got"
import { GCMS } from "./TokenStore"
interface MCAccount {
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
export async function MCLoginMS() {
    const res = await GCMS
    if(res === -1)
        return -1;
    else
        console.log(await got.get("https://api.minecraftservices.com/minecraft/profile", {
            headers: {
                Authorization: res
            }
        }).json())
}