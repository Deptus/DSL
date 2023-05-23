import axios from "axios";
import https from "https"
import got from "got";
import { XSTSAuthMS } from "./XSTSAuth";
import { CheckGame } from "./GameCheck";
import { WriteUserData } from "./UserData";
import TokenException from "./TokenException";
import Download from "../Download";
export interface MCToken {
    username: string, 
    roles: string[],
    access_token: string,
    token_type: string,
    expires_in: number
}
export async function MCAuthMS() {
    let uuid: string = 'Profile0'
    return new Promise<MCToken | null>(async (resolve) => {
        const XSTSToken = await XSTSAuthMS(uuid)
        const formData = {
            "identityToken": `XBL3.0 x=${XSTSToken.DisplayClaims.xui[0].uhs};${XSTSToken.Token}`
        }
        const MinecraftToken = await got.post("https://api.minecraftservices.com/authentication/login_with_xbox", {
            json: formData
        }).json() as MCToken
        const CG = await CheckGame(MinecraftToken)
        if(CG === -1)
            throw new TokenException("The account has no game"), resolve(null)
        else {
            await WriteUserData(uuid, "token", "mcauth", MinecraftToken)
            const mcl = await got.get("https://api.minecraftservices.com/minecraft/profile", {
                headers: {
                    "Content-Type": "application.json",
                    Authorization: `Bearer ${MinecraftToken.access_token}`
                }
            }).json()
            await WriteUserData(uuid, "token", "mclogin", mcl)
        }
        resolve(MinecraftToken)
    })
}