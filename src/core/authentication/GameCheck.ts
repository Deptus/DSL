import got from "got";
import { MCToken } from "./MinecraftAuth";

export async function CheckGame(MCAuth: MCToken) {
    const MC = MCAuth;
    const token = MC.access_token
    const temp = await got.get("https://api.minecraftservices.com/entitlements/mcstore", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).json()
    return temp ? token : -1 
} 