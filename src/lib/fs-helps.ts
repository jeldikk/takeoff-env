import {PathLike, promises as fs, stat} from "fs"
import * as path from 'path'
import {exec} from 'child_process'

export interface ISource{
    path: PathLike;
    name: string;
    size: number;
    mtime: Date;
    isdir: boolean;
}

export function resolve(...args: string[]){
    return path.resolve(...args)
}

export async function isDirectory(path: string): Promise<boolean>{
    const stats = await fs.lstat(path)
    return stats.isDirectory() ? true : false
}


async function deriveEnvironmentSize(...paths: string[]): Promise<{size: number; path: string}>{

    return new Promise((res, rej)=>{
        exec(`du --max-depth=1 ${resolve(...paths)}`, (err, stdout, stderr)=>{
            if(err || stderr){
                rej(err!.message)
            }
            else{
                // console.log({stdout})
                let splitted = stdout.trim().split('\n');
                let data = splitted.map((split)=>{
                    const [size, path] = split.split('\t');
                    return {
                        size: +size,
                        path
                    }
                })

                res(data.filter((node)=>{
                    const basename = path.basename(node.path);
                    return basename === "node_modules"
                })[0])
            }
        })
    })
}

export async function generateSourceData(...paths: string[]): Promise<ISource>{

    const stats = await fs.stat(resolve(...paths));
    const derivedData = await deriveEnvironmentSize(...paths);
    // console.log({der});
    
    return {
        ...derivedData,
        mtime: stats.mtime,
        name: path.basename(resolve(...paths,"node_modules")),
        isdir: stats.isDirectory()
    }
}

export async function removeFolder(source: ISource){
    await fs.rmdir(source.path,{recursive: true})
}