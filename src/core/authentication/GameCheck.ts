import got from "got";
import { MCToken } from "./MinecraftAuth";

export async function CheckGame(MCAuthToken: MCToken) {
    const MCtoken = MCAuthToken.access_token
    const JWT = await got.get("https://api.minecraftservices.com/entitlements/mcstore", {
        headers: {
            Authorization: `Bearer ${MCtoken}`
        }
    }).json()
    if(JWT != null)
        return false
    return true
} 