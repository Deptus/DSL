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
        return UUIDs;
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

export type BlockedServersResponse = String;
export function BlockedServers() {
    try {
        const BlockedServers = got.get(`https://sessionserver.mojang.com/blockedservers`).text() as unknown as BlockedServersResponse;
        return BlockedServers;
    }
    catch (e) {
        return -1;
    }
}

export interface PlayerAttributesResponse {
    privileges?: {
        onlineChat?: {
            enabled?: boolean
        },
        multiplayerServer?: {
            enabled?: boolean
        },
        multiplayerRealms?: {
            enabled?: boolean
        },
        telemetry?: {
            enabled?: boolean
        }
    },
    profanityFilterPreferences?: {
        profanityFilterOn: boolean
    }
    banStatus?: {
        bannedScopes?: {
            MULTIPLAYER?: {
                banID?: string,
                expires?: number,
                reason?: string,
                reasonMessage?: string | null
            }
        }
    }
}
export function PlayerAttributes(access_token: string) {
    try {
        const Attributes = got.get(`https://api.minecraftservices.com/player/attributes`, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }).json() as unknown as PlayerAttributesResponse;
        return Attributes;
    }
    catch (e) {
        return -1;
    }
}

export interface PlayerBlocklistResponse {
    blockedProfiles?: String[]
}
export function PlayerBlocklist(access_token: string) {
    try {
        const Blocklist = got.get(`https://api.minecraftservices.com/privacy/blocklist`, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }).json() as unknown as PlayerBlocklistResponse;
        return Blocklist;
    }
    catch (e) {
        return -1;
    }
}

export interface PlayerCerticatesResponse {
    keyPair?: {
        privateKey?: string,
        publicKey?: string
    },
    publicKeySignature?: string,
    publicKeySignatureV2?: string,
    expiresAt?: string,
    refreshedAfter?: string
}
export function PlayerCertificates(access_token: string) {
    try {
        const Certificates = got.post(`https://api.minecraftservices.com/player/certificates`, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }).json() as unknown as PlayerCerticatesResponse;
        return Certificates;
    }
    catch (e) {
        return -1;
    }
}

export interface ProfileNameChangeInformationResponse {
    changedAt?: string,
    createdAt?: string,
    nameChangeAllowed?: boolean
}
export function ProfileNameChangeInformation(access_token: string) {
    try {
        const NameChangeInformation = got.get(`https://api.minecraftservices.com/minecraft/profile/namechange`, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }).json() as unknown as ProfileNameChangeInformationResponse;
        return NameChangeInformation;
    }
    catch (e) {
        return -1;
    }
}

export interface NameAvaliabilityResponse {
    status?: "DUPLICATE" | "AVAILABLE" | "INVALID",
}
export function NameAvaliability(access_token: string, name: string) {
    try {
        const Avaliability = got.get(`https://api.minecraftservices.com/minecraft/profile/name/${name}/available`, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }).json() as unknown as NameAvaliabilityResponse;
        return Avaliability;
    }
    catch (e) {
        return -1;
    }
}

export interface ChangeNameResponse {
    id?: string,
}
export function ChangeName(access_token: string, name: string) {
    try {
        const Change = got.put(`https://api.minecraftservices.com/minecraft/profile/name/${name}`, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }).json() as unknown as ChangeNameResponse;
        return Change;
    }
    catch (e) {
        return -1;
    }
}

export interface ChangeSkinByURLPayload {
    variant?: "classic" | "slim",
    url?: string,
}
export function ChangeSkinByURL(access_token: string, payload: ChangeSkinByURLPayload) {
    try {
         got.post(`https://api.minecraftservices.com/minecraft/profile/skins`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
                "Content-Type": "application/json"
            },
            json: payload
        })
        return 0;
    }
    catch (e) {
        return -1;
    }
}

export type UploadSkinPayload = Buffer;
export function UploadSkin(access_token: string, payload: UploadSkinPayload) {
    try {
        got.post(`https://api.minecraftservices.com/minecraft/profile/skins`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
            body: payload
        })
        return 0;
    }
    catch (e) {
        return -1;
    }
}

export function ResetSkin(access_token: string) {
    try {
        got.delete(`https://api.minecraftservices.com/minecraft/profile/skins/active`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            }
        })
        return 0;
    }
    catch (e) {
        return -1;
    }
} 

