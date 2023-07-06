import got from "got";
import { ParallelDownload, DownloadFile, nameMatch } from "src/core/Downloader";
import { gamePath } from "../ClientBase";
import fs from "fs";

export interface Version {
    id: string;
    type: "release" | "snapshot" | "old_beta" | "old_alpha";
    url: string;
    time: string;
    releaseTime: string;
    sha1: string;
    complianceLevel: number;
}

export interface VersionManifest {
    latest: {
        release: string;
        snapshot: string;
    };
    versions: Version[];
}

let versionInfo: Map<string, Version> = new Map<string, Version>();
let versionList: string[] = [];

try {
    const manifest = await got.get("https://launchermeta.mojang.com/mc/game/version_manifest.json").json<VersionManifest>();
    manifest.versions.forEach((version) => {
        versionInfo.set(version.id, version);
        versionList.push(version.id)
    });
} catch {
    throw new Error("Failed to load version manifest");
}

export { versionInfo, versionList };

export interface VersionMeta {
    
}

export function SemVerMinecraft(version1: string, version2: string) {
    versionList.forEach((version) => {
        if(version1 == version)
            return version1;
        if(version2 == version)
            return version2;
    })
    return -1;
}

export interface AssetIndex {
    id: string;
    sha1: string;
    size: number;
    totalSize: number;
    url: string;
}

export interface AssetObject {
    objects: {
        [key: string]: {
            hash: string;
            size: number;
        }
    }
}

export async function DownloadAsset(index: AssetIndex) {
    fs.mkdirSync(`${gamePath}/assets/indexes`);
    fs.mkdirSync(`${gamePath}/assets/objects`);
    fs.mkdirSync(`${gamePath}/assets/virtual/legacy`);
    //indexes
    DownloadFile(index.url, `${gamePath}/assets/indexes/${index.id}.json`, 1);
    //objects
    const objects = await got.get(index.url).json<AssetObject>();
    const objectsInfo = objects.objects
    let i = 0, j = 0;
    let DownloadList: string[][] = [];
    let DownloadPath: string[][] = [];
    let DownloadFormat: string[][] = [];
    for(let object in objectsInfo) {
        fs.mkdirSync(`${gamePath}/assets/objects/${objectsInfo[object].hash.substring(0, 2)}`);
        let format: string | -1 = nameMatch(object, false);
        if(format === -1)
            throw new Error(`Unknown asset format: ${object}`);
        else
            DownloadFormat[j].push(format);
        DownloadList[j].push(`https://resources.download.minecraft.net/${objectsInfo[object].hash.substring(0, 2)}/${objectsInfo[object].hash}`);
        DownloadPath[j].push(`${gamePath}/assets/objects/${objectsInfo[object].hash.substring(0, 2)}/${objectsInfo[object].hash}`);
        i++;
        if(i % 10 == 0)
            j++;
    }
    for(let i = 0; i < DownloadList.length; i++) {
        ParallelDownload(DownloadList[i], DownloadPath[i], 10);
    }
}