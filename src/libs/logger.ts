import chalk from 'chalk'

import { format } from 'util'

import * as package_info from '../../package.json'

const { gray, white, red, green } = chalk
const prefix = package_info.name
const sep = gray('·')

export = class Logger {
  static log(args: any, ...param: any[]): void {
    console.log()
    console.log(white(prefix), sep, format(args, ...param))
  }
  static fatal = (args: any, ...param: any[]) => {
    if (args instanceof Error) args = args.message.trim()
    console.log()
    console.error(red(prefix), sep, format(args, ...param))
    process.exit(1)
  }
  static success(args: any, ...param: any[]): void {
    console.log()
    console.log(green(prefix), sep, format(args, ...param))
  }
}
