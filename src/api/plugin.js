import { axios } from '@/utils/request'

const api = '/plugins'

/**
 * query plugin
 * @param parameter
 * @returns
 */
export function queryPlugins (parameter) {
  return axios({
    url: api,
    method: 'get',
    params: parameter
  })
}

/**
 * get plugin list by category
 * @param categoryId
 * @returns
 */
export function getPluginByCategory (categoryId) {
  return axios({
    url: api + '/category/' + categoryId,
    method: 'get'
  })
}

/**
 * delete plugin
 * @param id
 * @returns
 */
export function deletePlugin (id) {
  return axios({
    url: api,
    method: 'delete',
    params: api + '/' + id
  })
}

/**
 * batch delete plugins
 * @param ids
 * @returns
 */
export function deletePlugins (ids) {
  return axios({
    url: api,
    method: 'delete',
    params: api + '/batch',
    data: ids
  })
}

/**
 * update status by ids
 * @param status
 * @returns
 */
export function updateStatus (ids, status) {
  return axios({
    url: api,
    method: 'post',
    params: api,
    data: { ids: ids, status: status }
  })
}
