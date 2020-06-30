import Mock from 'mockjs2'
import { builder, getQueryParameters } from '@/mock/util'

const totalCount = 100

const dictList = (options) => {
  const parameters = getQueryParameters(options)

  const result = []
  const pageNo = parseInt(parameters.pageNo)
  const pageSize = parseInt(parameters.pageSize)
  const totalPage = Math.ceil(totalCount / pageSize)
  const key = (pageNo - 1) * pageSize
  const next = (pageNo >= totalPage ? (totalCount % pageSize) : pageSize) + 1

  for (let i = 1; i < next; i++) {
    result.push({
      id: key + i,
      name: '插件',
      parentId: i,
      code: 'aaaa'
    })
  }

  return builder({
    pageSize: pageSize,
    pageNo: pageNo,
    totalCount: totalCount,
    totalPage: totalPage,
    data: result
  })
}

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

Mock.mock(/\/dict/, 'get', dictList)
Mock.mock(/\/dict\/code\/plugin/, 'get', dictPluginList)
