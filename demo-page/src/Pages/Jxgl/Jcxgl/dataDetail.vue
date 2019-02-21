<template>
  <div style="padding-left: 24px">
    <detail-list style="margin-bottom: 16px;margin-top: 16px">
        <detail-list-item term="条目类型" :lg="12">{{data.tmlx}}</detail-list-item>
        <detail-list-item term="检查类型" :lg="12">{{data.jclx + ' - '+ data.jclx2}}</detail-list-item>
    </detail-list>
    <detail-list  style="margin-bottom: 16px">
      <detail-list-item term="检查内容" :lg="24">{{data.jcnr}}</detail-list-item>
    </detail-list>
    <detail-list  style="margin-bottom: 16px">
      <detail-list-item term="检查依据" :lg="24">{{data.jcyj}}</detail-list-item>
    </detail-list>
    <detail-list  style="margin-bottom: 16px">
      <detail-list-item term="隐患时提示" :lg="24">{{data.yhts}}</detail-list-item>
    </detail-list>
    <detail-list  style="margin-bottom: 16px">
      <detail-list-item term="系统未落实提示" :lg="24">{{data.systs}}</detail-list-item>
    </detail-list>
  </div>
</template>

<script>
import DetailList from '../comps/DetailList'
import DetailListItem from '../comps/DetailListItem'
import {mapGetters} from 'vuex'

  export default {
    name:'jcxDetail',
    components: {
      DetailList,
      DetailListItem
    },
    props:{
      recordId:String
    },
    computed:{
      data(){
        return this.getJcxById()(this.recordId)
      }

    },
    methods:{
      ...mapGetters(['getJcxById'])
    }
  }
</script>