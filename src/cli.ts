import {promises as fs} from "fs"
import path from 'path'
import ora from "ora";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import {printError, printInfo, printSuccess} from "./lib/color-printer"
import {isDirectory} from "./lib/fs-helps"
import {isNodeProject, isNodeEnvironmentPresent} from "./lib/utils"

export async function parseArguments(argVector: string[]) {
  return yargs(argVector).options({
    path: {
      type: "string",
      demandOption: true,
      alias: "p",
    },
    days: {
      type: "number",
      demandOption: false,
      alias: "d",
      default: 0,
    },
    months: {
      type: "number",
      demandOption: false,
      alias: "M",
      default: 6,
    },
    analyse:{
        type: "boolean",
        demandOption: false,
        default: false
    }
  }).argv;
}


const spinner = ora("Loading modules");

async function main(){

    const response = await parseArguments(hideBin(process.argv));
    // const timeInterval = 
    
    // const pathStatus = await fs.lstat(response.path);
    if(await isDirectory(response.path)){

        const projectList = await fs.readdir(response.path);

        for(let item of projectList){
            let projectPath = path.resolve(response.path, item);
            if(await isDirectory(projectPath)){
                if(await isNodeEnvironmentPresent(path.resolve(response.path, item))){
                    printSuccess("Node environment is present")
                }
                else{
                    printInfo("Node environment is not present")
                }
            }
            else{
                printInfo("Not a folder")
            }
            
        }
        
    }
    else{
        printError("Provided path is not a valid directory")
    }
}


// Magic begins to happen from here
main()