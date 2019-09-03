#!/usr/bin/env node
import * as program from 'commander'

import * as package_info from '../package.json'

import * as prompt from './libs/inquirer'

import Logger = require('./libs/logger')

program.version(package_info.version, '-v, --version')
program
  .command('init <template> [otherDirs...]')
  .action(function(template: string, otherD: any) {
    if (otherD.length) return Logger.fatal('参数错误')
  })

program.parse(process.argv)
