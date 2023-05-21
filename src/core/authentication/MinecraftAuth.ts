import axios from "axios";
import https from "https"
import got from "got";
import { XSTSAuthMS } from "./XSTSAuth";
import { CheckGame } from "./GameCheck";
import UserData from "./UserData";
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
        const ret = await got.post("https://api.minecraftservices.com/authentication/login_with_xbox", {
            json: formData
        }).json() as MCToken
        const CG = await CheckGame(ret)
        if(CG === -1)
            throw new TokenException("nogame"), resolve(null)
        else {
            UserData(uuid, "token", "mcauth", ret)
            const mcl = await got.get("https://api.minecraftservices.com/minecraft/profile", {
                headers: {
                    Authorization: ret.access_token
                }
            }).json()
            UserData(uuid, "token", "mclogin", ret)
        }
        resolve(ret)
    })
}