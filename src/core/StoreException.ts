export default class StoreException extends Error {
    constructor(reason: string) {
        super(`DSL Store Error: ${reason}`)
    }
}