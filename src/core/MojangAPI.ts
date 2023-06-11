import { UUID } from "crypto";
import got from "got"

interface UsernameToUUIDResponse {
    name?: string,
    id?: string
}
export function UsernameToUUID(uuid: string) {
    try {
        const UUID = (got.get(`https://api.mojang.com/users/profiles/minecraft/${uuid}`).json() as UsernameToUUIDResponse).id;
        return UUID;
    }
    catch (e) {
        return -1;
    }
}

type UsernamesPayload = String[];
type UsernamesToUUIDResponse = UsernameToUUIDResponse[];
export function UsernamesToUUID(usernames: UsernamesPayload) {
    try {
        const UUIDs = got.post(`https://api.mojang.com/profiles/minecraft`, {
            json: usernames
        }).json() as unknown as UsernamesToUUIDResponse;
        return UUIDs;UUIDToProfile
    }
    catch (e) {
        return -1;
    }
}

interface UUIDToProfileResponse {
    id?: string,
    name?: string,
    properties?: {
        name?: string,
        value?: string
    }[]
}
export interface TextureDecoded {
    timestamp?: number,
    profileId?: string,
    profileName?: string,
    textures?: {
        SKIN?: {
            url?: string,
            metadata?: {
                model?: string
            }
        },
        CAPE?: {
            url?: string
        }
    }
}
export function UUIDToProfile(uuid: string) {
    const base64decoder = (base64: string) => {
        const buff = Buffer.from(base64, 'base64');
        const decoded = buff.toString('ascii');
        return decoded;
    }
    try {
        const Profile = got.get(`https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`).json() as unknown as UUIDToProfileResponse;
        if(Profile.properties && Profile.properties[0] && Profile.properties[0].value)
            return JSON.parse(base64decoder(Profile.properties[0].value)) as TextureDecoded;
        return -1;
    }
    catch (e) {
        return -1;
    }
}

