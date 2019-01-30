
import { axios } from '@/utils/request'
import Qs from 'qs'

//通用查询api
export function GeneralQuery(parameter) {
  return axios({
    url: process.env.NODE_ENV === 'production'
      ?'/base/General.query.json'
      // : '/kuaibaoList',
      : '/base/General.query.json',
    method: 'get',
    params: parameter,
  })
}

//新增物资
//jsonData
export function createWz (parameter){
  // this.tableIsLoading=true
  return axios({
    url: '/other/Ajyj.createYjwz.jsonp',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

//编辑物资
//jsonData
export function editWz (parameter){
  // this.tableIsLoading=true
  return axios({
    url: '/other/Ajyj.editYjwz.jsonp',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

//删除物资
//jsonData
export function delWz (parameter){
  // this.tableIsLoading=true
  return axios({
    url: '/other/Ajyj.delYjwz.jsonp',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

//新增装备
//jsonData
export function createZb (parameter){
  // this.tableIsLoading=true
  return axios({
    url: '/other/Ajyj.createYjzb.jsonp',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

//编辑装备
//jsonData
export function editZb(parameter){
  // this.tableIsLoading=true
  return axios({
    url: '/other/Ajyj.editYjzb.jsonp',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

//删除装备
//jsonData
export function delZb (parameter){
  // this.tableIsLoading=true
  return axios({
    url: '/other/Ajyj.delYjzb.jsonp',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

//新增应急队伍
//jsonData
export function createTeam (parameter){
  // this.tableIsLoading=true
  return axios({
    url: '/other/Ajyj.createYjdw.jsonp',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

//编辑应急队伍
//jsonData
  export function editTeam (parameter){
  // this.tableIsLoading=true
  return axios({
    url: '/other/Ajyj.editYjdw.jsonp',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

//删除应急队伍
//jsonData
export function delTeam (parameter){
  // this.tableIsLoading=true
  return axios({
    url: '/other/Ajyj.delYjdw.jsonp',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

//新增避难场所
//jsonData
export function createPlace (parameter){
  // this.tableIsLoading=true
  return axios({
    url: '/other/Ajyj.createBncs.jsonp',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

//编辑避难场所
//jsonData
export function editPlace (parameter){
  // this.tableIsLoading=true
  return axios({
    url: '/other/Ajyj.editBncs.jsonp',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

//删除避难场所
//jsonData
export function delPlace (parameter){
  // this.tableIsLoading=true
  return axios({
    url: '/other/Ajyj.delBncs.jsonp',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

//新增知识库
//jsonData
export function createZs (parameter){
  // this.tableIsLoading=true
  return axios({
    url: '/other/Ajyj.createYjzs.jsonp',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

//编辑知识库
//jsonData
export function editZs (parameter){
  // this.tableIsLoading=true
  return axios({
    url: '/other/Ajyj.editYjzs.jsonp',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

//删除知识库
//jsonData
export function delZs (parameter){
  // this.tableIsLoading=true
  return axios({
    url: '/other/Ajyj.delYjzs.jsonp',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
//新增专家
//jsonData
export function createZj (parameter){
  // this.tableIsLoading=true
  return axios({
    url: '/other/Ajyj.createYjzj.jsonp',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

//编辑专家
//jsonData
export function editZj (parameter){
  // this.tableIsLoading=true
  return axios({
    url: '/other/Ajyj.editYjzj.jsonp',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

//删除专家
//jsonData
export function delZj (parameter){
  // this.tableIsLoading=true
  return axios({
    url: '/other/Ajyj.delYjzj.jsonp',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}