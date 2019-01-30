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
        <a-button slot="tabBarExtraContent" style="float: left;" @click="refresh">刷 新</a-button>
      </a-tabs>
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
          <a v-if="record.isend!=0"href="javascript:;" @click="gotoSgDetail(record)">查看详情</a>
          <!--<a-divider v-if="record.isend==0" type="vertical" />-->
          <a v-if="record.isend==0" href="javascript:;" @click="gotoSgDetail(record,'true')">审核</a>
        </span>
        <template slot="status" slot-scope="isend">
          <a-badge :status="`${isend==0 ? 'processing':'success'}`" :text="`${isend==0 ? '审批中':'已审批'}`"/>
        </template>
      </a-table>
      <a-pagination
        size="small"
        v-model="pagination.current"
        style="margin-top: 4px;float:right;padding-right: 16px;"
        :total="pagination.total"
        :pageSizeOptions="pagination.pageSizeOptions"
        :pageSize="pagination.pageSize"
        showSizeChanger
        showQuickJumper
        :showTotal="total => `共${total}条数据`"
        @change="changeCurrentPage"
        @showSizeChange="showSizeChange"/>
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
  import {reqKuaiBaoList,postSchedule} from './api'
  import SgForm from './comps/sgForm.vue'
  import moment from 'moment'

  export default{
    moment,
    components:{
      SgForm
    },
    data(){
      return {
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
          {title: '编号', dataIndex: 'id', width: 120, key:'id',align: 'center',},
          {title: '事故名称',dataIndex: 'sgnm', width: 100,key:'sgnm', align: 'left',slots:{title:'centerCell'}},
          {title: '续报数', dataIndex: 'xbnum', width: 50,key:'xbnum', align: 'center',},
          {title: '上报时间', dataIndex: 'uptime', width: 100, key:'uptime',align: 'center',},
          {title: '上报人', dataIndex: 'upuser', width: 100,key:'upuser', align: 'center',},
          {title: '审批状态', dataIndex: 'isend', width: 100,key:'isend', align: 'center',scopedSlots: {customRender: 'status'}},
          {title: '流程节点', dataIndex: 'lcname', width: 100, key:'lcname',align: 'center',},
          {title: '操作', dataIndex: 'actions', width: 100, key:'actions',align: 'center', scopedSlots: {customRender: 'actionCell'}},
//         {titleText:'操作', dataIndex: 'actions', width: 150, align:'center', scopedSlots: {customRender: 'actionCell', filterDropdown: 'levelOneDropdown', filterIcon: 'filterIcon',},
        ],
      }
    },
    computed:{
    },
    created(){
      this.reqTableData()
    },
    mounted(){
//      console.log(this.modalOption)
      let _this=this
      window.onresize = function(){
//        console.log(_this.modalOption.bodyStyle['max-height'])
        _this.modalOption.bodyStyle['max-height']= window.innerHeight                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     -250+'px'
      }
      document.getElementsByClassName('ant-table-body')[0].style.height=`${window.innerHeight}px`
    },
    methods:{
      showModal(){
        this.modalOption.visible=true
      },
      tabChange(activeKey){
        activeKey=='1'? this.activeTab='1': this.activeTab='2'
        this.reqTableData()
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
      gotoSgDetail(record,isshenhe){
        const id = record.xbid==0? record.id:record.idBf
        this.$router.push({name:'sgDetail',params:{id:id,xbid:record.xbid,isShenhe:isshenhe}})
      },
      reqTableData(){
        this.tableIsLoading=true
        const parameter={
          param1:sys_relateDepId2,
          param4:1,
//          param5:1,
          limit:this.pagination.pageSize,
          start:(this.pagination.current -1)*this.pagination.pageSize
        }
        this.activeTab=='1'? parameter.param2=1 :parameter.param3=1
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
          data.uptime=moment(data.uptime).format('YYYY-MM-DD \xa0 HH:MM')
          if(data.xbid!=0){
            data.idBf=data.id
            data.id="续"+data.id+"-"+data.xbid
            data.xbnum='-'
            data.uptime=moment(data.xbtime).format('YYYY-MM-DD \xa0 HH:MM')
          }
        })
        this.$store.commit('ADD_KUAIBAO',tempData)
        this.dataSource = tempData
        this.activeTab=='1'? this.noEndNum=res.totalCount :0
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
        console.log(page)
        console.log(pageSize)
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
        console.log(current)
        console.log(size)
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

  }


</style>

