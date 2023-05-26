import { WriteUserData } from "./MCUserData";
import { XboxToken } from "./XboxLogin";
import got from "got";

export async function XSTSAuth(profileName: string, xbl: string) {
    const formData = {
        "Properties": {
            "SandboxId": "RETAIL",
            "UserTokens": [
                `${xbl}`
            ]
        },
        "RelyingParty": "rp://api.minecraftservices.com/",
        "TokenType": "JWT"
    }
    const Token = await got.post("https://xsts.auth.xboxlive.com/xsts/authorize", { json:formData }).json() as XboxToken
    await WriteUserData(profileName, "token", "xststoken", Token)
    return Token
}