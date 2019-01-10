<template>
  <div class="index" style="height: 100%">
    <a-layout class="layout">
      <a-layout-sider width="300px" :style="{position:'fixed',height:'100%',overflow:'auto'}">
        <role-menu :staffList="staffList"></role-menu>
      </a-layout-sider>
      <a-layout-content :style="{ 'padding-left': '300px',overflow:'auto'}">
        <task-table :staffList="staffList"></task-table>
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
        staffList:[]
      }
    },
    mounted(){
      this.initStaffList()
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
            const levelA={type:'一级',titleText:'一级',nameList:[]}
            const levelB={type:'二级',titleText:'二级',nameList:[]}
            const levelC={type:'三级',titleText:'三级',nameList:[]}
            const levelD={type:'四级',titleText:'四级',nameList:[]}
            const levelE={type:'五级',titleText:'五级',nameList:[]}
            const staffList =[levelA,levelB,levelC,levelD,levelE]
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
