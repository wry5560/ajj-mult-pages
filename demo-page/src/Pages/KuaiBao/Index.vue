<template>
  <div class="kuaibao-index">
    <div  class="editable-add-btn">
      <!--<a-button @click="handleAdd">Add</a-button>-->
      <a-button type='primary' @click=""size="small" :style="{'margin-left':'5px'}">事故上报</a-button>
      <a-button @click=""size="small">刷新</a-button>
    </div>
    <div>
      <a-table
        :dataSource="dataSource"
        :columns="columns"
        :pagination= "false"
        size="small"
        :loading="tableIsLoading"
        :scroll="scrollSize"
        @change.current="changeCurrentPage"
        @showSizeChange="showSizeChange"

        :indentSize= 60
      >
        <!--<template slot="centerCell" >-->
          <!--<div style="text-align:center">事故名称</div>-->
        <!--</template>-->
        <span slot="actionCell" slot-scope="text" >
        <a href="javascript:;">查看详情</a>
      </span>
        <template slot="status" slot-scope="isend">
          <a-badge :status="`${isend==0 ? 'processing':'success'}`" :text="`${isend==0 ? '审批中':'已审批'}`"/>
        </template>

        <!--<a-table-->
          <!--slot="expandedRowRender"-->
          <!--slot-scope="record, index, indent, expanded"-->
          <!--:columns="innerColumns"-->
          <!--:dataSource="record.xbList"-->
          <!--size="small"-->
          <!--:pagination="false"-->
          <!--:showHeader="false"-->

        <!--&gt;-->
          <!--<span slot="actionCell" slot-scope="text" >-->
            <!--<a href="javascript:;">查看详情</a>-->
          <!--</span>-->
          <!--<template slot="status" slot-scope="isend">-->
            <!--<a-badge :status="`${isend==0 ? 'processing':'success'}`" :text="`${isend==0 ? '审批中':'已审批'}`"/>-->
          <!--</template>-->
        <!--</a-table>-->

      </a-table>
      <a-pagination v-model="pagination.current" style="margin-top: 8px;float:right":total="pagination.total" showSizeChanger showQuickJumper :showTotal="total => `共${total}条数据`" @change="changeCurrentPage" @showSizeChange="showSizeChange"/>
    </div>
  </div>
</template>

<script>
  import {reqKuaiBaoList} from '@/api/kuaibao/kuaibao'

  export default{
    data(){
      return {
        scrollSize: { x:1022, y: window.innerHeight - 120},
        tableIsLoading: false,
        pagination:{
          total:0,
          current:1
        },
        dataSource: [],
        columns: [
          {title: '编号', dataIndex: 'id', width: 100, key:'id',align: 'center',},
          {title: '事故名称',dataIndex: 'sgnm', width: 100,key:'sgnm', align: 'left',slots:{title:'centerCell'}},
          {title: '上报时间', dataIndex: 'uptime', width: 100, key:'uptime',align: 'center',},
          {title: '上报人', dataIndex: 'upuser', width: 100,key:'upuser', align: 'center',},
          {title: '审批状态', dataIndex: 'isend', width: 100,key:'isend', align: 'center',scopedSlots: {customRender: 'status'}},
          {title: '流程节点', dataIndex: 'dqlc', width: 100, key:'dqlc',align: 'center',},
          {title: '续报数', dataIndex: 'xbNum', width: 50,key:'xbNum', align: 'center',},
          {title: '操作', dataIndex: 'actions', width: 100, key:'actions',align: 'center', scopedSlots: {customRender: 'actionCell'}},
//         {titleText:'操作', dataIndex: 'actions', width: 150, align:'center', scopedSlots: {customRender: 'actionCell', filterDropdown: 'levelOneDropdown', filterIcon: 'filterIcon',},
        ],
        innerColumns: [
          {title: '编号', dataIndex: 'id', width: 100, key:'id',align: 'center',},
          {title: '事故名称',dataIndex: 'sgnm', width: 100,key:'sgnm', align: 'left',slots:{title:'centerCell'}},
          {title: '上报时间', dataIndex: 'uptime', width: 100, key:'uptime',align: 'center',},
          {title: '上报人', dataIndex: 'upuser', width: 100,key:'upuser', align: 'center',},
          {title: '审批状态', dataIndex: 'isend', width: 100,key:'isend', align: 'center',scopedSlots: {customRender: 'status'}},
          {title: '流程节点', dataIndex: 'dqlc', width: 100, key:'dqlc',align: 'center',},
          {title: '续报数', dataIndex: 'xbNum', width: 50,key:'xbNum', align: 'center',},
          {title: '操作', dataIndex: 'actions', width: 100, key:'actions',align: 'center', scopedSlots: {customRender: 'actionCell'}},
        ]
      }
    },
    created(){
      this.reqTableData()
    },
    methods:{
      reqTableData(parameter){
        reqKuaiBaoList(parameter)
          .then((res)=>{
            if(res.success){
              this.initDataSource(res)
            }else{
              this.$message.error(res.message)
            }
          })
          .catch(err=>{})
      },
      initDataSource(res){
//         debugger
        const tempData = res.data.filter(i=>{return !i.xbid || i.xbid== 0})
        tempData.forEach((data,index)=>{
          data.children=[]
          data.key=index
          res.data.forEach((item,itemIndex)=>{
              if(item.id==data.id && item.xbid && item.xbid>0){
                  item.id=item.id + item.xbid
                  item.key=item.id + item.xbid+itemIndex
                item.xbNum='-'
                  data.children.push(item)
              }
          })
          data.xbNum=data.children.length
        })

        this.dataSource = tempData
        this.pagination.total=res.totalCount
      },
      changeCurrentPage(page, pageSize){
        console.log(page)
        console.log(pageSize)
      },
      showSizeChange(current, size){
        console.log(current)
        console.log(size)
      }
    },
    watch:{

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

