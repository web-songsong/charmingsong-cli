#!/usr/bin/env node
import * as program from 'commander'
import * as path from 'path'
import { existsSync } from 'fs'
import * as package_info from '../package.json'
import { handlePrompt } from './libs/inquirer'
import { downLoadtempalte, otputTemplate, getMetaJson } from './libs/utils'
import Logger = require('./libs/logger')

const githubMetaUrl =
  'https://gitee.com/websongsong/tool-uri/raw/master_meta/meta.json'

program.version(package_info.version, '-v, --version')
program
  .command('init [template] [other...]')
  .action(function(template: any, otherD: any) {
    if (otherD.length) return Logger.fatal('参数错误')
    if (template) {
    } else {
      main()
    }
  })
program.parse(process.argv)

if (!process.argv.slice(2).length) {
  program.outputHelp()
}

async function main() {
  /* 获取meta */
  const metaInit = await getMetaJson(githubMetaUrl)
  /* 获取meta信息 */
  const metaInfoBase: any = await handlePrompt(metaInit) 

  /* 下载模板  */

  let temsPath = <string>await downLoadtempalte(metaInfoBase.template)
  temsPath && Logger.success('下载模板成功')

  let metaInfoTemPath = path.join(temsPath, 'meta.json')
  let createMetaInfo = existsSync(metaInfoTemPath)
    ? require(metaInfoTemPath)
    : ''
  let metaInfo: any = metaInfoBase
  if (createMetaInfo) {
    const metaInfoTem: any = await handlePrompt(createMetaInfo)
    metaInfo = { ...metaInfo, metaInfoTem }
  }
  ;(await otputTemplate(temsPath, metaInfo)) && Logger.success('写入模板成功')
}
