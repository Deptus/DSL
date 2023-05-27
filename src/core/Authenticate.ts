import { MCAuth } from "auth/MinecraftAuth"
import { MCProfile } from "auth/MinecraftProfile"
import TokenException from "auth/TokenException"
import { getToken } from "auth/TokenFetch"
import { XSTSAuth } from "auth/XSTSAuth"
import { XboxLogin } from "auth/XboxLogin"
import { ipcRenderer } from "electron"

export async function AuthenticateMC() {
    const profileName = 'Profile'
    try {
        const OAuthCode = await ipcRenderer.invoke("mslogin")
        const OAuthToken = await getToken(OAuthCode, profileName)
        const XboxToken = await XboxLogin(profileName, OAuthToken)
        const XBL = XboxToken.Token;
        const XSTSToken = await XSTSAuth(profileName, XBL)
        const MinecraftToken = await MCAuth(profileName, XSTSToken)
        if(!MinecraftToken) 
            throw new TokenException("Failed to get Minecraft access token")
        MCProfile(profileName, MinecraftToken.access_token)
    }
    catch (e){
        throw e
    }
}

export async function RefreshToken() {
    
}