<template>
  <div class="index" style="height: 100%">
    <a-layout class="layout">
      <a-layout-sider width="220px" :style="{position:'fixed',height:'100%',overflow:'auto'}">
        <role-menu :staffListProp="staffList"></role-menu>
      </a-layout-sider>
      <a-layout-content :style="{ 'padding-left': '220px',overflow:'auto'}">
        <task-table :staffListProp="staffList" :reqStaffListComplete="reqStaffListComplete" @onTitleChange="titleChange"></task-table>
        <!--<test-table></test-table>-->
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script>
  // @ is an alias to /src
//引入组件
//  import Trend from '@/components/Trend'
 import RoleMenu from './RoleMenu'
 import TaskTable from './TaskTable'
 import {loginAjj}from "@/api/login"
 import {reqStaffList,levelName} from './api'

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
          {type:'一级',titleText:'',nameList:[]},
          {type:'二级',titleText:'',nameList:[]},
          {type:'三级',titleText:'',nameList:[]},
          {type:'四级',titleText:'',nameList:[]},
          {type:'五级',titleText:'',nameList:[]}
        ],
        reqStaffListComplete:false
      }
    },
    beforeCreate(){
//        if(process.env.NODE_ENV === 'production'){console.log('departmentId:'+departmentId)}
      const parameter={
        limit:'10000',
        param1:departmentId
//        param1:process.env.NODE_ENV === 'production'? departmentId:'9361'
      }
      reqStaffList(parameter)
        .then((res)=>{
//            debugger
//           console.log(JSON.stringify(res))
          const staffList =[...this.staffList]
          res.data.forEach(item=>{
            staffList.forEach(level=>{
              if (level.type===item.userlevel) {
                level.nameList.push({name:item.name,id:item.id,sex:item.sex,mobilePhone:item.mobilePhone})
              }
            })
          })
          staffList[0].titleText=res.data[0].lv1name;
          staffList[1].titleText=res.data[0].lv2name;
          staffList[2].titleText=res.data[0].lv3name;
          staffList[3].titleText=res.data[0].lv4name;
          staffList[4].titleText=res.data[0].lv5name;
          this.staffList=staffList
          this.reqStaffListComplete=true
        })
        .catch((err)=>{
        })
    },
    methods: {
      initStaffList(){
        const parameter={
          limit:'10000',
          param1:departmentId,
//          param1:process.env.NODE_ENV === 'production'? departmentId:'9361'
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
      titleChange(data){
        // debugger
        const text=data[0]
        const textIndex=data[1]
        const nameData={}
        nameData['lv'+ `${ Number(textIndex)+1 }` +'name']=text
        const parameter={
          jsonData:JSON.stringify(nameData),
          param1:departmentId
//          param1:process.env.NODE_ENV === 'production'? departmentId:'9361'
        }
        const lastText=this.staffList[textIndex].titleText
        this.staffList[textIndex].titleText=text
        levelName(parameter)
          .then((res)=>{
            if(res.success){
              this.$message.success('修改成功')
            }else{
              this.$message.error(res.message)
              this.staffList[textIndex].titleText=lastText
            }
          })
      }
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
    background: none;
  }
</style>
