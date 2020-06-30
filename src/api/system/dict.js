import { axios } from '@/utils/request'

const api = '/dict'

/**
 * query dict
 * @param parameter
 * @returns
 */
export function queryDict (parameter) {
  return axios({
    url: api,
    method: 'get',
    params: parameter
  })
}

/**
 * get dict
 * @param parameter dict code
 * @returns
 */
export function getDictByCode (code) {
  return axios({
    url: api + '/code/' + code,
    method: 'get'
  })
}

/**
 * delete dict
 * @param id
 * @returns
 */
export function deleteDict (id) {
  return axios({
    url: api,
    method: 'delete',
    params: api + '/' + id
  })
}

/**
 * batch delete dicts
 * @param ids
 * @returns
 */
export function deleteDicts (ids) {
  return axios({
    url: api,
    method: 'delete',
    params: api + '/batch',
    data: ids
  })
}
