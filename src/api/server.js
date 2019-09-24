import { axios } from '@/utils/request'

export function baseInfo() {
  return axios({
    url: 'api/monitor/server/base',
    method: 'get'
  })
}

export function instantInfo() {
  return axios({
    url: 'api/monitor/server/instant',
    method: 'get'
  })
}
