<template>
  <div class="kuaibao-index">
    <div  class="editable-add-btn">
      <!--<a-button @click="handleAdd">Add</a-button>-->
      <a-button type='primary' @click=""size="small" :style="{'margin-left':'5px'}">事故上报</a-button>
      <a-button @click=""size="small">刷新</a-button>
    </div>
    <div>
      <a-table
        bordered
        :dataSource="dataSource"
        :columns="columns"
        :childrenColumnName="childrenColumnName"
        size="small"
        :loading="tableIsLoading"
        :scroll="scrollSize">
      >
      <span slot="actionCell">
          <a slot-scope="text" href="javascript:;">查看详情</a>
      </span>
      </a-table>
    </div>
  </div>
</template>

<script>

  export default{
    data(){
      return {
        scrollSize: { x:1022, y: window.innerHeight - 85},
        tableIsLoading: false,
        dataSource: [],
        columns: [
          {titleText: '编号', dataIndex: 'ID', width: 60, align: 'center',},
          {titleText: '事故名称', dataIndex: 'accidentNmae', width: 150, align: 'center',},
          {titleText: '上报时间', dataIndex: 'time', width: 150, align: 'center',},
          {titleText: '上报人', dataIndex: 'actionPersion', width: 150, align: 'center',},
          {titleText: '审批状态', dataIndex: 'state', width: 150, align: 'center',},
          {titleText: '流程节点', dataIndex: 'processNode', width: 150, align: 'center',},
          {titleText: '操作', dataIndex: 'actions', width: 150, align: 'center', scopedSlots: {customRender: 'actionCell'}},
//         {titleText:'操作', dataIndex: 'actions', width: 150, align:'center', scopedSlots: {customRender: 'actionCell', filterDropdown: 'levelOneDropdown', filterIcon: 'filterIcon',},
        ],
        innerColumns: [
          {titleText: '编号', dataIndex: 'ID', width: 60, align: 'center',},
          {titleText: '事故名称', dataIndex: 'accidentNmae', width: 150, align: 'center',},
          {titleText: '上报时间', dataIndex: 'time', width: 150, align: 'center',},
          {titleText: '上报人', dataIndex: 'actionPersion', width: 150, align: 'center',},
          {titleText: '审批状态', dataIndex: 'state', width: 150, align: 'center',},
          {titleText: '流程节点', dataIndex: 'processNode', width: 150, align: 'center',},
          {titleText: '操作', dataIndex: 'actions', width: 150, align: 'center', scopedSlots: {customRender: 'actionCell'}},
        ]
      }
    },
    methods:{

    }
  }
</script>

<style lang="scss">
  .editable-add-btn {
    margin: 4px 0;
    button{
      margin-right: 6px;
    }
  }


</style>

