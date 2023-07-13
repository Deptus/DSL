import child_process from "child_process";
import util from 'util'
import { generateGameArguments, generateJVMArguments } from "./arguments";
import { gamePath } from "../ClientBase";
import { version } from "os";
export default async function Launch(versionName: string, indexID: string) {
    const exec = util.promisify(child_process.exec);
    const jvm = generateJVMArguments(versionName);
    const game = generateGameArguments(versionName, indexID);
    const gameDir = `${gamePath}/versions/${versionName}/${versionName}.jar"`
    await exec(`java ${jvm} net.minecraft.client.main.Main ${game}`);
}