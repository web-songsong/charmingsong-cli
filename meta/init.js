module.exports = {
  prompts: [
    {
      type: 'list',
      message: '选择模板',
      choices: ['xs-templates', 'manage-system', 'blogProject'],
      name: 'template'
    },
    {
      type: 'input',
      message: '简介',
      name: 'description'
    },
    {
      type: 'input',
      message: '版本号',
      default: '0.0.1',
      name: 'version'
    },
    {
      type: 'input',
      message: '关键字',
      name: 'keywords'
    }
  ]
}
