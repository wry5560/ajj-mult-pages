<template>
  <div style="padding-left: 24px">
    <detail-list style="margin-bottom: 16px;margin-top: 16px">
        <detail-list-item term="物资名称" :lg="8">{{data.wzname}}</detail-list-item>
        <detail-list-item term="物资类型" :lg="8">{{data.wztype}}</detail-list-item>
        <detail-list-item term="物资级别" :lg="8">{{data.wzjb}}</detail-list-item>
    </detail-list>
    <detail-list  style="margin-bottom: 16px">
      <detail-list-item term="物资数量" :lg="8">{{data.wzsl}}</detail-list-item>
      <detail-list-item term="计量单位" :lg="8">{{data.jldw}}</detail-list-item>
      <detail-list-item term="存放场所" :lg="8">{{data.wzcfcs}}</detail-list-item>
    </detail-list>
    <detail-list  style="margin-bottom: 16px">
      <detail-list-item term="主管部门" :lg="8">{{data.zgbm}}</detail-list-item>
      <detail-list-item term="行政区" :lg="8">{{data.xzqy}}</detail-list-item>
      <detail-list-item term="负责人" :lg="8">{{data.fzr}}</detail-list-item>
    </detail-list>
    <detail-list  style="margin-bottom: 16px">
      <detail-list-item term="负责人电话" :lg="8">{{data.fzrlx}}</detail-list-item>
      <detail-list-item term="传真" :lg="8">{{data.cz}}</detail-list-item>
    </detail-list>
    <detail-list  style="margin-bottom: 16px">
      <detail-list-item term="物资描述" :lg="24">{{data.wzms}}</detail-list-item>
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
    name:'wzDetail',
    components: {
      DetailList,
      DetailListItem
    },
    props:{
      recordId:String
    },
    computed:{
      data(){
        return this.getWzById()(this.recordId)
      }

    },
    methods:{
      ...mapGetters(['getWzById'])
    }
  }
</script>