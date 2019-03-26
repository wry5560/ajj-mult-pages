
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


//----------------------------------------------------------------------------组织管理----------------------------------------------------------------------------------
//新增组织
//param1: 新增组织的基本信息
//param2： 1
//param3： 选中的部门id

export function createZuzhi(parameter) {
  return axios({
    url: '/other/AjjDepartment.addAjjBm.json',
    method: 'post',
    data:{
      param2:1,
      ...parameter
    },
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

//修改组织
//param1: 组织的基本信息

export function editZuzhi(parameter) {
  return axios({
    url: '/other/AjjDepartment.editAjjDep.json',
    method: 'post',
    data:{
      ...parameter
    },
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

//删除组织
//param1: 组织id

export function delZuzhi(parameter) {
  return axios({
    url: '/other/AjjDepartment.delAjjzz.json',
    method: 'post',
    data:{
      ...parameter
    },
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}


