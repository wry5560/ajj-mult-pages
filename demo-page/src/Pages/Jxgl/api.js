
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
export function GeneralQuerySelChildren (parameter) {
  // this.tableIsLoading=true
  return axios({
    url: '/other/Ajj.queryFxlx.json',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
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

//添加检查表
//jsonData
export function addJcb (parameter,type){
  // this.tableIsLoading=true
  return axios({
    url: '/other/Ajjjx.saveJcb.jsonp',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

//添加检查表配置
//jsonData
export function addJcbOpt (parameter,type){
  // this.tableIsLoading=true
  return axios({
    url: '/other/Ajjjx.addDefJcb.jsonp',
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

//新增专项检查计划
//参数jsonData：｛defjcbplan:{},defjcbdetail:[{},{},{}],defjcbplanqy:[{},{}]｝
export function createZxjcplan (parameter){
  // this.tableIsLoading=true
  return axios({
    // url: '/other/Ajjjx.createJcplan.json',
    url: '/other/Ajjjx.addZxjc.json',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

//编辑专项检查计划
//参数jsonData：｛defjcbplan:{},defjcbdetail:[{},{},{}],defjcbplanqy:[{},{}]｝
export function editZxjcplan(parameter){
  // this.tableIsLoading=true
  return axios({
    url: '/other/Ajjjx.editJcplan.json',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

//启用专项检查计划
//param1:专项计划ID
export function startZxjcplan(parameter){
  // this.tableIsLoading=true
  return axios({
    url: '/other/Ajjjx.startJcplan.json',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
//停用专项检查计划
//param1:专项计划ID
export function stopZxjcplan(parameter){
  // this.tableIsLoading=true
  return axios({
    url: '/other/Ajjjx.stopJcplan.json',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

//删除专项检查计划
//jsonData
export function delZxjcplan(parameter){
  // this.tableIsLoading=true
  return axios({
    url: '/other/Ajjjx.delJcplan.json',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

//新增专项检查计划中的检查项
//jsonData
export function addZxjcJcx (parameter){
  // this.tableIsLoading=true
  return axios({
    url: '/other/Ajjjx.savePlanJcb.jsonp',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

//删除专项检查计划中的检查项
//jsonData
export function delZxjcplanJcx(parameter){
  // this.tableIsLoading=true
  return axios({
    url: '/other/Ajjjx.delPlanJcb.jsonp',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

//新增专项检查计划中的检查企业
//jsonData
export function addZxjcQy (parameter){
  // this.tableIsLoading=true
  return axios({
    url: '/other/Ajjjx.saveJcplandw.jsonp',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

//删除专项检查计划中的检查企业
//jsonData
export function delZxjcplanQy(parameter){
  // this.tableIsLoading=true
  return axios({
    url: '/other/Ajjjx.delplandw.jsonp',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

//查询一次性专项检查进度及统计
// 参数：param1:专项计划ID
export function queryZxtj (parameter) {
  // this.tableIsLoading=true
  return axios({
    url: '/other/Ajjjx.queryZxtj.json',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

//查询周期性专项检查进度及统计
// 参数：param1:专项计划ID
export function queryZxtjzq (parameter) {
  // this.tableIsLoading=true
  return axios({
    url: '/other/Ajjjx.queryZxtjzq.json',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

//------------------------------------------------------------------------------四个百分率----------------------------------------------------------------------------

//查询四个百分率 （顶级组织）
export function reqSgbfl (parameter) {
  // this.tableIsLoading=true
  return axios({
    url: '/other/Ajj.sgbflByDept2.json',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}


//查询指定组织下的各子组织四个百分率

export function reqDepartSgbfl (parameter) {
  // this.tableIsLoading=true
  return axios({
    url: '/other/Ajj.sgbflByDept.json',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}