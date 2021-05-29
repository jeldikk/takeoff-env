import { promises as fs } from "fs";

export async function isNodeProject(path: string): Promise<boolean>{
    const fileList = await fs.readdir(path);
    return fileList.includes('package.json')
}

export async function isNodeEnvironmentPresent(projectPath: string): Promise<boolean>{
    const fileList = await fs.readdir(projectPath);
    return fileList.includes('node_modules')
}