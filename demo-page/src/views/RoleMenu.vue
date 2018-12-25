<template>
  <div style="width: 300px;height: 100%;position: relative">
    <a-menu
      style="width: 300px;height: 100%"
      @click="handleClick"
      :defaultSelectedKeys="['1']"
      :openKeys.sync="openKeys"
      mode="inline"
      theme="light"
    >
      <a-menu-item key="menuTitle">
        <a-icon type="idcard" />
        <a-divider type="vertical" />
        <span>排班人员列表</span>
      </a-menu-item>
      <a-divider :style="{margin:0}"/>
      <a-sub-menu v-for="item in renyuanList" :key="item.type" @titleClick="titleClick">
        <span slot="title"><span>{{item.title}}</span></span>
        <a-menu-item v-for="(option,index) in item.nameList" :key="item.type + index">
            {{option}}
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        current: ['mail'],
        openKeys: ['juzhang'],
        renyuanList:[
          {
            type:'juzhang',
            title:'局长',
            nameList:['曾局','王局','张局','李局','席局','陈局']
          },
          {
            type:'zuzhang',
            title:'组长',
            nameList:['吴组长','许组长','张组长','李组长','席组长','陈组长']
          },
          {
            type:'zuyuan',
            title:'组员',
            nameList:['张三','李四','王五','陈六']
          }
        ]
      }
    },
    methods: {
      handleClick (e) {
        console.log('click', e)
      },
      titleClick (e) {
        console.log('titleClick', e)
      },
    },
    watch: {
      openKeys (val) {
        console.log('openKeys', val)
      },
    },
  }

</script>