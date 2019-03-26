import {GeneralQuery,GeneralPostQuery,createZuzhi,editZuzhi,delZuzhi,delPlZuzhi,createRole,editRole,delRole,reqRoleMenu,editRoleMenu,createAccount,editAccount,delAccount,resetPassword,forbidAccount,unForbiddenAccount,addUserRole,deleteUserRole,saveDeptWg,saveZzMenu,reqZzMenu} from './api'
import message from 'ant-design-vue/es/message'
const system = {
  state:{
    zuzhiList:{list:[],selectedOptions:[]},
    roleiList:{list:[],selectedOptions:[]},
    accountList:{list:[],selectedOptions:[],roleList:[]}

  },
  mutations: {
    INIT_SYSTEM_ZUZHI: (state, payload) => {
      state.zuzhiList.list=payload
    },
    INIT_SYSTEM_ZUZHI_OPTIONS: (state, payload) => {
      state.zuzhiList.selectedOptions=payload
    },

    INIT_SYSTEM_ROLE: (state, payload) => {
      state.roleiList.list=payload
    },
    INIT_SYSTEM_ROLE_OPTIONS: (state, payload) => {
      state.roleiList.selectedOptions=payload
    },

    INIT_SYSTEM_ACCOUNT: (state, payload) => {
      state.accountList.list=payload
    },
    INIT_SYSTEM_ACCOUNT_OPTIONS: (state, payload) => {
      state.accountList.selectedOptions=payload
    },
    INIT_SYSTEM_ACCOUNTROLE: (state, payload) => {
      state.accountList.roleList=payload
    },
  },

  actions: {

//----------------------------------------------------------------------------组织管理----------------------------------------------------------------------------------

    //查询组织列表
    reqZuzhiList:({commit},params)=>{
      return new Promise((resolve, reject) => {
        const parameter={
          sqlId:'S350005',
          param2:sys_relateDepId5,
          limit:10000,
          ...params
        }
        GeneralPostQuery(parameter)
          .then((res)=>{
            if(res.success){
              res.data.forEach((item)=>{
                item.key=item.id
              })
              commit('INIT_SYSTEM_ZUZHI',res.data)
              resolve(res)
            }else{
              message.error(res.message)
            }
          })
      })
    },

    //新增组织
    createZuzhi:(store,params)=>{
      return new Promise((resolve, reject) => {
        //这里可以增加通用参数，如部门id等
        const parameter={
          param1:sys_relateDepId2,
          ...params
        }
        createZuzhi(parameter)
          .then((res)=>{
            resolve(res)
          })
      })
    },

    //修改组织
    editZuzhi:(store,params)=>{
      return new Promise((resolve, reject) => {
        //这里可以增加通用参数，如部门id等
        const parameter={
          ...params
        }
        editZuzhi(parameter)
          .then((res)=>{
            resolve(res)
          })
      })
    },

    //删除组织
    delZuzhi:(store,params)=>{
      return new Promise((resolve, reject) => {
        //这里可以增加通用参数，如部门id等
        const parameter={
          ...params
        }
        delZuzhi(parameter)
          .then((res)=>{
            resolve(res)
          })
      })
    },

    //批量删除组织
    delMutilZuzhi:(store,params)=>{
      return new Promise((resolve, reject) => {
        //这里可以增加通用参数，如部门id等
        const parameter={
          ...params
        }
        delPlZuzhi(parameter)
          .then((res)=>{
            resolve(res)
          })
      })
    },

//----------------------------------------------------------------------------角色管理----------------------------------------------------------------------------------
    //查询角色列表
    // menuId: sys_menuId
    // param1: "1"
    // param2: "9361"
    // sqlId: "S350007"
    reqRoleiList:({commit},params)=>{
      return new Promise((resolve, reject) => {
        const parameter={
          sqlId:'S350007',
          menuId:sys_menuId,
          param1:userLevel,
          param2:sys_relateDepId5,
          limit:10000,
          ...params
        }
        GeneralPostQuery(parameter)
          .then((res)=>{
            if(res.success){
              res.data.forEach((item)=>{
                item.key=item.id
              })
              commit('INIT_SYSTEM_ROLE',res.data)
              resolve(res)
            }else{
              message.error(res.message)
            }
          })
      })
    },

    //新增角色
    createRole:(store,params)=>{
      return new Promise((resolve, reject) => {
        //这里可以增加通用参数，如部门id等
        const parameter={
          ...params
        }
        createRole(parameter)
          .then((res)=>{
            resolve(res)
          })
      })
    },

    //修改角色
    editRole:(store,params)=>{
      return new Promise((resolve, reject) => {
        //这里可以增加通用参数，如部门id等
        const parameter={
          ...params
        }
        editRole(parameter)
          .then((res)=>{
            resolve(res)
          })
      })
    },

    //删除角色
    delRole:(store,params)=>{
      return new Promise((resolve, reject) => {
        //这里可以增加通用参数，如部门id等
        const parameter={
          ...params
        }
        delRole(parameter)
          .then((res)=>{
            resolve(res)
          })
      })
    },

    //查询角色菜单列表
    reqRoleMenu:(store,params)=>{
      return new Promise((resolve, reject) => {
        //这里可以增加通用参数，如部门id等
        const parameter={
          param1: '0',
          param3: 'role',
          limit: 100000,
          ...params
        }
        reqRoleMenu(parameter)
          .then((res)=>{
            resolve(res)
          })
      })
    },
    //查询部门菜单列表
    reqDepartMenu:(store,params)=>{
      return new Promise((resolve, reject) => {
        //这里可以增加通用参数，如部门id等
        const parameter={
          sqlId:'S350039',
          limit: 100000,
          ...params
        }
        GeneralPostQuery(parameter)
          .then((res)=>{
            resolve(res)
          })
      })
    },
    //修改角色授权
    editRoleMenu:(store,params)=>{
      return new Promise((resolve, reject) => {
        //这里可以增加通用参数，如部门id等
        const parameter={
          param4: 'role',
          ...params
        }
        editRoleMenu(parameter)
          .then((res)=>{
            resolve(res)
          })
      })
    },

    //----------------------------------------------------------------------------用户管理----------------------------------------------------------------------------------

    //请求组织架构信息
    reqZuzhiData:(store,params)=>{
      return new Promise((resolve, reject) => {
        //这里可以增加通用参数，如部门id等
        console.log('sys_relateDepId2:'+ sys_relateDepId2 )
        const parameter={
          sqlId: 'S350006',
          param2: sys_relateDepId2,
          limit: 10000,
          ...params
        }
        GeneralPostQuery(parameter)
          .then((res)=>{
            resolve(res)
          })
      })
    },

    //查询用户列表
    // menuId: sys_menuId
    // param1:  departId
    // sqlId: "S620061"
    reqAccountList:({commit},params)=>{
      return new Promise((resolve, reject) => {
        const parameter={
          sqlId:'S620061',
          menuId:sys_menuId,
          limit:10000,
          ...params
        }
        GeneralPostQuery(parameter)
          .then((res)=>{
            if(res.success){
              res.data.forEach((item)=>{
                item.key=item.id
              })
              commit('INIT_SYSTEM_ACCOUNT',res.data)
              resolve(res)
            }else{
              message.error(res.message)
            }
          })
      })
    },

    //查询用户权限列表
    // menuId: sys_menuId
    // param1:  所选用户的id
    // sqlId: "S350010"
    // param3: sys_relateDepId2
    reqAccountRoleList:({commit},params)=>{
      return new Promise((resolve, reject) => {
        const parameter={
          sqlId:'S350010',
          menuId:sys_menuId,
          limit:10000,
          param3: sys_relateDepId2,
          ...params
        }
        GeneralPostQuery(parameter)
          .then((res)=>{
            if(res.success){
              res.data.forEach((item)=>{
                item.key=item.id
              })
              commit('INIT_SYSTEM_ACCOUNTROLE',res.data)
              resolve(res)
            }else{
              message.error(res.message)
            }
          })
      })
    },
    //新增用户
    //param1: "{storeMap1:{"departmentId":9361,"name":"我看行","sex":"M","loginid":"我看行","mobilephone":"13766667777"}}"
    createAccount:(store,params)=>{
      return new Promise((resolve, reject) => {
        //这里可以增加通用参数，如部门id等
        const parameter={
          ...params
        }
        createAccount(parameter)
          .then((res)=>{
            resolve(res)
          })
      })
    },

    //修改用户
    //param1:"{storeMap1:{"sex":"M","phone":null,"cpaRelation":null,"hrDepart":null,"__ddepartmentid":{"areaid":"横琴","companyId":"555555","companyNm":"客户","departId":"9361","departName":"区安监局","firstItemId":"2","firstItemName":"演示企业","fullPath":"2|9361|","isRH":null,"ltype":"0","relateDep1Id":"9361","relateDep2Id":"9361","relateDep3Id":"9361","relateDep4Id":"9361","relateDep5Id":"9361","shortNm":"横琴","topManageDepId":"2","topManageDepName":null},"sortNum":null,"id":3115,"mobilephone":"13766667777","rank":null,"bornDate":null,"name":"我看行1","cpaState":null,"hrDeptCode018":null,"departmentid":"9361","post":null,"hrDeptCode019":null,"loginid":"我看行","roleids":"98","isActive":"1","diploma":null,"pwd":"已修改","hrId":null,"isCpa":null,"email":null,"isLXCpa":null,"roles":"普通员工","educational":null,"hrLoginId":null,"cpano":null,"checked":false,"departmentId":9361}}"

    editAccount:(store,params)=>{
      return new Promise((resolve, reject) => {
        //这里可以增加通用参数，如部门id等
        const parameter={
          ...params
        }
        editAccount(parameter)
          .then((res)=>{
            resolve(res)
          })
      })
    },

    //删除用户
    // param1: id
    delAccount:(store,params)=>{
      return new Promise((resolve, reject) => {
        //这里可以增加通用参数，如部门id等
        const parameter={
          ...params
        }
        delAccount(parameter)
          .then((res)=>{
            resolve(res)
          })
      })
    },

    //重置密码
    // param1: id
    resetPassword:(store,params)=>{
      return new Promise((resolve, reject) => {
        //这里可以增加通用参数，如部门id等
        const parameter={
          ...params
        }
        resetPassword(parameter)
          .then((res)=>{
            resolve(res)
          })
      })
    },

    //禁用用户
    // param1: id
    forbidAccount:(store,params)=>{
      return new Promise((resolve, reject) => {
        //这里可以增加通用参数，如部门id等
        const parameter={
          ...params
        }
        forbidAccount(parameter)
          .then((res)=>{
            resolve(res)
          })
      })
    },

    //还原用户
    // param1: id
    unForbiddenAccount:(store,params)=>{
      return new Promise((resolve, reject) => {
        //这里可以增加通用参数，如部门id等
        const parameter={
          ...params
        }
        unForbiddenAccount(parameter)
          .then((res)=>{
            resolve(res)
          })
      })
    },

    //用户授权
    // param1: 用户id
    // param2: 权限id
    addUserRole:(store,params)=>{
      return new Promise((resolve, reject) => {
        //这里可以增加通用参数，如部门id等
        const parameter={
          ...params
        }
        addUserRole(parameter)
          .then((res)=>{
            resolve(res)
          })
      })
    },

    //取消授权
    // param1: 用户id
    // param2: 权限id
    deleteUserRole:(store,params)=>{
      return new Promise((resolve, reject) => {
        //这里可以增加通用参数，如部门id等
        const parameter={
          ...params
        }
        deleteUserRole(parameter)
          .then((res)=>{
            resolve(res)
          })
      })
    },




    //----------------------------------------------------------------------------网格管理----------------------------------------------------------------------------------

    //查询辖区网格列表
    reqWanggeList:({commit},params)=>{
      return new Promise((resolve, reject) => {
        const parameter={
          sqlId: "S350001.wg",
          param2: sys_relateDepId5,
          limit: 10000,
          ...params
        }
        GeneralPostQuery(parameter)
          .then((res)=>{
            resolve(res)
          })
      })
    },


    //----------------------------------------------------------------------------网格分配----------------------------------------------------------------------------------

    // //查询网格列表
    // "sqlId": "S350001.wgfp",
    // "param2": sys_relateDepId5,
    // "param3": $scope.service.seldeptid,
    reqWgfpList:({commit},params)=>{
      return new Promise((resolve, reject) => {
        const parameter={
          "sqlId": "S350001.wgfp",
          "param2": sys_relateDepId5,
          limit: 10000,
          ...params
        }
        GeneralPostQuery(parameter)
          .then((res)=>{
              resolve(res)
          })
      })
    },

    editWgfp:({commit},params)=>{
      return new Promise((resolve, reject) => {
        const parameter={
          ...params
        }
        saveDeptWg(parameter)
          .then((res)=>{
            resolve(res)
          })
      })
    },

    //----------------------------------------------------------------------------功能分配----------------------------------------------------------------------------------
    // //查询组织功能列表
    // "param1": 组织id
    reqZzMenuList:({commit},params)=>{
      return new Promise((resolve, reject) => {
        const parameter={
          limit: 100000,
          ...params
        }
        reqZzMenu(parameter)
          .then((res)=>{
            resolve(res)
          })
      })
    },

    editZzMenu:({commit},params)=>{
      return new Promise((resolve, reject) => {
        const parameter={
          ...params
        }
        saveZzMenu(parameter)
          .then((res)=>{
            resolve(res)
          })
      })
    },

    },



  getters:{
    //----------------------------------------------------------------------------组织管理----------------------------------------------------------------------------------


    system_zuzhi_list:(state) => {
      // state.jcx.list.forEach(item=>item.departName=item.__ddepartmentid.departName)
      return state.zuzhiList.list
    },

    getZuzhiById:(state)=>(id)=> {
      return state.zuzhiList.list.find( todo=> todo.id==id)
    },

    system_zuzhi_selOptions:(state)=>{
      const selOptions={}
      state.zuzhiList.selectedOptions.forEach(option=>{
        selOptions[option.name]=[]
        if(option.value&&option.value.length>0){option.value.forEach(item=>{
          selOptions[option.name].push({label:item.label,value:item.value})
        })}
      })
      return selOptions
    },


    //----------------------------------------------------------------------------角色管理----------------------------------------------------------------------------------


    system_role_list:(state) => {
      state.roleiList.list.forEach(item=>item.departName=item.__ddepartmentId.departName)
      return state.roleiList.list
    },

    getRoleById:(state)=>(id)=> {
      return state.roleiList.list.find( todo=> todo.id==id)
    },

    system_role_selOptions:(state)=>{
      const selOptions={}
      state.roleiList.selectedOptions.forEach(option=>{
        selOptions[option.name]=[]
        if(option.value&&option.value.length>0){option.value.forEach(item=>{
          selOptions[option.name].push({label:item.label,value:item.value})
        })}
      })
      return selOptions
    },


    //----------------------------------------------------------------------------用户管理----------------------------------------------------------------------------------


    system_account_list:(state) => {
      state.accountList.list.forEach(item=>item.departName=item.__ddepartmentid.departName)
      return state.accountList.list
    },
    system_accountRole_list:(state) => {
      // state.accountList.roleList.forEach(item=>item.departName=item.__ddepartmentid.departName)
      return state.accountList.roleList
    },

    getAccountById:(state)=>(id)=> {
      return state.accountList.list.find( todo=> todo.id==id)
    },

    system_account_selOptions:(state)=>{
      const selOptions={}
      state.accountList.selectedOptions.forEach(option=>{
        selOptions[option.name]=[]
        if(option.value&&option.value.length>0){option.value.forEach(item=>{
          selOptions[option.name].push({label:item.label,value:item.value})
        })}
      })
      return selOptions
    },
  }
}

export default system