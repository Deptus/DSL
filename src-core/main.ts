import { app, BrowserWindow } from "electron";

const PRODUCTION_MODE = process.env.NODE_ENV;
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true";
if(PRODUCTION_MODE === "development")
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        alwaysOnTop: true,
        frame: false,
        titleBarStyle: "hidden"
    })
    if(PRODUCTION_MODE !== "development")
        mainWindow.loadFile("dist/renderer/index.html");
    else
        mainWindow.loadURL("http://localhost:5173/");
    mainWindow.once('ready-to-show', () => { mainWindow.show(); })
}

app.whenReady().then(() => {
    createWindow();
})