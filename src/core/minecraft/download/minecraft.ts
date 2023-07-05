import got from "got";
import { ParallelDownload, DownloadFile } from "src/core/Downloader";

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
let versionList = []

try {
    const manifest = await got.get("https://launchermeta.mojang.com/mc/game/version_manifest.json").json<VersionManifest>();
    manifest.versions.forEach((version) => {
        versionInfo.set(version.id, version);
        versionList.push(version.id)
    });
} catch {
    throw new Error("Failed to load version manifest");
}


