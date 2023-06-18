import Entry from "./Entry";
import React from "react";
import "./css/main.css"
import { Button } from "dsl-rcs"
import { ipcRenderer } from "electron";

import { AuthenticateMC } from "src/core/Authenticate";

async function downloader() {
    ipcRenderer.invoke("downloadfile", "https://piston-meta.mojang.com/mc/game/version_manifest_v2.json", "C:/Users/GBC03/Desktop", "test.json", 4)
}
export function MainPage() {
    return (
        <>
        <Entry/>
        <button className="w-48" onClick={downloader}> Download </button>
        </>
    )
}