#!/usr/bin/env node
import * as program from 'commander'

import * as package_info from '../package.json'

import * as prompt from './libs/inquirer'

import Logger = require('./libs/logger')
Logger.fatal()

// console.log(log)
// // program.version(package_info.version, '-v, --version')
// // program
// //   .command('init <template> [otherDirs...]')
// //   .action(function(d: string, otherD: any) {
// //     if (otherD.length) return log.fatal('参数错误')
// //   })

// // program.parse(process.argv)

console.log('=======')
