import { ipcRenderer } from "electron";
export default async function UserData(uuid: string, upath: string, filename: string, file: any) {
    await ipcRenderer.invoke("userdata", uuid, upath, filename, file);
}