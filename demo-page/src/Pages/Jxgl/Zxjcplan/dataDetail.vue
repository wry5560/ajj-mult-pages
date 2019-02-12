<template>
  <div style="padding-left: 24px">
    <detail-list style="margin-bottom: 16px;margin-top: 16px">
        <detail-list-item term="计划名称" :lg="24">{{data.planname}}</detail-list-item>
    </detail-list>
    <detail-list  style="margin-bottom: 16px">
      <detail-list-item term="计划开始日期" :lg="12">{{data.planstartDate}}</detail-list-item>
      <detail-list-item term="计划结束日期" :lg="12">{{data.planendDate}}</detail-list-item>
    </detail-list>
    <detail-list  style="margin-bottom: 16px">
      <detail-list-item term="计划内容" :lg="24">{{data.neirong}}</detail-list-item>
    </detail-list>
    <detail-list  style="margin-bottom: 16px">
      <detail-list-item term="启用状态" :lg="24">{{data.sfqy=='1'? '启用':'停用'}}</detail-list-item>
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
        return this.getJcplanById()(this.recordId)
      }

    },
    methods:{
      ...mapGetters(['getJcplanById'])
    }
  }
</script>