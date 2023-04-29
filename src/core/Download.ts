import request from "request"
import { sha512 } from "js-sha512"
import { resolve } from "path"
import fs from "fs"

namespace Download {
    class Minecraft {

    }
    interface ModrinthProject {
        slug: string,
        title: string,
        description: string,
        categories: string[],
        client_side: "required" | "optional",
        server_side: "required" | "optional",
        body: string,
        additional_categories: string[],
        issues_url?: string,
        source_url?: string,
        wiki_url?: string,
        discord_url?: string,
        donation_urls?: {
            id: string,
            platform: string,
            url: string
        }[]
        project_type: "mod" | "modpack"
        downloads: number,
        icon_url: string,
        color: number,
        id: string,
        team: string,
        body_url: null | string,
        moderator_message: null | string,
        published?: string,
        updated?: string,
        approved?: string,
        followers: number,
        status: "approved",
        license: {
            id: string, 
            name: string,
            url?: string
        },
        versions: string[],
        game_versions: string[],
        loaders: string[],
        gallery?: {
            url: string,
            featured: boolean,
            title: string,
            description: string,
            created?: string,
            ordering: number
        }
    }
    interface ModrinthModFiles {
        version?: string
        hashes: {
            sha512: string,
            sha1: string
        },
        url: string,
        filename: string,
        primary: boolean,
        size: number,
        file_type: string
    }
    class Modrinth {
        private base = "https://api.modrinth.com/v2"
        private search = this.base + "/search?limit=20&index=relevance"
        Version(versions: string[]): string {
            if (versions.length === 1)
                return "[\"version:" + versions[0] + "\"]"
            else if (versions.length <= 0)
                return "";
            else {
                let ret: string = "[["
                versions.forEach((value, index) => {
                    ret += "\"version:" + value
                    if (index < versions.length - 1)
                        ret += "\", "
                })
                ret += "]]";
                return ret;
            }
        }
        Catergory(catergories: string[]): string {
            if (catergories.length === 1)
                return "[\"catergory:" + catergories[0] + "\"]"
            else if (catergories.length <= 0)
                return "";
            else {
                let ret: string = "[["
                catergories.forEach((value, index) => {
                    ret += "\"catergory:" + value
                    if (index < catergories.length - 1)
                        ret += "\", "
                })
                ret += "]]";
                return ret;
            }
        }
        Search(versions: string[] | 0, catergories: string[] | 0): any {
            const versionE = versions !== 0
            const catergoryE = catergories !== 0
            let ret: string = this.search + (versionE || catergoryE ? "&facets=[" : "")
            if (versionE && catergoryE) {
                ret += this.Catergory(catergories) + "," + this.Version(versions) + "]"
                let retJSON;
                request.get({
                    url: ret
                }, (err, httpResponse, body) => {
                    retJSON = JSON.parse(body)
                    return;
                }); // return Request.get
                return retJSON
            }
            else if (versionE) {
                ret += this.Version(versions) + "]"
                let retJSON;
                request.get({
                    url: ret
                }, (err, httpResponse, body) => {
                    retJSON = JSON.parse(body)
                    return;
                }); // return Request.get
                return retJSON
            }
            else if (catergoryE) {
                ret += this.Catergory(catergories) + "]"
                let retJSON;
                request.get({
                    url: ret
                }, (err, httpResponse, body) => {
                    httpResponse.read
                    retJSON = JSON.parse(body)
                    return;
                }); // return Request.get
                return retJSON
            }
            else
                return -1;
        }
        Projects(id: string): ModrinthProject | -1 {
            const url = "https://api.modrinth.com/v2/project/" + id + "/version"
            let parsed: ModrinthProject | undefined;
            let ret = request.get({
                url: url
            }, (err, response, body) => {
                const retJSON: ModrinthProject = JSON.parse(body)
                parsed = retJSON
            });

            if(parsed !== undefined)
                return parsed;
            return -1
        }
        ModFiles(id: string) {
            let versions: any = this.Projects(id)
            if(versions === -1)
                return -1;
            versions = versions.game_versions;
            
        }
    }
    class CurseForge {

    }
    class Forge {

    }
    class Fabric {

    }
    class Quilt {

    }
    class OptiFine {

    }
    class Downloader {
        Hash(file: ArrayBuffer) {
            return sha512(file)
        } 
        async FileToArrayBuffer(file: File): Promise<ArrayBuffer> {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => {
                    resolve(reader.result as ArrayBuffer)
                }
                reader.onerror = reject
                reader.readAsArrayBuffer(file)
            })
        }
        async HashCheck(file: File, hash: string): Promise<boolean> {
            return new Promise(async (resolve, reject) => {
                if(this.Hash(await this.FileToArrayBuffer(file)) === hash)
                    resolve(true)
                else
                    resolve(false)
            })
        }
        async DownloadFile(url: string, hash: string, fileName: string, filePath: string): Promise<void> {
            const response = await fetch(url)
            const buffer = await response.arrayBuffer()

            if(!fs.existsSync(filePath))
                fs.mkdirSync(filePath)

            const view = new Uint8Array(buffer)
            fs.writeFileSync(`${filePath}/${fileName}`, view)
        }
        async MoveFile(fileName: string, from: string, to: string) {
            const buffer = fs.readFileSync(`${from}/${fileName}`)
            fs.rmSync(`${from}/${fileName}`)
            const view = new Uint8Array(buffer)
            fs.writeFileSync(`${to}/${fileName}`, view)
        }
    }
}
export default Download