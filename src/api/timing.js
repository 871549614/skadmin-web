import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/task',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/task/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/task',
    method: 'put',
    data
  })
}

export function updateIsPause(id) {
  return request({
    url: 'api/task/' + id,
    method: 'put'
  })
}

export function execution(id) {
  return request({
    url: 'api/task/exec/' + id,
    method: 'put'
  })
}
