import * as chalk from 'chalk'
import * as util from 'util'
// const { format } = util
import * as package_info from '../../package.json'
// console.log(format)

const prefix = package_info.name
// const { gray, white, red, green } = <any>chalk
// const sep = gray('·')

// const log = (...args: any) => {
//   console.log()
//   console.log(white(prefix), sep, format(...args))
// }

// const fatal = (...args: any) => {
//   if (args[0] instanceof Error) args[0] = args[0].message.trim()
//   console.log()
//   console.error(red(prefix), sep, format(...args))
//   process.exit(1)
// }

// const success = (...args: any) => {
//   console.log()
//   console.log(green(prefix), sep, format(...args))
// }

// export { fatal }

interface Log {
  fatal(str: any): void
  cuccess(): void
}

class Logger implements Log {
  constructor() {
    console.log('log1111')
  }
  fatal(str: string): void {
    console.log(str)
  }
  cuccess(): void {
    throw new Error('Method not implemented.')
  }
}

export = new Logger()
