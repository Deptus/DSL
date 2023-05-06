import { MCAuth } from "./TokenStore"
import got from "got";

export async function CheckGame() {
    const MC = await MCAuth;
    const token = MC.access_token
    const temp = await got.get("https://api.minecraftservices.com/entitlements/mcstore", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).json()
    return temp ? token : -1 
} 