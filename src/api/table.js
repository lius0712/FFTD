import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'http://43.143.203.160:8080/event',
    method: 'get',
    params
  })
}
