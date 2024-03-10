import * as log4js from "log4js";
import { PRODUCTION_MODE } from "./main";

if(PRODUCTION_MODE !== "development")
    log4js.configure({ 
        appenders: { 
            appender: { type: "file", filename: "dsl.log" } as log4js.FileAppender
        }, categories: { 
            "[DSL Main]": { appenders: ["appender"], level: "all" },
            "[DSL Renderer]": { appenders: ["appender"], level: "all" }
        } 
    });

export const MainLogger = log4js.getLogger("[DSL Main]");
export const RendererLogger = log4js.getLogger("[DSL Renderer]");