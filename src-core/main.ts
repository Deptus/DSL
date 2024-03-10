import { app, BrowserWindow } from "electron";

export const PRODUCTION_MODE = process.env.NODE_ENV;
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true";
if(PRODUCTION_MODE === "development")
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

app.whenReady().then(() => {
    console.log("[DSL Main] App is ready. Starting the window...");
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        alwaysOnTop: true,
        frame: false,
        titleBarStyle: "hidden"
    });
    if (PRODUCTION_MODE !== "development")
        mainWindow.loadFile("dist/renderer/index.html");
    else
        mainWindow.loadURL("http://localhost:5173/");
    mainWindow.once("ready-to-show", () => { mainWindow.show() });
    // transparent: true,
    // const dynamicIsland = new BrowserWindow({
    //     useContentSize: true,
    //     parent: mainWindow,
    //     frame: false,
    //     resizable: false,
    //     x: screen.getPrimaryDisplay().workAreaSize.width / 2 - 150,
    //     y: 2,
    //     alwaysOnTop: true,
    //     skipTaskbar: true
    // });
    // if (PRODUCTION_MODE !== "development")
    //     dynamicIsland.loadFile("dist/renderer/island.html");
    // else
    //     dynamicIsland.loadURL("http://localhost:5173/dynamic_island/");
    // dynamicIsland.once("ready-to-show", () => { dynamicIsland.show() })
});