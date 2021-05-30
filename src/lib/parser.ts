import yargs from "yargs";

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