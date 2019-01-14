module.exports = {
  prompts: [
    {
      type: 'list',
      message: '选择模板',
      choices: ['xs-templates', 'manage-system', 'blogProject'],
      name: 'template'
    }
    // {
    //   type: 'input',
    //   message: '项目名称(英文)',
    //   name: 'name',
    //   validate(val) {
    //     if (/^\w+$/.test(val)) return true
    //     return '英文!!!'
    //   }
    // }
  ]
}
