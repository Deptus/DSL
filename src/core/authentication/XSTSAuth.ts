import axios from "axios";
import { WriteUserData } from "./MCUserData";
import { XboxToken } from "./XboxLogin";

export async function XSTSAuth(profileName: string, xbl: string) {
    console.log(xbl)
    return new Promise<XboxToken>(async (resolve) => {
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
        axios.post("https://xsts.auth.xboxlive.com/xsts/authorize", formData).then((body) => {
            const Token: XboxToken = body.data;
            WriteUserData(profileName, "token", "xststoken", Token)
            resolve(Token)
        })
    })
}