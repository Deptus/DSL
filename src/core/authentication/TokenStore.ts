import { CheckGame } from "./GameCheck";
import { MCAuthMS } from "./MinecraftAuth";
import { XSTSAuthMS } from "./XSTSAuth";
import { XboxLoginMS } from "./XboxLogin";
export const XboxLogin = XboxLoginMS()
export const XSTS = XSTSAuthMS()
export const MCAuth = MCAuthMS()
export const GCMS = CheckGame()
function StoreToken(json: any) {
    JSON.stringify(json)
    
}