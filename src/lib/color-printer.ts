import chalk from 'chalk'

export function printInfo(message: string){
    console.log(chalk.yellow(message))
}

export function printWarning(message: string){
    console.log(chalk.green(message))
}

export function printError(message: string){
    console.error(chalk.red(message))
}

export function printSuccess(message: string){
    console.log(chalk.green(message))
}