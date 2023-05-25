import { ipcRenderer } from "electron";
import { MicrosoftOAuthToken } from "./TokenFetch"
import axios from "axios";
import { WriteUserData } from "./MCUserData";

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
export async function XboxLogin(profileName: string, token: MicrosoftOAuthToken) {
    return new Promise<XboxToken>(async (resolve) =>{
        const AccessToken = token.access_token
        const formData = {
            "Properties": {
                "AuthMethod": "RPS",
                "SiteName": "user.auth.xboxlive.com",
                "RpsTicket": `d=${AccessToken}`
            },
            "RelyingParty": "http://auth.xboxlive.com",
            "TokenType": "JWT"
        }
        axios.post("https://user.auth.xboxlive.com/user/authenticate", formData).then(async (body) => {
            const XboxAuthToken: XboxToken = body.data
            await WriteUserData(profileName, "token", "xboxtoken", XboxAuthToken)
            resolve(XboxAuthToken)
        })
    })
} 