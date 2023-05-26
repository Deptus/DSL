import got from "got";
import { MCToken } from "./MinecraftAuth";

export async function CheckGame(MCAuthToken: MCToken) {
    const MCtoken = MCAuthToken.access_token
    const JWT = await got("https://api.minecraftservices.com/entitlements/mcstore", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${MCtoken}`
        }
    }).json()
    if(JWT)
        return false
    return true
} 