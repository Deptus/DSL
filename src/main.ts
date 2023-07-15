import { app, BrowserWindow, ipcRenderer, protocol, ProtocolRequest } from 'electron';
import 'auth/MSLogin';
import './core/Store'
import './core/Logger'
import './core/Config'
import './core/Downloader'
import { initClient, gamePath } from './core/minecraft/ClientBase'
import './core/minecraft/download/minecraft'
import fs from 'fs'
import { DownloadVersion, DownloadVersionIndex, VersionIndex } from './core/minecraft/download/minecraft';
import Launch from './core/minecraft/launch';
import { DownloadFile } from './core/Downloader';

const dev = process.env.NODE_ENV !== 'development'
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true";
if(!dev)
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

async function createWindow() {
    initClient()
    const json = fs.readFileSync(`${gamePath}/versions/test/test.json`, "utf-8");
    const main = (JSON.parse(json) as VersionIndex).downloads.client.url;
    //await DownloadFile(main, `C:/Users/GBC03/Desktop`, 5, 100, "", "ll")
    await DownloadVersion("1.20.1", "test")
    await Launch("test", "5")

    
    const win = new BrowserWindow({
        minWidth: 800,
        minHeight: 600,
        height: 600,
        width: 800,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    })

    if(dev) win.loadFile('dist/index.html')
    else win.loadURL('http://localhost:3500')

    win.once('ready-to-show', () => { win.show() })
}
const path = app.getPath("appData")
app.whenReady().then(async () => {
    protocol.interceptFileProtocol(
        "resource",
        (req: ProtocolRequest, callback: (filePath: string) => void) => {
            const url = req.url.slice(11);
            callback(decodeURI(url));
        }
    );
    await createWindow();
    console.log(path)
})
 