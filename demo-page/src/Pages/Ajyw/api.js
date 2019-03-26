
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


//新增工作
// 类似检查单：传入gzhz（工作任务），和zrw（子任务）
//jsonData
export function createWork (parameter){
  // this.tableIsLoading=true
  return axios({
    url: '/other/Ajyw.createGzhz.jsonp',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

//编辑工作
//jsonData
export function editWork (parameter){
  // this.tableIsLoading=true
  return axios({
    url: '/other/Ajyw.editGzhz.jsonp',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

//删除工作
//jsonData
export function delWork (parameter){
  // this.tableIsLoading=true
  return axios({
    url: '/other/Ajyw.delGzhz.jsonp',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

//发布工作
//jsonData
export function fabuWork (parameter){
  // this.tableIsLoading=true
  return axios({
    url: '/other/Ajyw.fbGzhz.jsonp',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

//取消发布工作
//jsonData
export function qxfbWork (parameter){
  // this.tableIsLoading=true
  return axios({
    url: '/other/Ajyw.qxfbGzhz.jsonp',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

//查询工作详情
//jsonData
export function reqWorkDetail (parameter){
  // this.tableIsLoading=true
  return axios({
    url: '/other/Ajyw.queryWdgz.json',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}



//调整工作难易程度
// param1: item.id,
// param2: item.nycd
export function editWorkNycd (parameter){
  // this.tableIsLoading=true
  return axios({
    url: '/other/Ajyw.nycd.jsonp',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
//工作分配
// param1: item.id
// param2: item.gzfp ??
// param3: item.fzrid
// param4: item.jhwctime
export function fenpeiWork (parameter){
  // this.tableIsLoading=true
  return axios({
    url: '/other/Ajyw.gzfp.jsonp',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}


//调整工作进度
// jsondata
export function editMyWork (parameter){
  // this.tableIsLoading=true
  return axios({
    url: '/other/Ajyw.saveWdgz.jsonp',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
