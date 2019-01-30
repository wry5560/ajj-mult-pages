<template>
  <div style="padding-left: 24px">
    <detail-list style="margin-bottom: 16px;margin-top: 16px">
        <detail-list-item term="队伍名称" :lg="8">{{data.dwname}}</detail-list-item>
        <detail-list-item term="队伍类型" :lg="8">{{data.dwtype}}</detail-list-item>
        <detail-list-item term="主管部门" :lg="8">{{data.zgbm}}</detail-list-item>
    </detail-list>
    <detail-list  style="margin-bottom: 16px">
      <detail-list-item term="行政区域" :lg="8">{{data.xzqy}}</detail-list-item>
      <detail-list-item term="负责人" :lg="8">{{data.fzr}}</detail-list-item>
      <detail-list-item term="负责人电话" :lg="8">{{data.fzrlx}}</detail-list-item>
    </detail-list>
    <detail-list  style="margin-bottom: 16px">
      <detail-list-item term="队伍地址" :lg="8">{{data.dz}}</detail-list-item>
      <detail-list-item term="队伍人数" :lg="8">{{data.dwrs}}</detail-list-item>
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
    name:'teamDetail',
    components: {
      DetailList,
      DetailListItem
    },
    props:{
      recordId:String
    },
    computed:{
      data(){
        return this.getTeamById()(this.recordId)
      }

    },
    methods:{
      ...mapGetters(['getTeamById'])
    }
  }
</script>