import axios from "axios";
import https from "https"
import got from "got";
import { XSTSAuthMS } from "./XSTSAuth";
import { UserData } from "../Store";
import { CheckGame } from "./GameCheck";
import TokenException from "./TokenException";
import Download from "../Download";
export interface MCToken {
    username: string, 
    roles: string[],
    access_token: string,
    token_type: string,
    expires_in: number
}
const opt = {
    hostname: "https://api.minecraftservices.com",
    port: 443,
    path: '/authentication/login_with_xbox/',
    method: 'POST'
}
export async function MCAuthMS(uuid: string = '0') {
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
            
        }
            Download.Downloader
        resolve(ret)
    })
}