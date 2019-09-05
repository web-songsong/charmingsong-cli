# charmingsong-cli

> 用于下载github上模板的脚手架工具

## 下载

```bash
$ npm install -g charmingsong-cli
```

## 使用

> 执行终端命令， 之后根据提示进行自定义操作

```bash
$ cs init
```

## 模板

> 模板类型是根据[github](https://github.com/web-songsong)纪录的模板类型
>
> 模板类型以 `cs-templates-xxx`格式命名，可用模板列表可自行查看本项目 `master_meta`分支

## 模板开发规则

> 可自行添加自己需要的模板

### 目录

```bash
.
├── README.md
├── meta.json
└── template
```



模板写入利用 `handlebars`, 

例如： 

```json
{
  "name": "{{projectName}}",
  "version": "{{version}}",
  "description": "{{description}}",
}
```



### 默认交互

模板名称--`template`

项目名称--`projectName`

简介描述--`description`

版本--`version`

### 自定义交互

> 可以自行配置`meta.json`,依据`inquirer`语法配置， 自动解析。 

例如： 

```json
[
  {
    "name": "testname",
    "type": "input",
    "message": "测试",
    "default": "test"
  }
]
```

