import { MicrosoftOAuthToken } from "./TokenFetch"
import { WriteUserData } from "./MCUserData";
import got from "got";

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
    const XboxAuthToken: XboxToken = await got.post("https://user.auth.xboxlive.com/user/authenticate", { 
        json: formData,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        }
    }).json()
    await WriteUserData(profileName, "token", "xboxtoken", XboxAuthToken)
    return (XboxAuthToken)
} 