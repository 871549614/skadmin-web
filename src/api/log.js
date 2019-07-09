import request from '@/utils/request'

export function getErrDetail(id) {
  return request({
    url: 'api/log/error/' + id,
    method: 'get'
  })
}
