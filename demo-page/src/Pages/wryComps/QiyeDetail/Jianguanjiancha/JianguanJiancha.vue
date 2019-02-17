<template>
  <div>
    <!--详细内容-->
    <div class="content-list">
      <div class="content-wrapper" id="监管监察">
        <div class="header">
          <span class="before-title"> </span>
          <span class="title">监管监察</span>
          <a-badge :numberStyle="{top:'-3px', 'margin-left':'5px','background-color':'#1478f0'}" :count="Number(jgjclistTable.pagination.total)" :showZero="true"/>
          <span class="button-bar"></span>
        </div>
        <div class="content">
          <div>
            <a-table
              bordered
              :rowClassName="rowClass"
              :dataSource="jgjclistTable.dataSource"
              :columns="jgjclistTable.columns"
              :pagination= "false"
              :size="jgjclistTable.size"
              :loading="jgjclistTable.tableIsLoading"
              :scroll="jgjclistTable.scrollSize"
              :rowSelection="jgjclistTable.rowSelection"
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
              v-model="jgjclistTable.pagination.current"
              style="margin-top: 8px; float:right; padding-right: 16px;"
              :total="jgjclistTable.pagination.total"
              :pageSizeOptions="jgjclistTable.pagination.pageSizeOptions"
              :pageSize="jgjclistTable.pagination.pageSize"
              showSizeChanger
              showQuickJumper
              :showTotal="total =>`共${total}条数据`"
              @change="changeJgjclistCurrentPage"
              @showSizeChange="showJgjclistSizeChange"
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
    name: "JianguanJiancha",
    props:{
      qyId:[String,Number],
    },
    data(){
      return{
        jgjclistTable:{
          dataSource:[],
          columns:[
            {title: '序号', dataIndex: 'index', width: '50px',align: 'center'},
            {title: '级别',dataIndex: 'wxpType', width: '80px', align: 'center'},
            {title: '隐患描述', dataIndex: 'gdNm', width: '200px', align: 'center'},
            {title: '流程状态', dataIndex: 'casNum', width: '80px', align: 'center',},
            {title: '隐患明细', dataIndex: 'cfdd', width: '80px', align: 'center',scopedSlots: {customRender: 'actionCell'}},
            {title: '责任人', dataIndex: 'syyt', width: '80px', align: 'center',},
            {title: '整改企业', dataIndex: 'departName', width: '100px', align: 'center',},
            {title: '下达时间', dataIndex: 'danwei', width: '100px', align: 'center',},
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
      this.reqJgjclistTableData()
      this.jgjclistTable.columns=initColumn(this.jgjclistTable.columns)

    },
    mounted(){

    },
    methods: {
      ...mapGetters(['get_jgjc_list']),
      ...mapActions(['reqJgjcList']),

      handleAnchorClick (e, link) {
        e.preventDefault();
        console.log(link);
      },
      rowClass(record,index){
        if (index%2==1) return 'even-rows'
      },

      //监管监察
      reqJgjclistTableData(){
        this.jgjclistTable.tableIsLoading=true
        const parameter={
          param1:this.qyId,
          limit:this.jgjclistTable.pagination.pageSize,
          start:(this.jgjclistTable.pagination.current -1)*this.jgjclistTable.pagination.pageSize
        }
        this.reqJgjcList(parameter)
          .then((res)=>{
            this.jgjclistTable.dataSource=this.get_jgjc_list()
            this.jgjclistTable.pagination.total=res.totalCount
            this.jgjclistTable.dataSource.forEach(item=>item.index=(this.jgjclistTable.pagination.current -1)*this.jgjclistTable.pagination.pageSize+item.index)
            this.jgjclistTable.tableIsLoading=false
          })
          .catch(err=>console.log(JSON.stringify(err)))
      },
      changeJgjclistCurrentPage(page, pageSize){
        this.jgjclistTable.pagination.current=page
        this.jgjclistTable.pagination.pageSize=pageSize
        this.reqJgjclistTableData()
      },
      showJgjclistSizeChange(current, size){
        const start=(this.jgjclistTable.pagination.current-1 )* this.jgjclistTable.pagination.pageSize
        if(start==0){
          this.jgjclistTable.pagination.current=1
        }else{
          this.jgjclistTable.pagination.current= Math.ceil(start/size)
        }
        this.jgjclistTable.pagination.pageSize=size
        this.reqJgjclistTableData()
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