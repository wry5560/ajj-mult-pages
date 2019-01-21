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
    params: {"sqlId":'S360003',...parameter},
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


