import request from '@/utils/request'

export function get() {
  return request({
    url: 'api/qiNiuConfig',
    method: 'get'
  })
}

export function update(data) {
  return request({
    url: 'api/qiNiuConfig',
    data,
    method: 'put'
  })
}

export function checkOssSet(params) {
  return request({
    url: '/setting/oss/check',
    params,
    method: 'get'
  })
}
// 获取oss配置
export function getOssSet(serviceName, params) {
  return request({
    url: '/setting/oss/${serviceName}',
    params,
    method: 'get'
  })
}
// 编辑oss配置
export function editOssSet(params) {
  return request({
    url: '/setting/oss/set',
    params,
    method: 'post'
  })
}

export function del(id) {
  return request({
    url: 'api/qiNiuContent/' + id,
    method: 'delete'
  })
}

export function download(id) {
  return request({
    url: 'api/qiNiuContent/download/' + id,
    method: 'get'
  })
}

export function sync() {
  return request({
    url: 'api/qiNiuContent/synchronize',
    method: 'post'
  })
}

export function delAll(ids) {
  return request({
    url: 'api/qiNiuContent/',
    method: 'delete',
    data: ids
  })
}
