import Mock from 'mockjs2'
import { builder } from '@/mock/util'

// const dictList = (options) => {
//   const result = []
//
//   for (let i = 1; i < 10; i++) {
//     result.push({
//       id: i,
//       name: '插件',
//       parentId: i,
//       code: 'aaaa'
//     })
//   }
//
//   return builder({
//     data: result
//   })
// }

const dictPluginList = (options) => {
  const result = [{
    id: 1,
    name: '认证',
    parentId: 0,
    dictKey: 1,
    code: 'aaaa'
  }, {
    id: 2,
    name: '流量',
    parentId: 0,
    dictKey: 2,
    code: 'aaaa'
  }, {
    id: 3,
    name: '缓存',
    parentId: 0,
    dictKey: 3,
    code: 'aaaa'
  }, {
    id: 4,
    name: '路由',
    parentId: 0,
    dictKey: 4,
    code: 'aaaa'
  }, {
    id: 5,
    name: '日志',
    parentId: 0,
    dictKey: 5,
    code: 'aaaa'
  }]

  return builder(result)
}

// Mock.mock(/\/dict/, 'get', dictList)
Mock.mock(/\/dict\/code\/plugin/, 'get', dictPluginList)
