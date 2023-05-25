import { ipcRenderer } from "electron";
export async function WriteUserData(content: string, upath: string, filename: string, file: any) {
    await ipcRenderer.invoke("wuserdata", content, upath, filename, file);
}