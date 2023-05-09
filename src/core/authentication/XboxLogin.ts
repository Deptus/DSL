import { ipcRenderer } from "electron";
import { getTokenMS } from "./TokenFetch"
import axios from "axios";
import { UserData } from "../Store";
export interface XboxToken {
    IssueInstant: string,
    NotAfter: string,
    Token: string,
    DisplayClaims: {
        xui: [
            {
                uhs: string
            }
        ]
    }
}
export async function XboxLoginMS(uuid: string) {
    return new Promise<XboxToken>(async (resolve) =>{
        const Code = await ipcRenderer.invoke("mslogin")
        const Access = await getTokenMS(Code, uuid)
        const token = Access.access_token
        const formData = {
            "Properties": {
                "AuthMethod": "RPS",
                "SiteName": "user.auth.xboxlive.com",
                "RpsTicket": `d=${token}`
            },
            "RelyingParty": "http://auth.xboxlive.com",
            "TokenType": "JWT"
        }
        axios.post("https://user.auth.xboxlive.com/user/authenticate", formData).then((body) => {
            const ret: XboxToken = body.data
            UserData(uuid, "token", "xboxtoken", ret)
            resolve(ret)
        })
    })
} 