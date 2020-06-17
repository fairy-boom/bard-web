import { axios } from '@/utils/request'

const api = '/services/groups/plugin'

/**
 * query service group plugins
 * @param parameter
 * @returns
 */
export function getServiceGroupPlugin (groupId) {
  return axios({
    url: api + '/' + groupId,
    method: 'get'
  })
}

/**
 * add service group plugin
 * @param plugins
 * @returns {AxiosPromise}
 */
export function addServiceGroupPlugin (plugins) {
  return axios({
    url: api,
    method: 'get',
    params: plugins
  })
}

/**
 * delete service group plugin
 * @param ids
 * @returns
 */
export function deleteServiceGroups (pluginId) {
  return axios({
    url: api + '/' + pluginId,
    method: 'delete'
  })
}
