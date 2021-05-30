import { promises as fs } from "fs";
import {resolve} from "./fs-helps"

export async function isNodeProject(...paths: string[]): Promise<boolean>{
    const fileList = await fs.readdir(resolve(...paths));
    return fileList.includes('package.json')
}

export async function isNodeEnvironmentPresent(...paths: string[]): Promise<boolean>{
    const fileList = await fs.readdir(resolve(...paths));
    return fileList.includes('node_modules')
}