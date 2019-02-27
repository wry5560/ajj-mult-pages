/**
 * Created by Jeremy Wang on 2019-01-16.
 */
/**
 * Created by Jeremy Wang on 2019-01-03.
 */
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


// param1 sys_relateDepId2  查询流程名称

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

// param1 sys_relateDepId2  查询总流程节点
// param2 sgid
// param3 xbid
export function reqSbLcTotal(parameter) {
  return axios({
    url:  '/base/General.query.json',
    method: 'get',
    params: {sqlId:'S360011',...parameter},
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    // }
  })
}

// 查询所有流程节点
// param1 sgid
// param2 xbid
export function reqAllSbLc(parameter) {
  return axios({
    url:  '/base/General.query.json',
    method: 'get',
    params: {sqlId:'S360009',...parameter},
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
    params: {...parameter},
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    }
  })
}

export function searchKuaiBaoList(parameter) {
  return axios({
    url: process.env.NODE_ENV === 'production'
      ?'/base/General.query.json'
      // : '/kuaibaoList',
      : '/base/General.query.json',
    method: 'post',
    data: {sqlId:'S360006',...parameter},
  })
}
// param1 sys_relateDepId2  查询事故详情
// param2 开关 a.xbid=0 主事故
// param3 开关 a.xbid>0 所有续报
// param4 开关 a.id=id  主事故

export function reqKuaiBaoDetail(parameter) {
  return axios({
    url: process.env.NODE_ENV === 'production'
      ?'/base/General.query.json'
      // : '/kuaibaoList',
      : '/base/General.query.json',
    method: 'get',
    params: {sqlId:'S360008',...parameter},
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
    method: 'get',
    params: parameter,
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

//回复 审核
//param1:id  流程的ID
//param2:feedback 回复内容

export function addSgkbFeedback(parameter){
  // this.tableIsLoading=true
  return axios({
    url: '/other/Ajjsgkb.feedback.json',
    // url: '/sgCommit',
    method: 'get',
    // method: 'post',
    // data: parameter,
    params: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
