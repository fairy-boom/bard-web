import Mock from 'mockjs2'
import { builder, getQueryParameters } from '@/mock/util'

const groupPlugins = (options) => {
  const parameters = getQueryParameters(options)
  console.log(parameters)
  const result = []
  for (let i = 1; i < 10; i++) {
    result.push({
      id: i,
      name: '插件' + i,
      categoryName: '路由',
      version: '1.0.0',
      description: '这是一段描述' + i,
      createdTime: Mock.mock('@datetime'),
      modifyTime: Mock.mock('@datetime')
    })
  }

  return builder(result)
}

Mock.mock(/\/services\/groups\/plugin\/1/, 'get', groupPlugins)
