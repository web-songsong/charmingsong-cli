#!/usr/bin/env node

import { join } from 'path'
import { existsSync, mkdirSync } from 'fs'
import program from './libs/program'
import Logger from './utils/logger'
import { downTemplate, getMetaJson, writeTemplate } from './libs/tools'
import { metaName } from '../cs-config.json'
import prompt from './libs/inquirer'

interface MetaInfoMust {
  template: string

  [prop: string]: any
}

/**
 * command `init <app-name>`
 * @param appName
 */
async function commandInit(appName: string) {
  const targetDir = join(process.cwd(), appName)
  existsSync(targetDir)
    ? Logger.fatal('The current directory already exists --> %s ', appName)
    : mkdirSync(targetDir)

  const baseInfo: MetaInfoMust = await prompt(await getMetaJson())
  const { template } = baseInfo
  const templatePath = (await downTemplate(template)) as string
  Logger.success('template download success！')

  const templateMetaPath = join(templatePath, metaName)

  const templateMetaInfo = existsSync(templateMetaPath)
    ? await prompt(require(templateMetaPath))
    : {}
  const metaInfo = { ...baseInfo, ...templateMetaInfo }
  await writeTemplate(templatePath, metaInfo, targetDir)
  Logger.success('success ok!')
  process.exit(1)
}

program.command('init <project-name>').action((appName: string) => {
  commandInit(appName)
})
program.parse(process.argv)

if (!process.argv.slice(2).length) {
  program.outputHelp()
}
