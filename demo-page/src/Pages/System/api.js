
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


//批量删除组织
//param1: 组织id组成的字符串 如“9063,9078”

export function delPlZuzhi(parameter) {
  return axios({
    url: '/other/AjjDepartment.pldelAjjzz.json',
    method: 'post',
    data:{
      ...parameter
    },
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

//----------------------------------------------------------------------------角色管理----------------------------------------------------------------------------------
//新增角色
//jsonData

export function createRole(parameter) {
  return axios({
    url: '/other/AjjSystem.createRole.json',
    method: 'post',
    data:{
      ...parameter
    },
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

//修改角色
//jsonData

export function editRole(parameter) {
  return axios({
    url: '/other/AjjSystem.editRole.json',
    method: 'post',
    data:{
      ...parameter
    },
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

//删除角色
//jsonData

export function delRole(parameter) {
  return axios({
    url: '/other/AjjSystem.delRole.json',
    method: 'post',
    data:{
      ...parameter
    },
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

//查询角色所属部门列表
//sqlId: "S350036"

export function reqRoleSsbm(parameter) {
  return axios({
    url: '/base/general.query.json',
    method: 'post',
    data:{
      sqlId: "S350036",
      limit:10000,
      ...parameter
    },
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

//查询角色授权菜单列表
// param1: '0',
//   param3: 'role',
//   param4: item.id,
//   param25 : item.__ddepartmentId.departId,

export function reqRoleMenu(parameter) {
  return axios({
    url: '/other/AjjSystem.queryMenuAuth.json',
    method: 'post',
    data:{
      ...parameter
    },
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

//修改角色授权菜单列表
// param1: jsonData1, 添加的菜单
//   param2: jsonData2, 删除的菜单
//   param3: $scope.service.role.id,
//   param4:'role'

export function editRoleMenu(parameter) {
  return axios({
    url: '/other/AjjSystem.doMenuAuth.jsonp',
    method: 'post',
    data:{
      ...parameter
    },
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}


//下载导出的文件
// param1: url 文件相对路径

export function downloadExportFile(parameter) {
  return axios({
    url: '/other/FileManager.downloadfilepdf.json',
    method: 'get',
    params: parameter,
    responseType : "arraybuffer"
  })
}


//----------------------------------------------------------------------------用户管理----------------------------------------------------------------------------------


//新增用户


export function createAccount(parameter) {
  return axios({
    url: '/other/AjjDepartment.addUser.json',
    method: 'post',
    data:{
      ...parameter
    },
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

//修改用户


export function editAccount(parameter) {
  return axios({
    url: '/other/AjjDepartment.editUser.json',
    method: 'post',
    data:{
      ...parameter
    },
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

//删除用户


export function delAccount(parameter) {
  return axios({
    url: '/other/AjjDepartment.delUserInfo.json',
    method: 'post',
    data:{
      ...parameter
    },
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

//重置密码


export function resetPassword(parameter) {
  return axios({
    url: '/admin/KUser.initPwd.json',
    method: 'post',
    data:{
      ...parameter
    },
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
//禁用用户


export function forbidAccount(parameter) {
  return axios({
    url: '/other/AjjDepartment.forbidden.json',
    method: 'post',
    data:{
      ...parameter
    },
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

//还原用户


export function unForbiddenAccount(parameter) {
  return axios({
    url: '/other/AjjDepartment.unForbidden.json',
    method: 'post',
    data:{
      ...parameter
    },
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}


//用户授权

export function addUserRole(parameter) {
  return axios({
    url: '/admin/UserRole.addJS.json',
    method: 'post',
    data:{
      ...parameter
    },
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}


//取消授权

export function deleteUserRole(parameter) {
  return axios({
    url: '/admin/UserRole.deleteJS.json',
    method: 'post',
    data:{
      ...parameter
    },
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}