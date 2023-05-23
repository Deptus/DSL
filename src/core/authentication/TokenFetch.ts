import request from "request"
import axios from "axios"
import qs from "qs"
import { Verifier } from "../../env"
import { WriteUserData } from "./UserData"

interface MicrosoftToken {
    access_token: string,
    token_type: string,
    expires_in: string,
    scope: string,
    refresh_token: string,
    id_token: string
}
function getTokenMS(code: string, uuid: string) {
    return new Promise<MicrosoftToken>((resolve) => {
        axios.post("https://login.microsoftonline.com/consumers/oauth2/v2.0/token", `client_id=391fbcc2-29ef-4c2f-82e1-2ed757b47f3c&scope=XboxLive.signin&code=${code}&redirect_uri=https%3A%2F%2Flogin.microsoftonline.com%2Fcommon%2Foauth2%2Fnativeclient&grant_type=authorization_code&code_verifier=${Verifier}`)
            .then(async (body) => {
                console.log(body.data)
                const Data: MicrosoftToken = body.data
                await WriteUserData(uuid, "token", "mstoken", Data)
                resolve(Data)
            })
    })
}
function getTokenMC(code: string) {

}
export { getTokenMS, getTokenMC };