<template>
  <div class="kuaibao-index">
    <div  class="header-buttons-bar">
      <!--<a-button @click="handleAdd">Add</a-button>-->
      <a-tabs @change="tabChange">
        <a-tab-pane  key="1">
          <a-badge slot="tab" :count="noEndNum">
            <div >待审核</div>
          </a-badge>
        </a-tab-pane>
        <a-tab-pane tab="已审核" key="2"></a-tab-pane>
        <div slot="tabBarExtraContent">
          <a-button size="small" style="float: left;margin-top: 10px" @click="refresh">刷 新</a-button>
        </div>
      </a-tabs>
    </div>
    <div>
      <a-table
        bordered
        :dataSource="dataSource"
        :rowClassName="rowClass"
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
          <a v-if="record.isend!=0 ||activeTab=='2'"href="javascript:;" @click="gotoSgDetail(record)">查看详情</a>
          <!--<a-divider v-if="record.isend==0" type="vertical" />-->
          <a v-if="record.isend==0 &&activeTab!='2'" href="javascript:;" @click="gotoSgDetail(record,'true')">审核</a>
        </span>
        <template slot="status" slot-scope="isend">
          <a-badge :status="`${isend==0 ? 'processing':'success'}`" :text="`${isend==0 ? '审批中':'已审批'}`"/>
        </template>
        <span slot="defaultcustomRender" slot-scope="text,record,index">
          <template>
            <a-tooltip :mouseEnterDelay="0.8">
              <template slot='title'>
                {{text}}
              </template>
              <div style="width: 100%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{text}}</div>
            </a-tooltip>
          </template>
        </span>
      </a-table>
      <div class="bottom-pagination-warpper">
      <a-pagination
        size="small"
        v-model="pagination.current"
        style="float:right;"
        :total="pagination.total"
        :pageSizeOptions="pagination.pageSizeOptions"
        :pageSize="pagination.pageSize"
        showSizeChanger
        showQuickJumper
        :showTotal="total => `共${total}条数据`"
        @change="changeCurrentPage"
        @showSizeChange="showSizeChange"/>
        <div style="clear: both"></div>
      </div>
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
      <a-spin  :spinning="modalLoading">
      <sg-form ref="sgCommit" :showSubmit="false"></sg-form>
      </a-spin>
      <template slot="footer">
        <a-button key="back" @click="modalCancel">返 回</a-button>
        <a-button key="submit" type="primary" :loading="modalOption.commitLoading" @click="sgCommit">上 报</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>
  import {reqKuaiBaoList,postSchedule} from './api'
  import SgForm from './comps/sgForm.vue'
  import moment from 'moment'
  import { initColumn } from '@/utils/tableColumnInit'

  export default{
    moment,
    components:{
      SgForm
    },
    data(){
      return {
        modalLoading:false,
        activeTab:'1',
        noEndNum:0,
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
          current:1,
          pageSize:10,
          pageSizeOptions:['10','20','50','100','500']
        },
        dataSource: [],
        columns: [
          {title: '编号', dataIndex: 'id', width: '80px', key:'id',align: 'center',},
          {title: '续报数', dataIndex: 'xbnum', width: '50px',key:'xbnum', align: 'center',},
          {title: '接报来源',dataIndex: 'jbly', width: '100px',key:'jbly', align: 'left',titleAlign:'center'},
          {title: '接报时间',dataIndex: 'jbtime', width: '100px',key:'jbtime', align: 'center'},
          {title: '上报人', dataIndex: 'upuser', width: '80px',key:'upuser', align: 'center',},
          {title: '上报时间', dataIndex: 'uptime', width: '100px', key:'uptime',align: 'center',},
          {title: '审批状态', dataIndex: 'isend', width: '100px',key:'isend', align: 'center',scopedSlots: {customRender: 'status'}},
          {title: '流程节点', dataIndex: 'lcname', width: '100px', key:'lcname',align: 'center',},
          {title: '操作', dataIndex: 'actions', width: '100px', key:'actions',align: 'center', scopedSlots: {customRender: 'actionCell'}},
//         {titleText:'操作', dataIndex: 'actions', width: 150, align:'center', scopedSlots: {customRender: 'actionCell', filterDropdown: 'levelOneDropdown', filterIcon: 'filterIcon',},
        ],
      }
    },
    computed:{
    },
    created(){
      this.reqTableData()
      this.columns=initColumn(this.columns)
    },
    mounted(){
//      console.log(this.modalOption)
      let _this=this
      window.onresize = function(){
//        console.log(_this.modalOption.bodyStyle['max-height'])
        _this.table.scrollSize.y= window.innerHeight - 112                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      -250+'px'
      }
//      document.getElementsByClassName('ant-table-body')[0].style.height=`${window.innerHeight}px`
    },
    methods:{
      showModal(){
        this.modalOption.visible=true
      },
      rowClass(record,index){
        if (index%2==1) return 'even-rows'
      },
      tabChange(activeKey){
        activeKey=='1'? this.activeTab='1': this.activeTab='2'
        this.reqTableData()
      },
      sgCommit(){
        this.$refs.sgCommit.form.validateFields((err, values) => {
//            debugger
          if (!err) {

            this.modalLoading=true
            postSchedule().then((res)=>{
              if (res.success==true){
                this.$message.success('上报成功！')
                setTimeout(()=>{
                    this.modalLoading=false
                    this.modalOption.visible=false
                  }
                  ,500
                )
              }else{
                this.$message.error(res.message+'请稍后再试！')
                this.modalLoading=false
              }
            })
          }
        })
//        this.modalOption.visible=false
      },
      modalCancel(){
        this.modalLoading=false
        this.modalOption.visible=false
      },
      gotoSgsb(){
        this.$router.push('/sgsb')
      },
      gotoSgDetail(record,isshenhe){
//          debugger
        const id = record.xbid==0? record.id:record.idBf
        this.$router.push({name:'sgDetail',params:{id:id,xbid:record.xbid,isShenhe:isshenhe}})
      },
      reqTableData(){
        this.tableIsLoading=true
        const parameter={
          param1:sys_relateDepId2,
          sqlId:this.activeTab=='2'?'S360006':'S360016',
          param4:1,
//          param5:1,
          limit:this.pagination.pageSize,
          start:(this.pagination.current -1)*this.pagination.pageSize
        }
        if(this.activeTab=='1') parameter.param2=1
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
        const tempData = res.data
        tempData.forEach((data,index)=>{
          if(!data.xbnum >0){data.xbnum = 0}
          data.key=index+ data.id + data.xbid
          data.upuser=data.__upuser.userName
          if (data.isend=='1'){data.lcname='已完结'}
          data.uptime=moment(data.uptime).format('YYYY-MM-DD \xa0 HH:mm')
          data.jbtime=moment(data.jbtime).format('YYYY-MM-DD \xa0 HH:mm')
          if(data.xbid!=0){
            data.idBf=data.id
            data.id="续"+data.id+"-"+data.xbid
            data.xbnum='-'
            data.uptime=moment(data.xbtime).format('YYYY-MM-DD \xa0 HH:mm')
          }
        })
        this.$store.commit('ADD_KUAIBAO',tempData)
        this.dataSource = tempData
        if(this.activeTab=='1') this.noEndNum=res.totalCount
        this.pagination.total=res.totalCount
        this.tableIsLoading=false
      },
      refresh(){
        this.reqTableData()
      },
      changeCurrentPage(page, pageSize){
        this.pagination.current=page
        this.pagination.pageSize=pageSize
        this.reqTableData()
      },
      showSizeChange(current, size){
        const start=(this.pagination.current-1 )* this.pagination.pageSize
        if(start==0){
          this.pagination.current=1
        }else{
          this.pagination.current= Math.ceil(start/size)
        }
        this.pagination.pageSize=size
        this.reqTableData()
      },
    },
    watch:{
      '$route':function () {
        this.reqTableData()
      }
    }
  }
</script>

<style lang="scss">
  .kuaibao-index{
    .ant-tabs-bar{
      margin:0 !important;
    }
    .ant-tabs{
      .ant-tabs-extra-content{
        width: calc(100% - 210px);
      }
    }
  }


</style>

