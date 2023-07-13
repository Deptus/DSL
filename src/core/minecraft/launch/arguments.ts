import fs from 'fs'
import { platform, version } from 'os';
import { gamePath } from '../ClientBase';
import { storePath } from 'src/core/Store';
import { MCToken } from 'auth/MinecraftAuth';
export function generateJVMArguments(versionName: string) {
    let args: string = "";// = "-Dfml.ignoreInvalidMinecraftCertificates=True-Dfml.ignorePatchDiscrepancies=True -Dlog4j2.formatMsgNoLookups=true ";
    //args += `-Djava.library.path=`
    args += `-Dminecraft.launcher.brand=DSL `
    args += `-Dminecraft.launcher.version=100 `
    args += `-cp "`
    const lib = fs.readFileSync(`${gamePath}/versions/${versionName}/libraries.txt`, "utf-8")
    args += lib + `${gamePath}/versions/${versionName}/${versionName}.jar" `
    if(platform() === 'win32')
        args += `-Dos.name=Windows 10 -Dos.version=10.0 `
    args += `-XX:HeapDumpPath=MojangTricksIntelDriversForPerformance_javaw.exe_minecraft.exe.heapdump `;
    if(platform() === 'darwin')
        args += `-XstartOnFirstThread `;
    args += `-Xss1M`;
    return args;
}

export function generateGameArguments(versionName: string, indexId: string) {
    let args = `--version DSL `
    args += `--gameDir "${gamePath}/versions/${versionName}" `
    args += `--assetsDir "${gamePath}/assets" `
    args += `--assetsIndex "${gamePath}/assets/indexes/${indexId}.json" `
    const json = (JSON.parse(fs.readFileSync(`${storePath}/Profile/token/mcauth.json`, "utf-8")) as MCToken).access_token;
    args += `--accessToken ${json} --userType msa --versionType DSL `;
    return args;
}