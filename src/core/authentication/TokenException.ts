export default class TokenException {
    constructor(reason: string) {
        return `token.exception.${reason}`
    }
}