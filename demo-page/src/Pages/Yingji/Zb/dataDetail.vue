<template>
  <div style="padding-left: 24px">
    <detail-list style="margin-bottom: 16px;margin-top: 16px">
      <detail-list-item term="装备名称" :lg="8">{{data.zbname}}</detail-list-item>
      <detail-list-item term="类型" :lg="8">{{data.zbtype}}</detail-list-item>
      <detail-list-item term="级别" :lg="8">{{data.zbjb}}</detail-list-item>
    </detail-list>
    <detail-list  style="margin-bottom: 16px">
      <detail-list-item term="主管部门" :lg="8">{{data.zgbm}}</detail-list-item>
      <detail-list-item term="行政区域" :lg="8">{{data.xzqy}}</detail-list-item>
      <detail-list-item term="存放地点" :lg="8">{{data.zbcfcs}}</detail-list-item>
    </detail-list>
    <detail-list  style="margin-bottom: 16px">
      <detail-list-item term="负责人" :lg="8">{{data.fzr}}</detail-list-item>
      <detail-list-item term="联系电话" :lg="8">{{data.fzrlx}}</detail-list-item>
      <detail-list-item term="装备数量" :lg="8">{{data.zbsl}}</detail-list-item>
    </detail-list>
    <detail-list  style="margin-bottom: 16px">
      <detail-list-item term="计量单位" :lg="8">{{data.jldw}}</detail-list-item>
    </detail-list>
    <detail-list  style="margin-bottom: 16px">
      <detail-list-item term="装备描述" :lg="24">{{data.zbms}}</detail-list-item>
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
    name:'zbDetail',
    components: {
      DetailList,
      DetailListItem
    },
    props:{
      recordId:String
    },
    computed:{
      data(){
        return this.getZbById()(this.recordId)
      }

    },
    methods:{
      ...mapGetters(['getZbById'])
    }
  }
</script>