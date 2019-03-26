
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

//检查单导出word接口
//导出请求
//jsonData: 导出数据
//param1: 模版
//param2： menuID

export function exportWord(parameter) {
  return axios({
    url: '/Export.exportWord.jsonp',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

//复查单导出word接口
//导出请求
//jsonData: 导出数据
//param1: 模版
//param2： menuID

export function exportFcWord(parameter) {
  return axios({
    url: '/Export.exportfcWord.jsonp',
    method: 'post',
    data: parameter,
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

//查询选择项的子选项
//jsonData
export function GeneralQuerySelChildren (parameter,type) {
  let url=''
  switch (type){
    case 0:
      url='/other/Ajj.queryQylx2.json'
          break
    case 1:
      url='/other/Ajj.queryGmjjhyfl2.json'
          break
    case 2:
      url='/other/Ajj.queryGmjjhyfl3.json'
          break
    case 3:
      url='/other/Ajj.queryGmjjhyfl4.json'
  }

  return axios({
    url:url,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

//查询检查表详情
  //   param1: qyid,
  //   param2: sys_relateDepId2,
  //   param3: zxid,
  //   param4: gdlx,
export function reqZfjcbDetail(parameter) {
  return axios({
    url: '/other/Ajjjx.queryZfjc.json',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
//查询检查记录详情
  //   param1: 记录id,
export function reqJcjlDetail(parameter) {
  return axios({
    url: '/other/Ajjjx.queryZffc.json',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
//查询检查信息（在检查查询的修改中使用）
//   param1: 记录id,
export function reqJcxx(parameter) {
  return axios({
    url: '/other/Ajjjx.queryJcxx.json',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

//删除附件
//   param1: serverId,
//   param2: tyoe 2

export function rmFile(parameter) {
  return axios({
    url: '/other/FileManager.delfile.json',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

//检查单（检查完成后推送详情新建检查单）
//   param1: jsondata,
//   param2: sys_relateDepId2,
export function createJcDetail(parameter) {
  return axios({
    url: '/other/Ajjjx.saveJcd.jsonp',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

//复查
//   param1: jsondata,
//   param2: sys_relateDepId2,
export function createFcDetail(parameter) {
  return axios({
    url: '/other/Ajjjx.saveJcdfc.jsonp',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}



