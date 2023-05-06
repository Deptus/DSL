import axios from "axios";
import { XSTS } from "./TokenStore";
import https from "https"
import got from "got";
interface MCToken {
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
export async function MCAuthMS() {
    return new Promise<MCToken>(async (resolve) => {
        const XSTSToken = await XSTS
        const formData = {
            "identityToken": `XBL3.0 x=${XSTSToken.DisplayClaims.xui[0].uhs};${XSTSToken.Token}`
        }
        const ret = await got.post("https://api.minecraftservices.com/authentication/login_with_xbox", {
            json: formData
        }).json() as MCToken
        resolve(ret)
    })
}