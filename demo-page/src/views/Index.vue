<template>
  <div class="index" style="height: 100%">
    <a-layout class="layout">
      <a-layout-sider width="250px" :style="{position:'fixed',height:'100%',overflow:'auto'}">
        <role-menu :staffListProp="staffList"></role-menu>
      </a-layout-sider>
      <a-layout-content :style="{ 'padding-left': '250px',overflow:'auto'}">
        <task-table :staffListProp="staffList" :reqStaffListComplete="reqStaffListComplete"></task-table>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script>
  // @ is an alias to /src
//引入组件
//  import Trend from '@/components/Trend'
 import RoleMenu from '@/views/RoleMenu'
 import TaskTable from '@/views/TaskTable'
 import {loginAjj}from "@/api/login"
 import {reqStaffList} from '@/api/scheduling/schedule.js'

  export default {
    name: 'Index',
    components: {
      RoleMenu,
      TaskTable
    },
    data () {
      return {
        pagename:'index',
        staffList:[
          {type:'一级',titleText:'一级',nameList:[]},
          {type:'二级',titleText:'二级',nameList:[]},
          {type:'三级',titleText:'三级',nameList:[]},
          {type:'四级',titleText:'四级',nameList:[]},
          {type:'五级',titleText:'五级',nameList:[]}
        ],
        reqStaffListComplete:false
      }
    },
    beforeCreate(){
      const parameter={
        sqlId:'S360002',
        limit:'10000',
        param1:'9361'
      }
      reqStaffList(parameter)
        .then((res)=>{
//            debugger
          console.log(JSON.stringify(res))
          const staffList =[...this.staffList]
          res.data.forEach(item=>{
            staffList.forEach(level =>{
              if (level.type===item.userlevel) level.nameList.push({name:item.name,id:item.id,sex:item.sex,mobilePhone:item.mobilePhone})
            })
          })
          this.staffList=staffList
          this.reqStaffListComplete=true
        })
        .catch((err)=>{
        })
    },
    methods: {
      initStaffList(){
        const parameter={
          sqlId:'S360002',
          limit:'10000',
          param1:'9361'
        }
        reqStaffList(parameter)
          .then((res)=>{
//            debugger
            console.log(JSON.stringify(res))
            const staffList =[...this.staffList]
            res.data.forEach(item=>{
              staffList.forEach(level =>{
                if (level.type===item.userlevel) level.nameList.push({name:item.name,id:item.id,sex:item.sex,mobilePhone:item.mobilePhone})
              })
            })
            this.staffList=staffList
          })
          .catch((err)=>{
          })
      },
    }
  }
</script>

<style lang="scss" scoped>
  .layout{
    min-height: 100vh !important;
  }
  .index{

  }
  .ant-layout-sider{
    background-color: #ffffff;
  }
</style>
