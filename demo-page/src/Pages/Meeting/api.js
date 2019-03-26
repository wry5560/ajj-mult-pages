
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


//新增会议
//jsonData
export function createHy (parameter){
  // this.tableIsLoading=true
  return axios({
    url: '/other/Ajjhy.createHy.json',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

//编辑会议
//jsonData
export function editHy (parameter){
  // this.tableIsLoading=true
  return axios({
    url: '/other/Ajjhy.editHy.json',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

//删除会议
//jsonData
export function delHy (parameter){
  // this.tableIsLoading=true
  return axios({
    url: '/other/Ajjhy.delHy.json',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}


//结束会议
//jsonData
export function endhy (parameter){
  // this.tableIsLoading=true
  return axios({
    url: '/other/Ajjhy.endhy.json',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

