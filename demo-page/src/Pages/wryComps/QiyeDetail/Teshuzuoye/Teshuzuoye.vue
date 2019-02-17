<template>
  <div>
    <!--详细内容-->
    <div class="content-list">
      <div class="content-wrapper" id="特殊作业">
        <div class="header">
          <span class="before-title"> </span>
          <span class="title">特殊作业</span>
          <a-badge :numberStyle="{top:'-3px', 'margin-left':'5px','background-color':'#1478f0'}" :count="Number(tszylistTable.pagination.total)" :showZero="true"/>
          <span class="button-bar"></span>
        </div>
        <div class="content">
          <div>
            <a-table
              bordered
              :rowClassName="rowClass"
              :dataSource="tszylistTable.dataSource"
              :columns="tszylistTable.columns"
              :pagination= "false"
              :size="tszylistTable.size"
              :loading="tszylistTable.tableIsLoading"
              :scroll="tszylistTable.scrollSize"
              :rowSelection="tszylistTable.rowSelection"
            >
              <span slot="actionCell" slot-scope="text,record,index" >
          <a href="javascript:;" @click="showModal('query',record)">查看</a>
                <a-divider v-if="" type="vertical" />
                <a href="javascript:;" @click="showModal('map',record)">文件管理</a>
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
              v-model="tszylistTable.pagination.current"
              style="margin-top: 8px; float:right; padding-right: 16px;"
              :total="tszylistTable.pagination.total"
              :pageSizeOptions="tszylistTable.pagination.pageSizeOptions"
              :pageSize="tszylistTable.pagination.pageSize"
              showSizeChanger
              showQuickJumper
              :showTotal="total =>`共${total}条数据`"
              @change="changeTszylistCurrentPage"
              @showSizeChange="showTszylistSizeChange"
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
    name: "Teshuzuoye",
    props:{
      qyId:[String,Number],
    },
    data(){
      return{
        tszylistTable:{
          dataSource:[],
          columns:[
            {title: '序号', dataIndex: 'index', width: '50px',align: 'center'},
            {title: '作业名称',dataIndex: 'zymc', width: '120px', align: 'center'},
            {title: '作业类型', dataIndex: 'zylx', width: '80px', align: 'center'},
            {title: '开始时间', dataIndex: 'kssj', width: '100px', align: 'center',},
            {title: '结束时间', dataIndex: 'jssj', width: '100px', align: 'center',},
            {title: '作业人员', dataIndex: 'zyry', width: '100px', align: 'center',},
            {title: '作业地点', dataIndex: 'zydd', width: '100px', align: 'center',},
            {title: '描述', dataIndex: 'zydesc', width: '150px', align: 'center',},
            {title: '操作', dataIndex: 'actions', width: '100px', align: 'center', scopedSlots: {customRender: 'actionCell'}},
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
      this.reqTszylistTableData()
      this.tszylistTable.columns=initColumn(this.tszylistTable.columns)

    },
    mounted(){

    },
    methods: {
      ...mapGetters(['get_tszy_list']),
      ...mapActions(['reqTszyList']),

      handleAnchorClick (e, link) {
        e.preventDefault();
        console.log(link);
      },
      rowClass(record,index){
        if (index%2==1) return 'even-rows'
      },

      //岗位
      reqTszylistTableData(){
        this.tszylistTable.tableIsLoading=true
        const parameter={
          param1:this.qyId,
          limit:this.tszylistTable.pagination.pageSize,
          start:(this.tszylistTable.pagination.current -1)*this.tszylistTable.pagination.pageSize
        }
        this.reqTszyList(parameter)
          .then((res)=>{
            this.tszylistTable.dataSource=this.get_tszy_list()
            this.tszylistTable.pagination.total=res.totalCount
            this.tszylistTable.dataSource.forEach((item)=>{
              item.index=(this.tszylistTable.pagination.current -1)*this.tszylistTable.pagination.pageSize+item.index
              item.kssj=moment(item.kssj).format('YYYY-MM-DD HH-MM')
              item.jssj=moment(item.jssj).format('YYYY-MM-DD HH-MM')
            })
            this.tszylistTable.tableIsLoading=false
          })
          .catch(err=>console.log(JSON.stringify(err)))
      },
      changeTszylistCurrentPage(page, pageSize){
        this.tszylistTable.pagination.current=page
        this.tszylistTable.pagination.pageSize=pageSize
        this.reqTszylistTableData()
      },
      showTszylistSizeChange(current, size){
        const start=(this.tszylistTable.pagination.current-1 )* this.tszylistTable.pagination.pageSize
        if(start==0){
          this.tszylistTable.pagination.current=1
        }else{
          this.tszylistTable.pagination.current= Math.ceil(start/size)
        }
        this.tszylistTable.pagination.pageSize=size
        this.reqTszylistTableData()
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