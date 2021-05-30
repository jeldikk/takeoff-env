#!/usr/bin/env node

import {PathLike, promises as fs} from "fs"
import path from 'path'
import ora from "ora";
import { hideBin } from "yargs/helpers";

import {parseArguments} from "./lib/parser"
import {printError, printInfo, printSuccess} from "./lib/color-printer"
import {ISource, generateSourceData, isDirectory, resolve, removeFolder} from "./lib/fs-helps"
import {isNodeProject, isNodeEnvironmentPresent} from "./lib/utils"


const spinner = ora("Please Wait Analysing data").start();

const sourceData: Array<ISource> = []

async function main(){

    const response = await parseArguments(hideBin(process.argv));
    
    if(await isDirectory(response.path)){

        const projectList = await fs.readdir(response.path);

        for(let item of projectList){
            let projectPath = resolve(response.path, item)
            if(await isDirectory(projectPath)){
                if(await isNodeEnvironmentPresent(response.path, item)){
                    // printSuccess("Node environment is present")
                    const data = await generateSourceData(response.path, item)
                    sourceData.push(data)
                }
                else{
                    // printInfo(`noenv: ${resolve(response.path, item)}`)
                }
            }
            // else{
            //     printInfo("Not a folder")
            // }
            
        }

        spinner.succeed("Analysis completed")
        console.log("Found some data to display")
        
    }
    else{
        printError("Provided path is not a valid directory")
    }

    // console.log({sourceData})

    let freeableMemory = 0;
    sourceData.forEach((node)=>{
      freeableMemory = freeableMemory + node.size
    })
    console.log({freeableMemory})

    for(const source of sourceData){
      spinner.text = `Removing Folder: ${source.path}`
      spinner.start()
      await removeFolder(source);
      spinner.warn(`Deleted Folder`)
    }
}


// Magic begins to happen from here
main()