
import { axios } from '@/utils/request'
import Qs from 'qs'

//通用查询api
export function GeneralQuery(parameter) {
  return axios({
    url: process.env.NODE_ENV === 'production'
      ?'/base/General.query.json'
      : '/base/General.query.json',
    method: 'get',
    params: parameter,
  })
}

//通用查询api post
export function GeneralPostQuery(parameter) {
  return axios({
    url: process.env.NODE_ENV === 'production'
      ?'/base/General.query.json'
      : '/base/General.query.json',
    method: 'post',
    data: parameter,
  })
}

//查询选择项的子选项
//jsonData
export function GeneralQuerySelChildren (parameter,type) {
  let url=''
  switch (type){
    case 0:
      url='/other/Ajj.queryQylx2.json'
          break
    case 1:
      url='/other/Ajj.queryGmjjhyfl2.json'
          break
    case 2:
      url='/other/Ajj.queryGmjjhyfl3.json'
          break
    case 3:
      url='/other/Ajj.queryGmjjhyfl4.json'
  }

  return axios({
    url:url,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
