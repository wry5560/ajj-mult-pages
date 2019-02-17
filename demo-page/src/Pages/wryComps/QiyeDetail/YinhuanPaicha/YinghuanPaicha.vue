<template>
  <div>
    <!--详细内容-->
    <div class="content-list">
      <div class="content-wrapper" id="排查清单">
        <div class="header">
          <span class="before-title"> </span>
          <span class="title">排查清单</span>
          <a-badge :numberStyle="{top:'-3px', 'margin-left':'5px','background-color':'#1478f0'}" :count="Number(pcqdlistTable.pagination.total)" :showZero="true"/>
          <span class="button-bar"></span>
        </div>
        <div class="content">
          <div>
            <a-table
              bordered
              :rowClassName="rowClass"
              :dataSource="pcqdlistTable.dataSource"
              :columns="pcqdlistTable.columns"
              :pagination= "false"
              :size="pcqdlistTable.size"
              :loading="pcqdlistTable.tableIsLoading"
              :scroll="pcqdlistTable.scrollSize"
              :rowSelection="pcqdlistTable.rowSelection"
            >
              <span slot="actionCell" slot-scope="text,record,index" >
          <a href="javascript:;" @click="showModal('query',record)">查看</a>
                <!--<a-divider v-if="" type="vertical" />-->
                <!--<a href="javascript:;" @click="showModal('map',record)">位置</a>-->
                <!--<a-divider v-if="" type="vertical" />-->
                <!--<a href="javascript:;" @click="showModal('edit',record)">修改</a>-->
                <!--<a-divider v-if="" type="vertical" />-->
                <!--<a-popconfirm title="您确认删除该条记录吗？" placement="bottomRight" okText="Yes" cancelText="No" @confirm="deleteRowData(record)">-->
                <!--<a href="javascript:;">删除</a>-->
                <!--</a-popconfirm>-->
                <!--<a-divider v-if="" type="vertical" />-->
                <!--<a href="javascript:;" @click="showModal('jcx',record)">检查项</a>-->
                <!--<a-divider v-if="" type="vertical" />-->
                <!--<a href="javascript:;" @click="showModal('qy',record)">检查企业</a>-->
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
            <a-pagination
              v-model="pcqdlistTable.pagination.current"
              style="margin-top: 8px; float:right; padding-right: 16px;"
              :total="pcqdlistTable.pagination.total"
              :pageSizeOptions="pcqdlistTable.pagination.pageSizeOptions"
              :pageSize="pcqdlistTable.pagination.pageSize"
              showSizeChanger
              showQuickJumper
              :showTotal="total =>`共${total}条数据`"
              @change="changePcqdlistCurrentPage"
              @showSizeChange="showPcqdlistSizeChange"
              size="small"/>
            <div style="clear: both"></div>
          </div>
        </div>
      </div>
      <div class="content-wrapper" id="隐患记录">
        <div class="header">
          <span class="before-title"> </span>
          <span class="title">隐患记录</span>
          <a-badge :numberStyle="{top:'-3px', 'margin-left':'5px','background-color':'#1478f0'}" :count="Number(yhjllistTable.pagination.total)" :showZero="true"/>
          <span class="button-bar"></span>
        </div>
        <div class="content">
          <div>
            <a-table
              bordered
              :rowClassName="rowClass"
              :dataSource="yhjllistTable.dataSource"
              :columns="yhjllistTable.columns"
              :pagination= "false"
              :size="yhjllistTable.size"
              :loading="yhjllistTable.tableIsLoading"
              :scroll="yhjllistTable.scrollSize"
              :rowSelection="yhjllistTable.rowSelection"
            >
              <span slot="actionCell" slot-scope="text,record,index" >
          <a href="javascript:;" @click="showModal('query',record)">查看</a>
                <!--<a-divider v-if="" type="vertical" />-->
                <!--<a href="javascript:;" @click="showModal('map',record)">位置</a>-->
                <!--<a-divider v-if="" type="vertical" />-->
                <!--<a href="javascript:;" @click="showModal('edit',record)">修改</a>-->
                <!--<a-divider v-if="" type="vertical" />-->
                <!--<a-popconfirm title="您确认删除该条记录吗？" placement="bottomRight" okText="Yes" cancelText="No" @confirm="deleteRowData(record)">-->
                <!--<a href="javascript:;">删除</a>-->
                <!--</a-popconfirm>-->
                <!--<a-divider v-if="" type="vertical" />-->
                <!--<a href="javascript:;" @click="showModal('jcx',record)">检查项</a>-->
                <!--<a-divider v-if="" type="vertical" />-->
                <!--<a href="javascript:;" @click="showModal('qy',record)">检查企业</a>-->
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
            <a-pagination
              v-model="yhjllistTable.pagination.current"
              style="margin-top: 8px; float:right; padding-right: 16px;"
              :total="yhjllistTable.pagination.total"
              :pageSizeOptions="yhjllistTable.pagination.pageSizeOptions"
              :pageSize="yhjllistTable.pagination.pageSize"
              showSizeChanger
              showQuickJumper
              :showTotal="total =>`共${total}条数据`"
              @change="changeYhjllistCurrentPage"
              @showSizeChange="showYhjllistSizeChange"
              size="small"/>
            <div style="clear: both"></div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import {  mapGetters,mapActions } from 'vuex'
  import { initColumn } from '@/utils/tableColumnInit'
  import moment from 'moment'

  export default {
    moment,
    name: "YinhuanPaicha",
    props:{
      qyId:[String,Number],
    },
    data(){
      return{
        pcqdlistTable:{
          dataSource:[],
          columns:[
            {title: '序号', dataIndex: 'index', width: '50px',align: 'center'},
            {title: '清单名称',dataIndex: 'gdNm', width: '150px', align: 'center'},
            {title: '开始日期', dataIndex: 'startDay', width: '100px', align: 'center'},
            {title: '结束日期', dataIndex: 'endDay', width: '100px', align: 'center',},
            {title: '发布状态', dataIndex: 'cfdd', width: '80px', align: 'center',},
            {title: '责任人', dataIndex: 'syyt', width: '80px', align: 'center',},
            {title: '操作', dataIndex: 'actions', width: '60px', align: 'center', scopedSlots: {customRender: 'actionCell'}},
          ],
          size:'small',
          tableIsLoading:false,
          scrollSize: { x:900, y: window.innerHeight - 120},
          // rowSelection:{
          //   selectedRowKeys: [],
          //   onChange: this.onSelectChange,
          //   columnWidth:'20px',
          // }
          rowSelection:null,
          pagination:{
            total:0,
            current:1,
            pageSize:10,
            pageSizeOptions:['10','20','50','100','500']
          },
        },
        yhjllistTable:{
          dataSource:[],
          columns:[
            {title: '序号', dataIndex: 'index', width: '50px',align: 'center'},
            {title: '级别',dataIndex: 'wxpType', width: '80px', align: 'center'},
            {title: '企业名称', dataIndex: 'departName', width: '150px', align: 'center'},
            {title: '隐患描述', dataIndex: 'gdNm', width: '150px', align: 'center',},
            {title: '流程状态', dataIndex: 'state', width: '100px', align: 'center',},
            {title: '隐患明细', dataIndex: 'syyt', width: '80px', align: 'center',scopedSlots: {customRender: 'actionCell'}},
            {title: '发生时间', dataIndex: 'publicTime', width: '100px', align: 'center',},
            {title: '责任人', dataIndex: 'userName', width: '100px', align: 'center',},
            // {title: '操作', dataIndex: 'actions', width: '100px', align: 'center', scopedSlots: {customRender: 'actionCell'}},
          ],
          size:'small',
          tableIsLoading:false,
          scrollSize: { x:900, y: window.innerHeight - 120},
          // rowSelection:{
          //   selectedRowKeys: [],
          //   onChange: this.onSelectChange,
          //   columnWidth:'20px',
          // }
          rowSelection:null,
          pagination:{
            total:0,
            current:1,
            pageSize:10,
            pageSizeOptions:['10','20','50','100','500']
          },
        },
      }
    },
    created(){
      this.reqPcqdlistTableData()
      this.reqYhjllistTableData()
      this.pcqdlistTable.columns=initColumn(this.pcqdlistTable.columns)
      this.yhjllistTable.columns=initColumn(this.yhjllistTable.columns)
    },
    mounted(){

    },
    methods: {
      ...mapGetters(['get_pcqd_list','get_yhjl_list']),
      ...mapActions(['reqPcqdList','reqYhjlList']),

      handleAnchorClick (e, link) {
        e.preventDefault();
        console.log(link);
      },
      rowClass(record,index){
        if (index%2==1) return 'even-rows'
      },

      //排查清单
      reqPcqdlistTableData(){
        this.pcqdlistTable.tableIsLoading=true
        const parameter={
          param1:this.qyId,
          limit:this.pcqdlistTable.pagination.pageSize,
          start:(this.pcqdlistTable.pagination.current -1)*this.pcqdlistTable.pagination.pageSize
        }
        this.reqPcqdList(parameter)
          .then((res)=>{
            this.pcqdlistTable.dataSource=this.get_pcqd_list()
            this.pcqdlistTable.pagination.total=res.totalCount
            this.pcqdlistTable.dataSource.forEach(item=>item.index=(this.pcqdlistTable.pagination.current -1)*this.pcqdlistTable.pagination.pageSize+item.index)
            this.pcqdlistTable.tableIsLoading=false
          })
          .catch(err=>console.log(JSON.stringify(err)))
      },
      changePcqdlistCurrentPage(page, pageSize){
        this.pcqdlistTable.pagination.current=page
        this.pcqdlistTable.pagination.pageSize=pageSize
        this.reqPcqdlistTableData()
      },
      showPcqdlistSizeChange(current, size){
        const start=(this.pcqdlistTable.pagination.current-1 )* this.pcqdlistTable.pagination.pageSize
        if(start==0){
          this.pcqdlistTable.pagination.current=1
        }else{
          this.pcqdlistTable.pagination.current= Math.ceil(start/size)
        }
        this.pcqdlistTable.pagination.pageSize=size
        this.reqPcqdlistTableData()
      },
      //隐患记录
      reqYhjllistTableData(){
        this.yhjllistTable.tableIsLoading=true
        const parameter={
          param1:this.qyId,
          limit:this.yhjllistTable.pagination.pageSize,
          start:(this.yhjllistTable.pagination.current -1)*this.yhjllistTable.pagination.pageSize
        }
        this.reqYhjlList(parameter)
          .then((res)=>{
            this.yhjllistTable.dataSource=this.get_yhjl_list()
            this.yhjllistTable.pagination.total=res.totalCount
            this.yhjllistTable.dataSource.forEach(item=>item.index=(this.yhjllistTable.pagination.current -1)*this.yhjllistTable.pagination.pageSize+item.index)
            this.yhjllistTable.tableIsLoading=false
          })
          .catch(err=>console.log(JSON.stringify(err)))
      },
      changeYhjllistCurrentPage(page, pageSize){
        this.yhjllistTable.pagination.current=page
        this.yhjllistTable.pagination.pageSize=pageSize
        this.reqYhjllistTableData()
      },
      showYhjllistSizeChange(current, size){
        const start=(this.yhjllistTable.pagination.current-1 )* this.yhjllistTable.pagination.pageSize
        if(start==0){
          this.yhjllistTable.pagination.current=1
        }else{
          this.yhjllistTable.pagination.current= Math.ceil(start/size)
        }
        this.yhjllistTable.pagination.pageSize=size
        this.reqYhjllistTableData()
      },
    }
  }
</script>

<style lang="scss" >
  .content-list{
    width: 100%;
    padding:36px;
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

  .wry-col-title{
    text-align: right;
    display: inline-block;
    width: 18%;
    padding:3px;
    /*min-height: 32px;*/
  }
  .wry-col-content{
    display: inline-block;
    width: 32%;
    padding:3px;
    /*min-height: 32px;*/
  }
  .width-82{
    width: 82% !important;
  }

</style>