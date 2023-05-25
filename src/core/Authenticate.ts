import { MCAuth } from "auth/MinecraftAuth"
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
        let UHS;
        XboxToken.DisplayClaims.xui.forEach((value) => {
            UHS = value.uhs
        })
        const XSTSToken = await XSTSAuth(profileName, XBL)
        const MinecraftToken = await MCAuth(profileName, XSTSToken)
    }
    catch (e){
        throw e
    }
}