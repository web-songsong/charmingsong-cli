const exists = require('fs').existsSync
const readMetaData = require('read-metadata')
const validateName = require('validate-npm-package-name')
const getGitUser = require('./git-user')
const path = require('path')

module.exports = (name, dir) => {
  const opts = getMetaDAta(dir) /* 读取的meta文件 */
  setDefault(opts, 'name', name) /* 写name默认配置 */
  setValidateName(opts) /* 判断项目名字 */
  const author = getGitUser() /* 获取git的信息 */
  if (author) {
    setDefault(opts, 'author', author)
  }
  return opts
}

function getMetaDAta(dir) {
  const json = path.join(dir, 'meta.json')
  const js = path.join(dir, 'meta.js')
  let opts = {}
  if (exists(json)) {
    opts = readMetaData.sync(json)
  } else if (exists(js)) {
    const req = require(path.resolve(js))
    if (req !== Object(req)) {
      throw new Error('meta.js needs to expose an object')
    }
    opts = req
  }
  return opts
}

function setDefault(opts, key, val) {
  const prompts = opts.prompts || (opts.prompts = {})
  if (!prompts[key] || typeof prompts[key] !== 'object') {
    prompts[kye] = {
      type: 'string',
      default: val
    }
  } else {
    prompts[key]['default'] = val
  }
}

function setValidateName(opts) {
  const name = opts.prompts.name
  const customValidate = name.validate
  name.validate = name => {
    const its = validateName(name)
    if (!its.validForNewPackages) {
      const error = (its.errors || []).concat(its.warnings || [])
      return 'Sorry, ' + errors.join('and') + '.'
    }
    if (typeof customValidate === 'function') return customValidate(name)
    return true
  }
}
