<template>
  <div>
    <!--详细内容-->
    <div class="content-list">
      <div class="content-wrapper" id="危险品">
        <div class="header">
          <span class="before-title"> </span>
          <span class="title">危险品</span>
          <a-badge :numberStyle="{top:'-3px', 'margin-left':'5px','background-color':'#1478f0'}" :count="Number(wxplistTable.pagination.total)" :showZero="true"/>
          <span class="button-bar"></span>
        </div>
        <div class="content">
          <div>
            <a-table
              bordered
              :rowClassName="rowClass"
              :dataSource="wxplistTable.dataSource"
              :columns="wxplistTable.columns"
              :pagination= "false"
              :size="wxplistTable.size"
              :loading="wxplistTable.tableIsLoading"
              :scroll="wxplistTable.scrollSize"
              :rowSelection="wxplistTable.rowSelection"
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
              v-model="wxplistTable.pagination.current"
              style="margin-top: 8px; float:right; padding-right: 16px;"
              :total="wxplistTable.pagination.total"
              :pageSizeOptions="wxplistTable.pagination.pageSizeOptions"
              :pageSize="wxplistTable.pagination.pageSize"
              showSizeChanger
              showQuickJumper
              :showTotal="total =>`共${total}条数据`"
              @change="changeWxplistCurrentPage"
              @showSizeChange="showWxplistSizeChange"
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
    name: "Weixianpin",
    props:{
      qyId:[String,Number],
    },
    data(){
      return{
        wxplistTable:{
          dataSource:[],
          columns:[
            {title: '序号', dataIndex: 'index', width: '50px',align: 'center'},
            {title: '危险品品名',dataIndex: 'wxpType', width: '100px', align: 'center'},
            {title: '危险品别名', dataIndex: 'wxpName', width: '100px', align: 'center'},
            {title: 'CAS号', dataIndex: 'casNum', width: '100px', align: 'center',},
            {title: '存放地点', dataIndex: 'cfdd', width: '100px', align: 'center',},
            {title: '使用用途', dataIndex: 'syyt', width: '100px', align: 'center',},
            {title: '存储量', dataIndex: 'wxpNum', width: '80px', align: 'center',},
            {title: '单位', dataIndex: 'danwei', width: '80px', align: 'center',},
            {title: '是否剧毒', dataIndex: 'sfjd', width: '80px', align: 'center',},
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
      this.reqWxplistTableData()
      this.wxplistTable.columns=initColumn(this.wxplistTable.columns)

    },
    mounted(){

    },
    methods: {
      ...mapGetters(['get_wxp_list']),
      ...mapActions(['reqQyWxpList']),

      handleAnchorClick (e, link) {
        e.preventDefault();
        console.log(link);
      },
      rowClass(record,index){
        if (index%2==1) return 'even-rows'
      },

      //岗位
      reqWxplistTableData(){
        this.wxplistTable.tableIsLoading=true
        const parameter={
          param1:this.qyId,
          limit:this.wxplistTable.pagination.pageSize,
          start:(this.wxplistTable.pagination.current -1)*this.wxplistTable.pagination.pageSize
        }
        this.reqQyWxpList(parameter)
          .then((res)=>{
            // debugger
            this.wxplistTable.dataSource=this.get_wxp_list()
            this.wxplistTable.pagination.total=res.totalCount
            this.wxplistTable.dataSource.forEach(item=>item.index=(this.wxplistTable.pagination.current -1)*this.wxplistTable.pagination.pageSize+item.index)
            this.wxplistTable.tableIsLoading=false
          })
          .catch(err=>console.log(JSON.stringify(err)))
      },
      changeWxplistCurrentPage(page, pageSize){
        this.wxplistTable.pagination.current=page
        this.wxplistTable.pagination.pageSize=pageSize
        this.reqWxplistTableData()
      },
      showWxplistSizeChange(current, size){
        const start=(this.wxplistTable.pagination.current-1 )* this.wxplistTable.pagination.pageSize
        if(start==0){
          this.wxplistTable.pagination.current=1
        }else{
          this.wxplistTable.pagination.current= Math.ceil(start/size)
        }
        this.wxplistTable.pagination.pageSize=size
        this.reqWxplistTableData()
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