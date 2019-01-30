<template>
  <div style="padding-left: 24px">
    <detail-list style="margin-bottom: 16px;margin-top: 16px">
      <detail-list-item term="姓名" :lg="8">{{data.xm}}</detail-list-item>
      <detail-list-item term="性别" :lg="8">{{data.xb}}</detail-list-item>
      <detail-list-item term="出生日期" :lg="8">{{data.csrq}}</detail-list-item>
    </detail-list>
    <detail-list  style="margin-bottom: 16px">
      <detail-list-item term="移动电话" :lg="8">{{data.mobilePhone}}</detail-list-item>
      <detail-list-item term="单位电话" :lg="8">{{data.dwdh}}</detail-list-item>
      <detail-list-item term="住宅电话" :lg="8">{{data.zzdh}}</detail-list-item>
    </detail-list>
    <detail-list  style="margin-bottom: 16px">
      <detail-list-item term="其他联系信息" :lg="8">{{data.qtlxfs}}</detail-list-item>
      <detail-list-item term="最高学历" :lg="8">{{data.zgxl}}</detail-list-item>
      <detail-list-item term="毕业学校" :lg="8">{{data.byxx}}</detail-list-item>
    </detail-list>
    <detail-list  style="margin-bottom: 16px">
      <detail-list-item term="毕业年月" :lg="8">{{data.bynf}}</detail-list-item>
      <detail-list-item term="现工作单位" :lg="8">{{data.gzdw}}</detail-list-item>
      <detail-list-item term="现从事专业" :lg="8">{{data.cszy}}</detail-list-item>
    </detail-list>
    <detail-list  style="margin-bottom: 16px">
      <detail-list-item term="职务" :lg="8">{{data.zw}}</detail-list-item>
      <detail-list-item term="技术职称" :lg="8">{{data.zc}}</detail-list-item>
      <detail-list-item term="专业专长" :lg="8">{{data.zyzc}}</detail-list-item>
    </detail-list>
    <detail-list  style="margin-bottom: 16px">
      <detail-list-item term="行业类别" :lg="8">{{data.hylb}}</detail-list-item>
      <detail-list-item term="专家组" :lg="8">{{data.zjzbh}}</detail-list-item>
      <detail-list-item term="聘用职务" :lg="8">{{data.pyzw}}</detail-list-item>
    </detail-list>
    <detail-list  style="margin-bottom: 16px">
      <detail-list-item term="推荐单位意见" :lg="8">{{data.djdw}}</detail-list-item>
      <detail-list-item term="起聘日期" :lg="8">{{data.qprq}}</detail-list-item>
      <detail-list-item term="届满日期" :lg="8">{{data.ymrq}}</detail-list-item>
    </detail-list>
    <detail-list  style="margin-bottom: 16px">
      <detail-list-item term="备注" :lg="24">{{data.remark}}</detail-list-item>
    </detail-list>
  </div>
</template>

<script>
  import DetailList from '../comps/DetailList'
  import DetailListItem from '../comps/DetailListItem'
  import {mapGetters} from 'vuex'

  export default {
    name:'zjDetail',
    components: {
      DetailList,
      DetailListItem
    },
    props:{
      recordId:String
    },
    computed:{
      data(){
        return this.getZjById()(this.recordId)
      }

    },
    methods:{
      ...mapGetters(['getZjById'])
    }
  }
</script>