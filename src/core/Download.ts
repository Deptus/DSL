import { Request } from "request"
class Minecraft {

}
class Modrinth {
    base = "https://api.modrinth.com/v2"
    search = this.base + "/search?limit=20&index=relevance"
    Version(versions: string[]): string {
        if(versions.length === 1)
            return "[\"version:"  + versions[0] + "\"]"
        else if(versions.length <= 0)
            return "";
        else {
            let ret: string = "[["
            versions.forEach((value, index) => {
                ret += "\"version:" + value
                if(index < versions.length - 1)
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
    GetRequest(versions : string[] | 0, catergories : string[] | 0) {
        const versionE = versions !== 0
        const catergoryE = catergories !== 0
        let ret: string = this.search + (versionE || catergoryE ? "&facets=[" : "")
        if(versionE && catergoryE) {
            ret += this.Catergory(catergories) + "," + this.Version(versions) + "]"
            return ; // return Request.get
        }
        else if(versionE) {
            
        }
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
export { Minecraft, Modrinth, CurseForge, Forge, Fabric, Quilt, OptiFine }