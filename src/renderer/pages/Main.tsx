import Entry from "./Entry";
import React from "react";
import "./css/main.css"
import { ipcRenderer } from "electron";

import { AuthenticateMC } from "src/core/Authenticate";

async function downloader() {
    const desktop = ipcRenderer.invoke("getpath", 'desktop')
    ipcRenderer.invoke("downloadfile", "https://piston-data.mojang.com/v1/objects/0c3ec587af28e5a785c0b4a7b8a30f9a8f78f838/client.jar", `C:/Users/Bamboo/Desktop`, "test", 10)
}
export function MainPage() {
    return (
        <>
        <Entry/>
        <button className="w-48" onClick={downloader}> Download </button>
        </>
    )
}