
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

//通用归档接口
// 参数：jsonDate：｛
// gdfl:’’ 归档类型1（先随便弄吧）,
// gdfl2:’’ 归档类型2（先随便弄吧）,
// gdbustype:’’业务类型 目前4个(企业检查、日常工作、事故快报、安监业务),
// gdtime:’’   归档时间
// ｝
// Param1:ids（选择的业务数据id）
export function guiDang(parameter) {
  return axios({
    url: '/other/Ajjgd.saveGdZf.json',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}


// //复查
// //   param1: jsondata,
// //   param2: sys_relateDepId2,
// export function createFcDetail(parameter) {
//   return axios({
//     url: '/other/Ajjjx.saveJcdfc.jsonp',
//     method: 'post',
//     data: parameter,
//     headers: {
//       'Content-Type': 'application/json;charset=UTF-8'
//     }
//   })
// }



