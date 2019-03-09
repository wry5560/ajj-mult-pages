<template>
  <div :style="{height:height,'padding-left':'24px'}">
    <a-row align="top" style="height:100%">
      <a-col :lg="24">
        <div style="padding-left: 16px;padding-top:16px">
          <div style="text-align: left;padding: 8px 0;"><strong>角色名称：</strong>{{data.rolename}}</div>
          <!--<div style="text-align: left;padding: 16px 0;"></div>-->
          <!--<div style="text-align: left;padding: 16px 0;"><strong>所属部门：</strong>{{data.departName}}</div>-->
          <!--<div style="text-align: left;padding: 16px 0;"></div>-->
          <div style="text-align: left;padding: 8px 0;"><strong>角色说明：</strong>{{data.rolevalue}}</div>
          <!--<div style="text-align: left;padding: 16px 0;"></div>-->
        </div>
      </a-col>
      <a-col :lg="24" style="height: calc(100% - 140px);padding:0 16px;">
          <div style="text-align:left;padding: 8px 0;"><strong>角色菜单：</strong></div>
          <div style="padding:12px; border: 1px solid #e2e2e2;overflow: auto;height:100%">
            <role-munu-tree :recordId="data.id" :departId="data.__ddepartmentId.departId" type="query"/>
        </div>
      </a-col>

    </a-row>

  </div>
</template>

<script>
  import DetailList from '../comps/DetailList'
  import DetailListItem from '../comps/DetailListItem'
  import roleMunuTree from './roleMunuTree.vue'

  import {mapGetters} from 'vuex'

  export default {
    name: 'wzDetail',
    components: {
      DetailList,
      DetailListItem,
      roleMunuTree
    },
    props: {
      height: String,
      recordId: [String, Number]
    },
    computed: {
      data(){
        return this.getRoleById()(this.recordId)
      }

    },
    methods: {
      ...mapGetters(['getRoleById'])
    }
  }
</script>