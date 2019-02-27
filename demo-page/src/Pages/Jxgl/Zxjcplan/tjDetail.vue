<template>
  <div class="jxgl-tj">
    <a-card :bordered="false" :loading="table.tableIsLoading">
      <a-row>
        <a-col :sm="8" :xs="24">
          <div class="head-info center" >
            <span>要求检查企业数量</span>
            <p>{{ tjData.tj[0].qynum }}</p>
            <em />
          </div>
        </a-col>
        <a-col :sm="8" :xs="24">
          <div class="head-info center" >
            <span>已检查企业数量</span>
            <p>{{ tjData.tj[0].jcnum }}</p>
            <em />
          </div>
        </a-col>
        <a-col :sm="8" :xs="24">
          <div class="head-info center" >
            <a-progress type="circle" :percent="percent" :width="80" />
          </div>
        </a-col>
      </a-row>
    </a-card>
    <div class="content-list">
      <div class="content-wrapper">
        <div class="header">
          <span class="before-title"> </span>
          <span class="title">检查详情</span>
          <span class="button-bar"></span>
        </div>
        <div class="content">
          <a-table
            bordered
            :rowClassName="rowClass"
            :dataSource="tableData"
            :columns="table.columns"
            :pagination= "false"
            :size="table.size"
            :loading="table.tableIsLoading"
            :scroll="table.scrollSize"
            :rowSelection="table.rowSelection"
          >
        <span slot="actionCell" slot-scope="text,record,index" >
          <!--<a href="javascript:;" @click="showModal('query',record)">查看</a>-->
          <!--<a-divider v-if="" type="vertical" />-->
          <!--<a href="javascript:;" @click="showModal('map',record)">位置</a>-->
          <!--<a-divider v-if="" type="vertical" />-->
          <!--<a href="javascript:;" @click="showModal('edit',record)">修改</a>-->
          <!--<a-divider v-if="" type="vertical" />-->
          <a-popconfirm title="您确认删除该条记录吗？" placement="bottomRight" okText="Yes" cancelText="No" @confirm="deleteRowData(record)">
            <!--<a href="javascript:;">删除</a>-->
          </a-popconfirm>
        </span>
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
          <div >
            <a-pagination
              v-if="table.dataSource.length>0"
              v-model="pagination.current"
              style="margin-top: 8px; padding-left: 16px;float: right;"
              :total="table.dataSource.length"
              :pageSizeOptions="pagination.pageSizeOptions"
              :pageSize="pagination.pageSize"
              showSizeChanger
              showQuickJumper
              :showTotal="total =>`共${total}条数据`"
              @change="changeCurrentPage"
              @showSizeChange="showSizeChange"
              size="small"/>

            <!--<a-button style="float: right;margin-top: 8px;margin-bottom: 8px;margin-right: 8px" size="small" @click="emitCancel">返 回</a-button>-->
            <!--<p style="float: right;margin-top: 8px;margin-right: 16px" >共选择 {{table.rowSelection.selectedRowKeys.length}} 条</p>-->
            <div style="clear: both"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import HeadInfo from '@/components/tools/HeadInfo'
  const reqYcxAction='queryZxtj'
  const reqZqAction='queryZxtjzq'
  import { initColumn } from '@/utils/tableColumnInit'

  export default{
    name:'jxgl_zxplan_tj',
    components:{
      HeadInfo
    },
    props:{
      recordId:String,
      sfycx:[String,Number]
    },
    data(){
      return{
        tjData:{
            tj:[{
              qynum:0,
              jcnum:0
            }],
          tjdetail:[]
        },
        table:{
          dataSource:[],
          columns:[
            {title: '序号', dataIndex: 'index', width: '50px',align: 'center'},
//            {title: '条目类型',dataIndex: 'tmlx', width: '120px', align: 'center'},
            {title: '检查企业', dataIndex: 'dwmc', width: '400px', align: 'left',titleAlign:'center'},
            {title: '检查次数', dataIndex: 'jcnum', width: '100px', align: 'center',titleAlign:'center'},
//            {title: '检查依据', dataIndex: 'jcyj', width: '200px', align: 'left',titleAlign:'center'},
//            {title: '隐患提示', dataIndex: 'yhts', width: '150px',align: 'center'},
//            {title: '系统未落实提示', dataIndex: 'systs', width: '150px', align: 'center',},
//            {title: '所属组织', dataIndex: 'departName', width: '120px',align: 'center'},
//            {title: '操作', dataIndex: 'actions', width: '60px', align: 'center', scopedSlots: {customRender: 'actionCell'}},
          ],
          size:'small',
          tableIsLoading:false,
          scrollSize: { x:600, y: window.innerHeight - 120},
//          rowSelection:{
//            selectedRowKeys: [],
//            onChange: this.onSelectChange,
//            columnWidth:'20px',
//          },
          rowSelection:null
        },
        pagination:{
          total:0,
          current:1,
          pageSize:10,
          pageSizeOptions:['10','20','50','100','500']
        },
      }
    },
    computed: {
      percent(){
        return this.tjData.tj[0].jcnum && this.tjData.tj[0].qynum ? ((this.tjData.tj[0].jcnum / this.tjData.tj[0].qynum )*100).toFixed(0):0
      },
      tableData(){
        const start=(this.pagination.current-1)*this.pagination.pageSize
        const end=(this.pagination.current)*this.pagination.pageSize
        return this.table.dataSource.slice(start,end)
      }
    },
    created(){
      this.reqData()
      this.table.columns=initColumn(this.table.columns)
    },
    methods:{
      rowClass(record,index){
        if (index%2==1) return 'even-rows'
      },
      reqData(){
          this.table.tableIsLoading=true
          const paramater={
            param1:this.recordId
          }
          const action=this.sfycx == '1'?reqYcxAction:reqZqAction
          this.$store.dispatch(action,paramater)
            .then((res)=>{
              if(res.success){
                this.tjData=res.data[0]
                this.table.dataSource=this.tjData.tjdetail
                this.table.dataSource.forEach((item,index)=>{
                  item.index=index+1
                })
                this.table.tableIsLoading=false
              }else{
                this.$message.error(res.message)
                this.table.tableIsLoading=false
              }
            })
            .catch((err)=>console.log(JSON.stringify(err)))
      },
      changeCurrentPage(page, pageSize){
        this.pagination.current=page
        this.pagination.pageSize=pageSize
//        this.reqTableData()
      },
      showSizeChange(current, size){
        const start=(this.pagination.current-1 )* this.pagination.pageSize
        if(start==0){
          this.pagination.current=1
        }else{
          this.pagination.current= Math.ceil(start/size)
        }
        this.pagination.pageSize=size
//        this.reqTableData()
      },
    }
  }
</script>

<style lang="scss" scoped>
  .jxgl-tj{
    .head-info {
      position: relative;
      text-align: left;
      padding: 0 32px 0 0;
      min-width: 125px;

      &.center {
        text-align: center;
        padding: 0 32px;
      }

      span {
        color: rgba(0, 0, 0, .45);
        display: inline-block;
        font-size: 14px;
        line-height: 22px;
        margin-bottom: 4px;
      }
      p {
        color: rgba(0, 0, 0, .85);
        font-size: 48px;
        line-height: 32px;
        margin: 0;
      }
      em {
        background-color: #e8e8e8;
        position: absolute;
        height: 56px;
        width: 1px;
        top: 0;
        right: 0;
      }
    }
  }
  .content-list{
    padding-left:36px;
    .content-wrapper{
      width: 100%;
      margin-bottom: 50px;
      .header{
        margin-bottom: 15px;
        .title{
          border-left: 4px solid #1478f0;
          padding-left: 8px;
          font-size: 16px;
          color: #575757;
          font-weight: 600;
        };
        .button-bar{

        }
      };
    };
  }
</style>