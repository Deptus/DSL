import got from "got";
import { BrowserWindow } from "electron";

export interface MCToken {
    username: string,
    roles: string[],
    access_token: string,
    token_type: string,
    expires_in: number
}

export interface MCProfile {
    id: string,
    name: string,
    skins: {
        id: string,
        state: string,
        url: string,
        variant: string,
        alias: string
    }[]
}

export interface XboxToken {
    IssueInstant: string,
    NotAfter: string,
    Token: string,
    DisplayClaims: {
        xui: [
            { uhs: string }
        ]
    }
}

export interface MicrosoftOAuthToken {
    access_token: string,
    token_type: string,
    expires_in: string,
    scope: string,
    refresh_token: string,
    id_token: string
}

export type XSTSToken = XboxToken;

export function MSLogin(): Promise<string> {
    const CodeChallenge = "YTY5cYxBDXghJ_o_5kgViokCjYriWxKWKCh04okcpuw";
    const loginURL =
        "https://login.microsoftonline.com/consumers/oauth2/v2.0/authorize?" +
        "client_id=391fbcc2-29ef-4c2f-82e1-2ed757b47f3c" +
        "&response_type=code" +
        "&scope=XboxLive.signin" +
        "&prompt=login" +
        "&redirect_uri=https%3A%2F%2Flogin.microsoftonline.com%2Fcommon%2Foauth2%2Fnativeclient" +
        "&code_challenge=" + CodeChallenge +
        "&code_challenge_method=S256";
    
    return new Promise<string>((resolve) => {
        const authWindow = new BrowserWindow({
            width: 1000,
            height: 800,
            autoHideMenuBar: true,
        });
        authWindow.loadURL(loginURL);

        authWindow.webContents.on("will-redirect", (_ev, url) => {
            const prefix = "https://login.microsoftonline.com/common/oauth2/nativeclient?";
            if (url.startsWith(prefix + "code=")) {
                authWindow.close();
                console.log(url.substring(prefix.length + 5))
                resolve(url.substring(prefix.length + 5));
            }
        });
        authWindow.on("closed", () => resolve("null"));
    });
}

export async function getMSOAuthToken(code: string) {
    const Verifier = "3CD_JkJ6y-vwe3J8r05fEr-qsu3xIug4qfV7N3o5lZI";
    const MSOAuthToken: MicrosoftOAuthToken = await got.post({
        url: "https://login.microsoftonline.com/consumers/oauth2/v2.0/token?" + 
            `client_id=391fbcc2-29ef-4c2f-82e1-2ed757b47f3c&scope=XboxLive.signin&code=${code}&redirect_uri=https%3A%2F%2Flogin.microsoftonline.com%2Fcommon%2Foauth2%2Fnativeclient&grant_type=authorization_code&code_verifier=${Verifier}`,
    }).json<MicrosoftOAuthToken>();
    return MSOAuthToken;
}

export async function checkGameAvailability(MCAuthToken: MCToken) {
    const MCtoken = MCAuthToken.access_token
    const JWT = await got("https://api.minecraftservices.com/entitlements/mcstore", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${MCtoken}`
        }
    }).json();
    if (!JWT)
        return false;
    return true;
};

export async function MCAuth(XSTSToken: XboxToken) {
    const formData = {
        "identityToken": `XBL3.0 x=${XSTSToken.DisplayClaims.xui[0].uhs};${XSTSToken.Token}`
    };
    const MinecraftToken = await got.post("https://api.minecraftservices.com/authentication/login_with_xbox", {
        json: formData
    }).json() as MCToken;
    const GameCheck = await checkGameAvailability(MinecraftToken);
    if (!GameCheck)
        throw new Error("The account has no game")
    return (MinecraftToken);
}

export async function MCProfile(token: string) {
    const Profile = await got.get("https://api.minecraftservices.com/minecraft/profile", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).json() as MCProfile;
    return Profile;
}

export async function XboxAuth(token: MicrosoftOAuthToken) {
    const accessToken = token.access_token;
    const formData = {
        "Properties": {
            "AuthMethod": "RPS",
            "SiteName": "user.auth.xboxlive.com",
            "RpsTicket": `d=${accessToken}`
        },
        "RelyingParty": "http://auth.xboxlive.com",
        "TokenType": "JWT"
    };
    const XboxAuthToken: XboxToken = await got.post("https://user.auth.xboxlive.com/user/authenticate", {
        json: formData,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        }
    }).json();
    //const expireDate = XboxAuthToken.NotAfter;
    // {
    //     const Year = expireDate.substring(0, 4)
    //     const Month = expireDate.substring(5, 7)
    //     const Day = expireDate.substring(8, 10)
    //     const Date = { year: parseInt(Year), month: parseInt(Month), day: parseInt(Day) }
    // }
    return XboxAuthToken;
} 

export async function XSTSAuth(xbl: string) {
    const formData = {
        "Properties": {
            "SandboxId": "RETAIL",
            "UserTokens": [
                `${xbl}`
            ]
        },
        "RelyingParty": "rp://api.minecraftservices.com/",
        "TokenType": "JWT"
    };
    const XSTSToken = await got.post("https://xsts.auth.xboxlive.com/xsts/authorize", { json: formData }).json() as XboxToken;
    return XSTSToken;
}