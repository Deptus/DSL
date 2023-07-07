import got from "got";
import { ParallelDownload, DownloadFile, nameMatch } from "src/core/Downloader";
import { gamePath } from "../ClientBase";
import fs, { PathLike } from "fs";
import path from "path";

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

export function ls(path: PathLike): string[] {
    const file: string[] = []
    fs.readdirSync(path).forEach((files) => {
        file.push(files);
    })
    return file;
}

export async function DownloadAsset(index: AssetIndex) {
    if(!fs.existsSync(`${gamePath}/assets`))
        fs.mkdirSync(`${gamePath}/assets`)
    if(!fs.existsSync(`${gamePath}/assets/indexes`))
        fs.mkdirSync(`${gamePath}/assets/indexes`);
    if(!fs.existsSync(`${gamePath}/assets/objects`))
        fs.mkdirSync(`${gamePath}/assets/objects`);
    if(!fs.existsSync(`${gamePath}/assets/virtual`))
        fs.mkdirSync(`${gamePath}/assets/virtual`);
    if(!fs.existsSync(`${gamePath}/assets/virtual/legacy`))
        fs.mkdirSync(`${gamePath}/assets/virtual/legacy`);
    //indexes
    await DownloadFile(index.url, `${gamePath}/assets/indexes`, 1, 0, "");
    //objects
    const objects = await got.get(index.url).json<AssetObject>();
    const objectsInfo = objects.objects
    let i = 0, j = 0;
    const DownloadList: Array<string>[] = [];
    const DownloadPath: Array<string>[] = [];
    const DownloadFormat: Array<string>[] = [];
    for(let object in objectsInfo) {
        const TDownloadList: Array<string> = [];
        const TDownloadPath: Array<string> = [];
        const TDownloadFormat: Array<string> = [];
        if(!fs.existsSync(`${gamePath}/assets/objects/${objectsInfo[object].hash.substring(0, 2)}`))
            fs.mkdirSync(`${gamePath}/assets/objects/${objectsInfo[object].hash.substring(0, 2)}`);
        let format: string | -1 = nameMatch(object, false);
        if(format === -1)
            throw new Error(`Unknown asset format: ${object}`);
        else
            TDownloadFormat.push(format);
        TDownloadList.push(`https://resources.download.minecraft.net/${objectsInfo[object].hash.substring(0, 2)}/${objectsInfo[object].hash}`);
        TDownloadPath.push(`${gamePath}/assets/objects/${objectsInfo[object].hash.substring(0, 2)}`);
        i++;
        if(i % 10 == 0)
            j++, DownloadList.push(TDownloadList), DownloadPath.push(TDownloadPath), DownloadFormat.push(TDownloadFormat);
    }
    for(let i = 0; i < DownloadList.length; i++) {
        await ParallelDownload(DownloadList[i], DownloadPath[i], 5, DownloadFormat[i]);
    }
    DownloadPath.forEach((pathArray) => {
        pathArray.forEach((hashpath) => {
            ls(hashpath).forEach((filepath) => {
                if(!fs.existsSync(`${gamePath}/assets/virtual/legacy/${filepath.substring(0, 2)}`))
                    fs.mkdirSync(`${gamePath}/assets/virtual/legacy/${filepath.substring(0, 2)}`);
                fs.copyFileSync(path.join(hashpath, filepath), `${gamePath}/assets/virtual/legacy/${filepath.substring(0, 2)}/${filepath}`)
            })
        })
    })
}

export async function DownloadVersionIndex(version: string, versionName: string) {
    const versionIndex = versionInfo.get(version);
    if(versionIndex === undefined)
        throw new Error(`Unknown version: ${version}`);
    const versionPath = `${gamePath}/versions/${versionName}`;
    if(!fs.existsSync(versionPath))
        fs.mkdirSync(versionPath);
    await DownloadFile(versionIndex.url, versionPath, 1, 0, "");
}