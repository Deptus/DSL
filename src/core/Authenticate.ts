import { MCAuth } from "auth/MinecraftAuth"
import { MCProfile } from "auth/MinecraftProfile"
import TokenException from "auth/TokenException"
import { getToken } from "auth/TokenFetch"
import { XSTSAuth } from "auth/XSTSAuth"
import { XboxLogin } from "auth/XboxLogin"
import { ipcRenderer } from "electron"

async function authLogger(message: string) {
    ipcRenderer.invoke("log", "auth", message);
}

export async function AuthenticateMC() {
    const profileName = 'Profile'
    try {
        const OAuthCode = await ipcRenderer.invoke("mslogin")
        authLogger(OAuthCode)
        const OAuthToken = await getToken(OAuthCode, profileName)
        authLogger(OAuthToken.access_token)
        const XboxToken = await XboxLogin(profileName, OAuthToken)
        authLogger(XboxToken.Token)
        const XBL = XboxToken.Token;
        console.log(XBL)
        const XSTSToken = await XSTSAuth(profileName, XBL)
        authLogger(XSTSToken.Token)
        const MinecraftToken = await MCAuth(profileName, XSTSToken)
        if(!MinecraftToken) 
            throw new TokenException("Failed to get Minecraft access token")
        authLogger(MinecraftToken.access_token)
        MCProfile(profileName, MinecraftToken.access_token)
    }
    catch (e){
        throw e
    }
}