/**
 * Created by Jeremy Wang on 2019-01-03.
 */
import { axios } from '@/utils/request'


export function reqSchedule(parameter) {
  return axios({
    url: '/schedule',
    method: 'get',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}