
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

//新增快报审核人员
//jsonData
export function createKbshry (parameter){
  // this.tableIsLoading=true
  return axios({
    url: '/other/Ajjsgkb.addLcAudituser.jsonp',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

//编辑快报审核人员
//jsonData
export function editKbshry (parameter){
  // this.tableIsLoading=true
  return axios({
    url: '/other/Ajjsgkb.editLcAudituser.jsonp',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}


//删除快报审核人员
//jsonData
export function delKbshry (parameter){
  // this.tableIsLoading=true
  return axios({
    url: '/other/Ajjsgkb.delLcAudituser.json',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}



