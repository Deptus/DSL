import request from "request"
import { sha512 } from "js-sha512"
namespace Download {
    class Minecraft {

    }
    class Modrinth {
        base = "https://api.modrinth.com/v2"
        search = this.base + "/search?limit=20&index=relevance"
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
                    retJSON = JSON.parse(body)
                    return;
                }); // return Request.get
                return retJSON
            }
            else
                return -1;
        }
        Projects(id: string) {
            const url = "https://api.modrinth.com/v2/project/" + id + "/version"
            let retJSON;
            let ret = request.get({
                url: url
            }, (err, response, body) => {
                retJSON = JSON.parse(body)
            });
            return retJSON;
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
        Hash(file: any) {
            return sha512(file)
        }
    }
}
export default Download