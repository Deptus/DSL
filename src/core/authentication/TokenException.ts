export default class TokenException extends Error {
    constructor(reason: string) {
        super(`DSL Fetch MS Token Error: ${reason}`)
    }
}