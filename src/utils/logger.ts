import chalk from 'chalk'

import { format } from 'util'

import { loggerPrefix } from '../../cs-config.json'

const {
  gray, red, green, yellow,
} = chalk

const prefix = loggerPrefix
const sep = gray(':')

type LoggerParams = (str: string | any, ...param: Array<string | number>) => void

export default class Logger {
  static info: LoggerParams = (str, ...params) => {
    console.log()
    console.log(yellow(prefix), sep, format(str, ...params))
  }

  static fatal: LoggerParams = (str, ...params) => {
    if (str instanceof Error) (str = str.message.trim())
    console.log()
    console.error(red(prefix), sep, format(str, ...params.map((p) => red.bgWhite(p.toString()))))
    process.exit(1)
  }

  static success: LoggerParams = (str, ...params) => {
    console.log()
    console.log(green(prefix), sep, format(str, ...params))
  }
}
