<template>
  <div class="index" style="height: 100%">
    <a-layout class="layout">
          <a-layout-sider width="300px" :style="{position:'fixed',height:'100%',overflow:'auto'}">
            <role-menu></role-menu>
          </a-layout-sider>
          <a-layout-content width="500px" :style="{'padding-left': '300px'}">
            <task-table></task-table>
          </a-layout-content>
    </a-layout>
  </div>
</template>

<script>
  // @ is an alias to /src
//引入组件
//  import Trend from '@/components/Trend'
 import RoleMenu from '@/views/RoleMenu'
 import TaskTable from '@/views/TaskTable'


  export default {
    name: 'Index',
    components: {
      RoleMenu,
      TaskTable
    },
    data () {
      return {
        pagename:'index'
      }
    },
    methods: {

    }
  }
</script>

<style lang="scss" scoped>
  .layout{
    min-height: 100vh !important;
  }
  .index{

  }
</style>
