import { MicrosoftOAuthToken } from "./TokenFetch"
import { WriteUserData } from "./MCUserData";
import got from "got";
import { ipcRenderer } from "electron";

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
    const ExpireDate = XboxAuthToken.NotAfter
    {
        const Year = ExpireDate.substring(0, 4)
        const Month = ExpireDate.substring(5, 7)
        const Day = ExpireDate.substring(8, 10)
        const Date = { year: parseInt(Year), month: parseInt(Month), day: parseInt(Day) }
        ipcRenderer.invoke("config", "Xbox_expire_date", Date)
    }
    return (XboxAuthToken)
} 