#!/usr/bin/env node

import * as program from 'commander'

import * as package_info from '../package.json'
import * as prompt from './libs/inquirer'
import { fatal } from './libs/logger'

const { version } = <any>package_info

// program.version(version, '-v, --version')
// program
//   .command('init <template> [otherDirs...]')
//   .action(function(d: string, otherD: any) {
//     if (otherD.length) return fatal('参数错误')
//   })

// program.parse(process.argv)

fatal(prompt)
