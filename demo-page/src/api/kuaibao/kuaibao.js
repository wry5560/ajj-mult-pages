/**
 * Created by Jeremy Wang on 2019-01-16.
 */
/**
 * Created by Jeremy Wang on 2019-01-03.
 */
import { axios } from '@/utils/request'
import Qs from 'qs'

export function reqKuaiBaoList(parameter) {
  return axios({
    url: process.env.NODE_ENV === 'production'
      ?'/base/General.query.json'
      // : '/base/General.query.json/reqSchedule',
      : '/kuaibaoList',
    method: 'get',
    params: parameter,
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    // }
  })
}


export function postSchedule(parameter){
  // this.tableIsLoading=true
  return axios({
    url: '/sgCommit',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

