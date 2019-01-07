<template>
  <div style="width: 200px;height: 100%;position: relative">
    <a-menu
      style="width: 200px;height: 100%"
      @click="handleClick"
      :defaultSelectedKeys="['1']"
      :openKeys.sync="openKeys"
      mode="inline"
      theme="light"
    >
      <a-menu-item key="menuTitle">
        <a-icon type="idcard" />
        <a-divider type="vertical" />
        <span>排班人员顺序表</span>
      </a-menu-item>
      <a-divider :style="{margin:0}"/>
      <a-sub-menu v-for="item in staffList" :key="item.type" @titleClick="titleClick">
        <span slot="title"><span>{{ item.titleText }}</span></span>
        <a-menu-item v-for="(option,index) in item.nameList" :key="item.type + index">
          {{ option }}
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>
<script>
  import { axios } from '@/utils/request'
  export default {
    data () {
      return {
        current: ['mail'],
        openKeys: ['juzhang'],
        staffList:[]
      }
    },
    mounted(){
      this.initStaffList()
    },
    methods: {
      handleClick (e) {
        console.log('click', e)
      },
      titleClick (e) {
        console.log('titleClick', e)
      },
      initStaffList(){
        this.reqStaffList()
          .then((res)=>{
            console.log(JSON.stringify(res))
            this.staffList=res.staffList
          })
          .catch((err)=>{
          })
      },
      reqStaffList(parameter){
        // this.tableIsLoading=true
        return axios({
          url: '/staffList',
          method: 'get',
          data: parameter,
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        })
      }
    },
    watch: {
      openKeys (val) {
        console.log('openKeys', val)
      },
    },

  }

</script>