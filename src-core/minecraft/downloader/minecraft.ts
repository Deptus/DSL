import { Worker } from "worker_threads";
import { MinecraftDownloadMirror, VersionManifest, VersionIndex, Version, AssetsObject, MinecraftLibraryIndex } from "../version";
import got from "got";
import { MainLogger } from "../../logger";
import fs from "fs";
import { resolve } from "path";
import { platform, version } from "os";

export class MinecraftDownloadInstance {
    mirrors: MinecraftDownloadMirror[] = [{ name: "Minecraft Official", replacement: (origin) => { return origin; }}];
    selected_mirror_index: number = 0;
    threads: number = 10;
    gamePath: string;

    constructor(mirrors: MinecraftDownloadMirror[], gamePath: string, threads?: number) {
        this.mirrors.push(...mirrors);
        if(threads)
            this.threads = threads;
        this.gamePath = gamePath;
    }

    selectMirror(name: string) {
        this.mirrors.forEach((v, i) => {
            if(v.name === name) {
                this.selected_mirror_index = i;
                return;
            }
        })
    }

    async start(mcversion: string, name: string, progress?: (downloaded: number, total: number, percentage: number) => void) {
        //Loading mirrors
        const mirror = this.mirrors[this.selected_mirror_index];
        //Searching for the target version
        const versionManifest = await got.get(mirror.replacement("https://launchermeta.mojang.com/mc/game/version_manifest.json")).json<VersionManifest>();
        let versionIndex: VersionIndex | undefined;
        versionManifest.versions.forEach((v) => {
            if(v.id === mcversion) {
                versionIndex = v;
                return;
            }
        })
        if(!versionIndex) {
            MainLogger.error("Failed to get version " + version + ".");
            throw new Error("Failed to get version " + version + ".");
        }
        const versions = await got.get(mirror.replacement(versionIndex.url)).json<Version>();
        const tinyFiles = [];
        const hugeFiles = [];
        const assetsObjects = await got.get(mirror.replacement(versions.assetIndex.url)).json<AssetsObject>();
        let totalSize = 0;

        if(!fs.existsSync(this.gamePath))
            fs.mkdirSync(this.gamePath);
        if(!fs.existsSync(resolve(this.gamePath, "assets")))
            fs.mkdirSync(resolve(this.gamePath, "assets"));
        if(!fs.existsSync(resolve(this.gamePath, "assets", "objects")))
            fs.mkdirSync(resolve(this.gamePath, "assets", "objects"));
        if(!fs.existsSync(resolve(this.gamePath, "assets", "virtual")))
            fs.mkdirSync(resolve(this.gamePath, "assets", "virtual"));
        if(!fs.existsSync(resolve(this.gamePath, "assets", "virtual", "legacy")))
            fs.mkdirSync(resolve(this.gamePath, "assets", "virtual", "legacy"));
        
        for(let object in assetsObjects.objects) {
            if (!fs.existsSync(resolve(this.gamePath, "assets", "objects", assetsObjects.objects[object].hash.substring(0, 2))))
                fs.mkdirSync(resolve(this.gamePath, "assets", "objects"));
            if (!fs.existsSync(resolve(this.gamePath, "assets", "virtual", "legacy", assetsObjects.objects[object].hash.substring(0, 2))))
                fs.mkdirSync(resolve(this.gamePath, "assets", "virtual", "legacy", assetsObjects.objects[object].hash.substring(0, 2)));
            if(assetsObjects.objects[object].size >= 20000000) {
                hugeFiles.push({
                    url: mirror.replacement(`https://resources.download.minecraft.net/${assetsObjects.objects[object].hash.substring(0, 2)}/${assetsObjects.objects[object].hash}`),
                    path: resolve(this.gamePath, "assets", "objects", assetsObjects.objects[object].hash.substring(0, 2))
                });
                hugeFiles.push({
                    url: mirror.replacement(`https://resources.download.minecraft.net/${assetsObjects.objects[object].hash.substring(0, 2)}/${assetsObjects.objects[object].hash}`),
                    path: resolve(this.gamePath, "assets", "virtual", "legacy", assetsObjects.objects[object].hash.substring(0, 2))
                });
            } else {
                tinyFiles.push({
                    url: mirror.replacement(`https://resources.download.minecraft.net/${assetsObjects.objects[object].hash.substring(0, 2)}/${assetsObjects.objects[object].hash}`),
                    path: resolve(this.gamePath, "assets", "objects", assetsObjects.objects[object].hash.substring(0, 2))
                });
                tinyFiles.push({
                    url: mirror.replacement(`https://resources.download.minecraft.net/${assetsObjects.objects[object].hash.substring(0, 2)}/${assetsObjects.objects[object].hash}`),
                    path: resolve(this.gamePath, "assets", "virtual", "legacy", assetsObjects.objects[object].hash.substring(0, 2))
                });
            }    
            totalSize += assetsObjects.objects[object].size;
        }

        const checkLib = (lib: MinecraftLibraryIndex): boolean => {
            if(!lib.rules)
                return true;
            const os = platform();
            const systemVersion = version();
            return false;
        }

        for(let library in versions.libraries) {
            const lib = versions.libraries[library];
            //Check if the library is native
            if(lib.natives) {
                
            } else {

            }
        }

        if (this.threads <= hugeFiles.length)
            this.threads = hugeFiles.length + 1;
        
    }
}