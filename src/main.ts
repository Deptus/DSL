import { app, BrowserWindow, ipcRenderer, protocol, ProtocolRequest } from 'electron';
import 'auth/MSLogin';
import './core/Store'
import './core/Logger'
import './core/Config'

const dev = process.env.NODE_ENV !== 'development'
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true";


function createWindow() {
    const win = new BrowserWindow({
        minWidth: 800,
        minHeight: 600,
        height: 600,
        width: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    })

    if(dev) win.loadFile('dist/index.html')
    else win.loadURL('http://localhost:3500')
}
const path = app.getPath("appData")
app.whenReady().then(() => {
    protocol.interceptFileProtocol(
        "resource",
        (req: ProtocolRequest, callback: (filePath: string) => void) => {
            const url = req.url.slice(11);
            callback(decodeURI(url));
        }
    );
    createWindow();
    console.log(path)
})
 