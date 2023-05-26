import got from "got";
import { CheckGame } from "./GameCheck";
import { WriteUserData } from "./MCUserData";
import TokenException from "./TokenException";
import { XboxToken } from "./XboxLogin";
export interface MCToken {
    username: string, 
    roles: string[],
    access_token: string,
    token_type: string,
    expires_in: number
}
export async function MCAuth(profileName: string, XSTSToken: XboxToken) {
    return new Promise<MCToken | null>(async (resolve, reject) => {
        const formData = {
            "identityToken": `XBL3.0 x=${XSTSToken.DisplayClaims.xui[0].uhs};${XSTSToken.Token}`
        }
        const MinecraftToken = await got.post("https://api.minecraftservices.com/authentication/login_with_xbox", {
            json: formData
        }).json() as MCToken
        console.log(MinecraftToken)
        const GameCheck = await CheckGame(MinecraftToken)
        if(!GameCheck)
            reject(new TokenException("The account has no game"))
        await WriteUserData(profileName, "token", "mcauth", MinecraftToken)
        resolve(MinecraftToken)
    })
}