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
    params: parameter,
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
    params: parameter,
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

