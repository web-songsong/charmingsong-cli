const chalk = require('chalk')
const format = require('util').format

/**
 * Prefix
 */

const prefix = '  xs'
const sep = chalk.gray('.')

exports.log = (...args) => {
  console.log()
  console.log(chalk.white(prefix), sep, format(...args))
}

exports.fatal = (...args) => {
  if (args[0] instanceof Error) args[0] = args[0].message.trim()
  console.log()
  console.error(chalk.red(prefix), sep, format(...args))
  process.exit(1)
}

exports.success = (...args) => {
  console.log()
  console.log(chalk.white(prefix), sep, format(...args))
}
