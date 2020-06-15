import Mock from 'mockjs2'
import { builder, getQueryParameters } from '@/mock/util'

// const totalCount = 100
//
// const pluginList = (options) => {
//   const parameters = getQueryParameters(options)
//
//   const result = []
//   const pageNo = parseInt(parameters.pageNo)
//   const pageSize = parseInt(parameters.pageSize)
//   const totalPage = Math.ceil(totalCount / pageSize)
//   const key = (pageNo - 1) * pageSize
//   const next = (pageNo >= totalPage ? (totalCount % pageSize) : pageSize) + 1
//
//   for (let i = 1; i < next; i++) {
//     result.push({
//       id: key + i,
//       name: '插件',
//       category: '路由',
//       status: Mock.mock('@integer(1, 2)'),
//       description: '这是一段描述',
//       createdTime: Mock.mock('@datetime'),
//       modifyTime: Mock.mock('@datetime'),
//       editable: false
//     })
//   }
//
//   return builder({
//     pageSize: pageSize,
//     pageNo: pageNo,
//     totalCount: totalCount,
//     totalPage: totalPage,
//     data: result
//   })
// }

const categoryList = (options) => {
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

const deletePlugin = () => {
  return builder({}, '操作成功')
}

// Mock.mock(/\/plugins\//, 'get', pluginList)
Mock.mock(/\/plugins\/category\/1/, 'get', categoryList)
Mock.mock(/\/plugins/, 'delete', deletePlugin)
Mock.mock(/\/plugins\/batch/, 'delete', deletePlugin)
