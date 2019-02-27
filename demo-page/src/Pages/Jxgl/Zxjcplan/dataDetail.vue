<template>
  <div style="padding-left: 24px">
    <detail-list style="margin-bottom: 16px;margin-top: 16px">
        <detail-list-item term="计划名称" :lg="12">{{data.planname}}</detail-list-item>
        <detail-list-item term="计划周期" :lg="6">{{jhzq}}</detail-list-item>
    </detail-list>
    <detail-list  style="margin-bottom: 16px">
      <detail-list-item term="计划开始日期" :lg="12">{{data.planstartDate}}</detail-list-item>
      <detail-list-item term="计划结束日期" :lg="12">{{data.planendDate}}</detail-list-item>
    </detail-list>
    <detail-list  style="margin-bottom: 16px">
      <detail-list-item term="计划内容" :lg="24">{{data.neirong}}</detail-list-item>
    </detail-list>
    <detail-list style="margin-bottom: 16px">
      <detail-list-item term="启用状态" :lg="24">{{data.sfqy=='1'? '启用':'停用'}}</detail-list-item>
    </detail-list>
    <jcx-table-query
      propModalType="query"
      :recordId="recordId"
    />
    <qy-table-form
      propModalType="query"
      :recordId="recordId"
    />


  </div>
</template>

<script>
import DetailList from '../comps/DetailList'
import DetailListItem from '../comps/DetailListItem'
import jcxTableQuery from './jcxTableQuery.vue'
import qyTableForm from './qyTableForm.vue'
import {mapGetters} from 'vuex'

  export default {
    name:'zxjcPlaneDetail',
    components: {
      DetailList,
      DetailListItem,
      jcxTableQuery,
      qyTableForm
    },
    props:{
      recordId:String,
      selectOptions:Object
    },
    computed:{
      data(){
        return this.getJcplanById()(this.recordId)
      },
      jhzq(){
        if (this.data.sfycx != '1'){
          const tmp=this.selectOptions.scheTime.find(i=>i.value==this.data.scheTime)
          return tmp ? tmp.label:''
        }else{
          return '一次性'
        }
      }

    },
    methods:{
      ...mapGetters(['getJcplanById'])
    }
  }
</script>