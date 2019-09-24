import { axios } from '@/utils/request'

export function systemInfo(actuator) {
  return axios({
    url: 'api/monitor/performance/system/' + actuator,
    method: 'get'
  })
}

export function jvmInfo(actuator) {
  return axios({
    url: 'api/monitor/performance/jvm/' + actuator,
    method: 'get'
  })
}

export function tomcatInfo(actuator) {
  return axios({
    url: 'api/monitor/performance/tomcat/' + actuator,
    method: 'get'
  })
}
