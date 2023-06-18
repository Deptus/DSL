import Entry from "./Entry";
import React from "react";
import "./css/main.css"
import { Button } from "dsl-rcs"
import { ipcRenderer } from "electron";

import { AuthenticateMC } from "src/core/Authenticate";

async function downloader() {
    ipcRenderer.invoke("downloadfile", "http://10.20.252.249/file/4/tWb-Qb32V0qS3MW4r2Pfm.png", "/home/encvar/Desktop", "test", 10)
}
export function MainPage() {
    return (
        <>
        <Entry/>
        <button className="w-48" onClick={downloader}> Download </button>
        </>
    )
}