import request from '@/utils/request'

export function del(id) {
  return request({
    url: 'api/picture/' + id,
    method: 'delete'
  })
}

export function delAll(ids) {
  return request({
    url: 'api/picture/',
    method: 'delete',
    data: ids
  })
}
