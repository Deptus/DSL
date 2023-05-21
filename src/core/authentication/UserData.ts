import { ipcRenderer } from "electron";
export default function UserData(uuid: string, upath: string, filename: string, file: any) {
    ipcRenderer.invoke("userdata", uuid, upath, filename, file);
}