import { axios } from '@/utils/request'

const api = '/service/group'

/**
 * query service
 * @param parameter
 * @returns
 */
export function getServiceGroup (parameter) {
  return axios({
    url: api,
    method: 'get',
    params: parameter
  })
}

/**
 * delete service
 * @param id
 * @returns
 */
export function deleteServiceGroup (id) {
  return axios({
    url: api,
    method: 'delete',
    params: api + '/' + id
  })
}

/**
 * batch delete service
 * @param ids
 * @returns
 */
export function deleteServiceGroups (ids) {
  return axios({
    url: api,
    method: 'delete',
    params: api + '/batch',
    data: ids
  })
}
