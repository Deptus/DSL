import { ipcRenderer } from "electron";
export async function WriteUserData(uuid: string, upath: string, filename: string, file: any) {
    await ipcRenderer.invoke("wuserdata", uuid, upath, filename, file);
}