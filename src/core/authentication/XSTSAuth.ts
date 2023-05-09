import axios from "axios";
import { XboxLoginMS, XboxToken } from "./XboxLogin";
import { UserData } from "../Store";
export async function XSTSAuthMS(uuid: string) {
    return new Promise<XboxToken>(async (resolve) => {
        const Xbox = await XboxLoginMS(uuid)
        const XBL = Xbox.Token;
        let UHS;
        Xbox.DisplayClaims.xui.forEach((value, index, array) => {
            UHS = value.uhs
        })
        const formData = {
            "Properties": {
                "SandboxId": "RETAIL",
                "UserTokens": [
                    `${XBL}`
                ]
            },
            "RelyingParty": "rp://api.minecraftservices.com/",
            "TokenType": "JWT"
        }
        axios.post("https://xsts.auth.xboxlive.com/xsts/authorize", formData).then((body) => {
            const ret: XboxToken = body.data;
            UserData(uuid, "token", "xststoken", ret)
            resolve(ret)
        })
    })
}