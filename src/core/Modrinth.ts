import * as MR from '@xmcl/modrinth'

type SearchIndex = "relevance" | "downloads" | "follows" | "newest" | "updated"

class Modrinth {
    //Search
    async Search(query: string, facets: string, index: SearchIndex = "relevance") {
        const client = new MR.ModrinthV2Client()
        const limit = 10;
        return await client.searchProjects({ query: query, facets: facets, index: index, limit: limit })
    }
    //Get Project
    async GetProject(id: string) {
        const client = new MR.ModrinthV2Client()
        return await client.getProject(id)
    }
    
}