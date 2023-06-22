import Entry from "./Entry";
import React from "react";
import "./css/main.css"
import { Button } from "dsl-rcs"
import { ipcRenderer } from "electron";

import { AuthenticateMC } from "src/core/Authenticate";

async function downloader() {
    const desktop = ipcRenderer.invoke("getpath", 'desktop')
    ipcRenderer.invoke("downloadfile", "https://github.com/electron/fiddle/releases/download/v0.32.9/electron-fiddle-0.32.9-win32-x64-setup.exe", `${desktop}`, "test", 10)
}
export function MainPage() {
    return (
        <>
        <Entry/>
        <button className="w-48" onClick={downloader}> Download </button>
        </>
    )
}