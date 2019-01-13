<template>
  <div style="width: 250px;height: 100%;position: relative">
    <a-menu
      style="width: 250px;height: 100%"
      @click="handleClick"
      :defaultSelectedKeys="['1']"
      mode="inline"
      theme="light"
      :defaultOpenKeys="['一级','二级','三级','四级','五级']"
    >
      <!--&lt;!&ndash;:openKeys.sync="openKeys"&ndash;&gt; //只展开一个二级选项的写法-->
      <a-menu-item key="menuTitle">
        <a-icon type="idcard" />
        <a-divider type="vertical" />
        <span>排班人员顺序表</span>
      </a-menu-item>
      <a-divider :style="{margin:0}"/>
      <a-sub-menu v-for="item in staffListProp" :key="item.type"  v-if="item.nameList.length>0"@titleClick="titleClick">
        <span slot="title"><span>{{ item.titleText }}</span></span>
        <a-menu-item v-for="(option,index) in item.nameList" :key="item.type + index" :style="{'padding-left':'30px'}">
          <span style="max-width: 120px;display:inline-block;overflow: hidden;white-space: nowrap;text-overflow:ellipsis">{{ option.name }}</span>
          <span style="float:right;margin-right: 0px">
          <!--<a-icon v-if="option.mobilePhone!==''" theme="filled" style="color:#89c481; margin-right: 2px" type="phone" />-->
          {{option.mobilePhone}}
        </span>
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>
<script>
//  import { axios } from '@/utils/request'

  export default {
    props:{
      staffListProp:Array
    },
    data () {
      return {
        current: ['mail'],
        openKeys: ['juzhang'],

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