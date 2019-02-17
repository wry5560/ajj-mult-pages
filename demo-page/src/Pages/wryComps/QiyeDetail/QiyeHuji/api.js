
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

//判断企业是否有安全生产信息
//param1:depatmentId  企业的id
export function queryQySfaq(parameter) {
  return axios({
    url: '/other/Ajjguanli.sfaq.json',
    method: 'get',
    params: parameter,
  })
}

//TODO 为什么要用这个接口
//通过企业id 获取企业信息
//param1:depatmentId  企业的id
export function queryAjdwInfoByDepart(parameter) {
  return axios({
    url: '/other/Ajjguanli.queryAjdwInfoByDepart.json',
    method: 'get',
    params: parameter,
  })
}

//编辑辖区企业GPS
//jsonData
export function editXqqyGps (parameter){
  // this.tableIsLoading=true
  return axios({
    url: '/other/Ajjguanli.editDwGps.json',
    method: 'get',
    params: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
// //新增检查项
// //jsonData
// export function createJcx (parameter){
//   // this.tableIsLoading=true
//   return axios({
//     url: '/other/Ajjjx.createJctm.json',
//     method: 'post',
//     data: parameter,
//     headers: {
//       'Content-Type': 'application/json;charset=UTF-8'
//     }
//   })
// }
//
// //编辑检查项
// //jsonData
// export function editJcx (parameter){
//   // this.tableIsLoading=true
//   return axios({
//     url: '/other/Ajjjx.editJctm.json',
//     method: 'post',
//     data: parameter,
//     headers: {
//       'Content-Type': 'application/json;charset=UTF-8'
//     }
//   })
// }
//
// //删除检查项
// //jsonData
// export function delJcx (parameter){
//   // this.tableIsLoading=true
//   return axios({
//     url: '/other/Ajjjx.delJctm.json',
//     method: 'post',
//     data: parameter,
//     headers: {
//       'Content-Type': 'application/json;charset=UTF-8'
//     }
//   })
// }
