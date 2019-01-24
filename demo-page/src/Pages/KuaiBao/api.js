/**
 * Created by Jeremy Wang on 2019-01-16.
 */
/**
 * Created by Jeremy Wang on 2019-01-03.
 */
import { axios } from '@/utils/request'
import Qs from 'qs'

// param1 sys_relateDepId2 查询流程节点
export function reqSbLc(parameter) {
  return axios({
    url:  '/base/General.query.json',
    method: 'get',
    params: {sqlId:'S360005',...parameter},
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    // }
  })
}

// param1 sys_relateDepId2  查询事故列表
// param2 开关 未审核
// param3 开关 已审核
// param4 开关 是否需要权限
// param5 开关 主上报
// param6 id 续报 传入主上报id
// limit
// start
export function reqKuaiBaoList(parameter) {
  return axios({
    url: process.env.NODE_ENV === 'production'
      ?'/base/General.query.json'
      // : '/kuaibaoList',
      : '/base/General.query.json',
    method: 'get',
    params: {sqlId:'S360006',...parameter},
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    // }
  })
}

//事故上报
//jsonData 事故详细信息
//param1: "sys_relateDepId2"
export function addSgkb (parameter){
  // this.tableIsLoading=true
  return axios({
    url: '/other/Ajjsgkb.addSgkb.json',
    // url: '/sgCommit',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

//事故审核
//jsonData 事故详细信息
//param1: "res" 审核意见
//param2: "type" 1为通过 9为不通过
export function sgAudit (parameter){
  // this.tableIsLoading=true
  return axios({
    url: '/other/Ajjsgkb.sgaudit.json',
    // url: '/sgCommit',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

//事故续报
//jsonData 事故详细信息
//param1: "sys_relateDepId2"

export function addSgkbxb (parameter){
  // this.tableIsLoading=true
  return axios({
    url: '/other/Ajjsgkb.addSgkbxb.json',
    // url: '/sgCommit',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

