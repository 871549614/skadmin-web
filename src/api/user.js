import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/user',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/user/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/user',
    method: 'put',
    data
  })
}

export function validPass(password) {
  const data = {
    password
  }
  return request({
    url: 'api/user/validPass/',
    method: 'post',
    data
  })
}

export function updatePass(password) {
  const data = {
    password
  }
  return request({
    url: 'api/user/updatePass/',
    method: 'post',
    data
  })
}

export function updateEmail(code, data) {
  return request({
    url: 'api/user/updateEmail/' + code,
    method: 'post',
    data
  })
}
