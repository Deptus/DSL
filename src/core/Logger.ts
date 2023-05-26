import { ipcMain } from 'electron';
import log4js from 'log4js';
//create logger
export const mainlogger = log4js.getLogger("MAIN");
export const redererlogger = log4js.getLogger("RENDERER");
export const authlogger = log4js.getLogger("AUTH");
ipcMain.handle("log", (_event, level, message) => {
    switch (level) {
        case "main":
            mainlogger.info(message);
            break;
        case "renderer":
            redererlogger.info(message);
            break;
        case "auth":
            authlogger.info(message);
            break;
    }
    return 1;
});