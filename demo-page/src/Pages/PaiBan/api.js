/**
 * Created by Jeremy Wang on 2019-01-03.
 */
import { axios } from '@/utils/request'
import Qs from 'qs'

export function reqSchedule(parameter) {
  return axios({
    url: process.env.NODE_ENV === 'production'
      ?'/base/General.query.json'
      // : '/base/General.query.json/reqSchedule',
      : '/base/General.query.json',
    method: 'get',
    params: {"sqlId":'S360001',...parameter},
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    // }
  })
}

export function reqWholeSchedule(parameter) {
  return axios({
    url: process.env.NODE_ENV === 'production'
      ?'/base/General.query.json'
      // : '/base/General.query.json/reqSchedule',
      : '/base/General.query.json',
    method: 'get',
    params: {"sqlId":'S360014',...parameter},
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    // }
  })
}

//获取已排班的年份
export function reqPbYear(parameter){
  return axios({
    url: process.env.NODE_ENV === 'production'
      ?'/base/General.query.json'
      // : '/base/General.query.json/reqStaffList',
      : '/base/General.query.json',
    method: 'get',
    params:{"sqlId":'S360012',...parameter},
  })
}
//获取已排班的月份
export function reqPbMonth(parameter){
  return axios({
    url: process.env.NODE_ENV === 'production'
      ?'/base/General.query.json'
      // : '/base/General.query.json/reqStaffList',
      : '/base/General.query.json',
    method: 'get',
    params:{"sqlId":'S360013',...parameter},
  })
}
export function reqStaffList(parameter){
  return axios({
    url: process.env.NODE_ENV === 'production'
      ?'/base/General.query.json'
      // : '/base/General.query.json/reqStaffList',
      : '/base/General.query.json',
    method: 'get',
    params:{"sqlId":'S360002',...parameter},
  })
}
export function reqAllStaff(parameter){
  return axios({
    url: process.env.NODE_ENV === 'production'
      ?'/base/General.query.json'
      // : '/base/General.query.json/reqStaffList',
      : '/base/General.query.json',
    method: 'get',
    params: {"sqlId":'S360003','limit':'10000',...parameter},
  })
}
export function postSchedule(parameter){
  // this.tableIsLoading=true
  return axios({
    url: '/other/Ajjsgkb.savePaiban.jsonp',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function levelName(parameter){
  return axios({
    url: 'other/Ajjsgkb.saveAlias.jsonp',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function postChangeLevel(parameter){
  return axios({
    url: 'other/Ajjsgkb.addPaibanuser.json',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
export function delPaibanLevelMan(parameter){
  return axios({
    url: 'other/Ajjsgkb.delPaibanuser.json',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}


