import { axios } from '@/utils/request'

const api = '/dict'

/**
 * query dict
 * @param parameter dict code
 * @returns
 */
export function getDictByCode (code) {
  return axios({
    url: api + '/code/' + code,
    method: 'get'
  })
}
