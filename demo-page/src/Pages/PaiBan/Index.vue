<template>
  <div class="index" style="height: 100%">
    <a-layout class="layout">
      <a-layout-sider width="160px" :style="{position:'fixed',height:'100%',overflow:'auto'}">
        <div style="width: 160px;height: 100%;position: relative">
          <a-menu
            style="width: 160px;height: 100%"
            mode="inline"
            theme="light"
            :openKeys="openKeys"
            v-model="selKey"
          >
            <!--&lt;!&ndash;:openKeys.sync="openKeys"&ndash;&gt; //只展开一个二级选项的写法-->
            <a-menu-item key="menuTitle">
              <a-icon type="idcard" />
              <a-divider type="vertical" />
              <span>已排班月份</span>
            </a-menu-item>
            <a-divider :style="{margin:0}"/>
            <a-sub-menu  v-for="year in years" :key="year.paibandateyear" @titleClick="titleClick">
              <span slot="title"><span>{{ year.paibandateyear }}</span></span>
              <a-menu-item v-if="year.months" v-for="(month,index) in year.months" :key="month.paibandatemonth" :style="{'padding-left':'30px'}" @click="clickMonth">
                <span style="max-width: 100px;display:inline-block;overflow: hidden;white-space: nowrap;text-overflow:ellipsis">{{ month.paibandatemonth }}</span>
              </a-menu-item>
            </a-sub-menu>
          </a-menu>
        </div>
      </a-layout-sider>
      <a-layout-content :style="{ 'padding-left': '160px',overflow:'auto'}">
        <task-table :selMonth="selMonth":staffListProp="staffList" :reqStaffListComplete="reqStaffListComplete" @onTitleChange="titleChange"@refresh="refresh" @changeTime="rmSelMonth"></task-table>
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
 import {reqPbYear,reqPbMonth,levelName,reqAllStaff} from './api'

  export default {
    name: 'Index',
    components: {
      RoleMenu,
      TaskTable
    },
    data () {
      return {
        pagename:'index',
        years:[],
        openKeys:[],
        selMonth:'',
        selKey:[],
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
    created(){
//        if(process.env.NODE_ENV === 'production'){console.log('departmentId:'+departmentId)}
      const parameter={
        param1:sys_relateDepId2
//        param1:process.env.NODE_ENV === 'production'? departmentId:'9361'
      }
      this.initPbMonth()
      this.initStaffList()
    },
    methods: {
        refresh(){
          this.initPbMonth()
          let a=0
          this.yesars.forEach(year=>{
            year.months.forEach(month=>{
              a= month.paibandatemonth==this.openKeys[0] ? 1:0
            })
          })
          if (a==0){
            this.openKeys=[]
          }
          this.initStaffList()
        },
      clickMonth(record){
        this.selMonth=record.key
      },
      rmSelMonth(){
        this.selMonth='',
          this.selKey=[]
      },
      titleClick(obj){
        const temp=this.openKeys.findIndex(i=>i==obj.key)
        temp==-1? this.openKeys.push(obj.key):this.openKeys.splice(temp,1)
      },
      initPbMonth(){
        const parameter={
          param1:sys_relateDepId2
        }
        reqPbYear(parameter)
          .then((res)=>{
            if (res.success){
              res.data.forEach(item=>item.months=[])
              this.years=res.data
              // this.years.push(res.data[0])
              this.years.forEach(year=>{
                const parameter={
                  param1:sys_relateDepId2,
                  param2:year.paibandateyear
                }
                reqPbMonth(parameter)
                  .then((res)=>{
                    if(res.success){
                      year.months=res.data
                    }else{
                      this.$message.error(res.message)
                    }
                  })
                  .catch(err=>console.log(JSON.stringify(err)))
              })
              this.openKeys.push(this.years[0].paibandateyear)
            }else{
              this.$message.error(res.message)
            }
          })
          .catch(err=>console.log(JSON.stringify(err)))
      },
      initStaffList(){
        const parameter={
          limit:'10000',
          param1:sys_relateDepId2,
//          param1:process.env.NODE_ENV === 'production'? departmentId:'9361'
        }
        reqAllStaff(parameter)
          .then((res)=>{
//            debugger
//            console.log(JSON.stringify(res))
            const staffList =[
              {type:'一级',titleText:'',nameList:[]},
              {type:'二级',titleText:'',nameList:[]},
              {type:'三级',titleText:'',nameList:[]},
              {type:'四级',titleText:'',nameList:[]},
              {type:'五级',titleText:'',nameList:[]}
            ]
            res.data.sort((a,b)=>{
                return a.sortNum-b.sortNum
            })
            res.data.forEach(item=>{
              staffList.forEach(level =>{
                if (level.type===item.userlevel) level.nameList.push({name:item.__uuserid.userName,id:item.__uuserid.userId,sex:item.__uuserid.sex,mobilePhone:item.__uuserid.mobilePhone,sortNum:item.sortNum})
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
      titleChange(data){
        // debugger
        const text=data[0]
        const textIndex=data[1]
        const nameData={}
        nameData['lv'+ `${ Number(textIndex)+1 }` +'name']=text
        const parameter={
          jsonData:JSON.stringify(nameData),
          param1:sys_relateDepId2
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
