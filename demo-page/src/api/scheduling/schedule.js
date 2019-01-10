/**
 * Created by Jeremy Wang on 2019-01-03.
 */
import { axios } from '@/utils/request'


export function reqSchedule(parameter) {
  return axios({
    url: '/base/General.query.json/reqSchedule',
    // url: '/base/General.query.json/reqSchedule',
    method: 'get',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function reqStaffList(parameter){
  // this.tableIsLoading=true
  return axios({
    url: '/base/General.query.json/reqStaffList',
    // url: '/base/General.query.json',
    method: 'get',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
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

