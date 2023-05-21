export default class TokenException extends Error {
    constructor(reason: string) {
        super(reason)
    }
}