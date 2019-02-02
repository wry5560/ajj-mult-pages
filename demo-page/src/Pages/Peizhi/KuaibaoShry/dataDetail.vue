<template>
  <div style="padding-left: 24px">
    <detail-list style="margin-bottom: 16px;margin-top: 16px">
      <detail-list-item term="标题" :lg="8">{{data.zstitle}}</detail-list-item>
      <detail-list-item term="类型" :lg="8">{{data.zstype}}</detail-list-item>
      <detail-list-item term="关键字" :lg="8">{{data.gjz}}</detail-list-item>
    </detail-list>
    <detail-list  style="margin-bottom: 16px">
      <detail-list-item term="知识内容" :lg="24">{{data.zscontent}}</detail-list-item>
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
    name:'zsDetail',
    components: {
      DetailList,
      DetailListItem
    },
    props:{
      recordId:String
    },
    computed:{
      data(){
        return this.getZsById()(this.recordId)
      }

    },
    methods:{
      ...mapGetters(['getZsById'])
    }
  }
</script>