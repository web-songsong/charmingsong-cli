#!/usr/bin/env node

const commander = require('commander') // 命令行提示工具
const inquirer = require('inquirer') // 命令行交互工具
const ora = require('ora') // loading动画
const tildify = require('tildify') // 把绝对地址转化成~
const home = require('user-home') // 获取用户根目录
const gitDonwload = require('download-git-repo') // 下载模板
const rm = require('rimraf').sync
const path = require('path')
const exists = require('fs').existsSync

const { isLocalPath, getTemplatePath } = require('../lib/local-path')
const logger = require('../lib/logger')
const generate = require('../lib/generate')
const checkVersion = require('../lib/check-version')
/**
 * usage
 */
commander.usage('<template-name> [project-name]')

/**
 *如果没有输入参数，终端显示帮助
 *
 * @returns help
 */
function help() {
  commander.parse(process.argv)
  if (commander.args.length < 1) return commander.help()
}
help()

let template = commander.args[0],
  projectName = commander.args[1]
const isPlace = !projectName || projectName === '.'
const to = path.resolve(projectName || '.')

function tmpName(tem) {
  return `web-songsong/${tem}`
}
const tmpPath = path.join(
  home,
  '.xs-cli-template',
  template.replace(/[\/:]/g, '-')
)
if (isPlace || exists(to)) {
  inquirer
    .prompt([
      {
        type: 'confirm',
        message: isPlace
          ? 'Generate project in current directory'
          : 'Target directory exists. Continue?',
        name: 'ok'
      }
    ])
    .then(answers => {
      if (answers.ok) {
        // 确认安装
        run()
      }
    })
    .catch(logger.fatal)
} else {
  // 安装
  run()
}

function run() {
  if (isLocalPath(template)) {
    const templatePath = getTemplatePath(template)
    if (exists(templatePath)) {
      generate()
    } else {
      logger.fatal('Local template "%s" not found.', template)
    }
  } else {
    checkVersion(() => {
      downloadAndGenerate(template)
    })
  }
}

function downloadAndGenerate(tem) {
  const spinner = ora('downloading template')
  spinner.start()
  if (exists(tmpPath)) rm(tmpPath)
  gitDonwload(
    tmpName(tem),
    tmpPath,
    {
      clone: true
    },
    err => {
      spinner.stop()
      if (err) {
        logger.fatal(
          'Failed to download repo ' + tem + ': ' + err.message.trim()
        )
      }
      generate()
      console.log()
      logger.success('Generated "%s".', tem)
    }
  )
}
