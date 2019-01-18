<template>
  <div class="kuaibao-index">
    <div  class="header-buttons-bar">
      <!--<a-button @click="handleAdd">Add</a-button>-->
      <a-button type='primary' @click="showModal"size="small" :style="{'margin-left':'5px'}">事故上报</a-button>
      <a-button @click="reqTableData"size="small">刷 新</a-button>
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
        :indentSize= 20
      >
        <!--<template slot="centerCell" >-->
          <!--<div style="text-align:center">事故名称</div>-->
        <!--</template>-->
        <span slot="actionCell" slot-scope="text,record,index" >
          <a href="javascript:;" @click="gotoSgDetail(record.id)">查看详情</a>
          <a-divider v-if="record.xbid==0" type="vertical" />
          <a v-if="record.xbid==0" href="javascript:;" @click="">续报</a>
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
    <a-modal
      title="事故上报"
      okText="上 报"
      @cancel="modalCancel"
      :visible="modalOption.visible"
      :destroyOnClose="true"
      :maskClosable="false"
      wrapClassName="nomal-modal"
      width="70%"
      :bodyStyle="modalOption.bodyStyle"
      :okButtonProps="modalOption.okButtonProps"
      :cancelButtonProps="modalOption.cancelButtonProps"
    >
      <sg-form ref="sgCommit" :showSubmit="false"></sg-form>
      <template slot="footer">
        <a-button key="back" @click="modalCancel">返 回</a-button>
        <a-button key="submit" type="primary" :loading="modalOption.commitLoading" @click="sgCommit">上 报</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>
  import {reqKuaiBaoList,postSchedule} from '@/api/kuaibao/kuaibao'
  import SgForm from './sgForm.vue'
  export default{
    components:{
      SgForm
    },
    data(){
      return {
        modalOption:{
          visible:false,
          bodyStyle:{
            "max-height":window.innerHeight-250+'px',
            "min-height":100
          },
          commitLoading:false
        },
        scrollSize: { x:1022, y: window.innerHeight - 120},
        tableIsLoading: false,
        pagination:{
          total:0,
          current:1
        },
        dataSource: [],
        columns: [
          {title: '编号', dataIndex: 'id', width: 120, key:'id',align: 'center',},
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
    computed:{
    },
    created(){
      this.reqTableData()
    },
    mounted(){
      console.log(this.modalOption)
      let _this=this
      window.onresize = function(){
        console.log(_this.modalOption.bodyStyle['max-height'])
        _this.modalOption.bodyStyle['max-height']= window.innerHeight-250+'px'
      }
    },
    methods:{
      showModal(){
        this.modalOption.visible=true
      },
      sgCommit(){
        this.$refs.sgCommit.form.validateFields((err, values) => {
//            debugger
          if (!err) {
//            this.$notification['error']({
//              message: 'Received values of form:',
//              description: JSON.stringify(values)
//            })
            this.modalOption.commitLoading=true
            postSchedule().then((res)=>{
                if (res.success==true){
                  this.$message.success('上报成功！')
                  setTimeout(()=>{
                      this.modalOption.commitLoading=false
                      this.modalOption.visible=false
                    }
                    ,500
                  )
                }else{
                  this.$message.error(res.message+'请稍后再试！')
                  this.modalOption.commitLoading=false
                }
            })
          }
        })
//        this.modalOption.visible=false
      },
      modalCancel(){
        this.modalOption.commitLoading=false
        this.modalOption.visible=false
      },
      gotoSgsb(){
        this.$router.push('/sgsb')
      },
      gotoSgDetail(id){
        console.log("id:"+id)
        this.$router.push('/sgDetail')
      },
      reqTableData(parameter){
        this.tableIsLoading=true
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
        this.tableIsLoading=false
      },
      changeCurrentPage(page, pageSize){
        console.log(page)
        console.log(pageSize)
      },
      showSizeChange(current, size){
        console.log(current)
        console.log(size)
      },
      routeChange(to,from){
        if(from.path=='/sgsb'){
          this.reqTableData()
        }
      },
    },

  }
</script>

<style lang="scss">



</style>

