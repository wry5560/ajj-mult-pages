<template>
  <div style="padding-left: 24px">
    <detail-list style="margin-bottom: 16px;margin-top: 16px">
        <detail-list-item term="避难场所名称" :lg="8">{{data.bncsname}}</detail-list-item>
        <detail-list-item term="类型" :lg="8">{{data.cstype}}</detail-list-item>
        <detail-list-item term="行政区域" :lg="8">{{data.xzqy}}</detail-list-item>
    </detail-list>
    <detail-list  style="margin-bottom: 16px">
      <detail-list-item term="地址" :lg="8">{{data.dz}}</detail-list-item>
      <detail-list-item term="联系电话" :lg="8">{{data.lxdh}}</detail-list-item>
      <detail-list-item term="面积" :lg="8">{{data.area}}</detail-list-item>
    </detail-list>
    <detail-list  style="margin-bottom: 16px">
      <detail-list-item term="可容纳人数" :lg="8">{{data.krrs}}</detail-list-item>
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
    name:'placeDetail',
    components: {
      DetailList,
      DetailListItem
    },
    props:{
      recordId:String
    },
    computed:{
      data(){
        return this.getPlaceById()(this.recordId)
      }

    },
    methods:{
      ...mapGetters(['getPlaceById'])
    }
  }
</script>