import Mock from 'mockjs2'
import { builder, getQueryParameters } from '@/mock/util'

const totalCount = 100

const serviceList = (options) => {
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
      name: '分组名称',
      serverUrl: '服务地址',
      prefixUrl: '/api/test',
      description: '这是一段描述',
      createdTime: Mock.mock('@datetime'),
      modifyTime: Mock.mock('@datetime'),
      editable: false
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

const deleteService = () => {
  return builder({}, '操作成功')
}

Mock.mock(/\/service\/groups/, 'get', serviceList)
Mock.mock(/\/service\/groups/, 'delete', deleteService)
Mock.mock(/\/service\/groups\/batch/, 'delete', deleteService)
