import { app, BrowserWindow } from 'electron';
import LoginURL from './mslogin';

const dev = process.env.NODE_ENV !== 'development'
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true";

function createWindow() {
    const win = new BrowserWindow({
        height: 600,
        width: 800,
        
    })

    if(dev) win.loadFile('dist/index.html')
    else win.loadURL('http://localhost:3000')
}

app.whenReady().then(() => {
    createWindow();
})