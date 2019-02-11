
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

//新增检查项
//jsonData
export function createJcx (parameter){
  // this.tableIsLoading=true
  return axios({
    url: '/other/Ajjjx.createJctm.json',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

//编辑检查项
//jsonData
export function editJcx (parameter){
  // this.tableIsLoading=true
  return axios({
    url: '/other/Ajjjx.editJctm.json',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

//删除检查项
//jsonData
export function delJcx (parameter){
  // this.tableIsLoading=true
  return axios({
    url: '/other/Ajjjx.delJctm.json',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}


//删除检查表
//jsonData
export function delJcb (parameter,type){
  // this.tableIsLoading=true
  return axios({
    url: type=='multi'?'/other/Ajjjx.pldeljcb.jsonp':'/other/Ajjjx.delJcb.jsonp',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

