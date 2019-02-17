<template>
  <div>
    <!--详细内容-->
    <div class="content-list">
      <div class="content-wrapper" id="应急预案">
        <div class="header">
          <span class="before-title"> </span>
          <span class="title">应急预案</span>
          <a-badge :numberStyle="{top:'-3px', 'margin-left':'5px','background-color':'#1478f0'}" :count="Number(yjyalistTable.pagination.total)" :showZero="true"/>
          <span class="button-bar"></span>
        </div>
        <div class="content">
          <div>
            <a-table
              bordered
              :rowClassName="rowClass"
              :dataSource="yjyalistTable.dataSource"
              :columns="yjyalistTable.columns"
              :pagination= "false"
              :size="yjyalistTable.size"
              :loading="yjyalistTable.tableIsLoading"
              :scroll="yjyalistTable.scrollSize"
              :rowSelection="yjyalistTable.rowSelection"
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
              v-model="yjyalistTable.pagination.current"
              style="margin-top: 8px; float:right; padding-right: 16px;"
              :total="yjyalistTable.pagination.total"
              :pageSizeOptions="yjyalistTable.pagination.pageSizeOptions"
              :pageSize="yjyalistTable.pagination.pageSize"
              showSizeChanger
              showQuickJumper
              :showTotal="total =>`共${total}条数据`"
              @change="changeYjyalistCurrentPage"
              @showSizeChange="showYjyalistSizeChange"
              size="small"/>
            <div style="clear: both"></div>
          </div>
        </div>
      </div>
      <div class="content-wrapper" id="应急演练">
        <div class="header">
          <span class="before-title"> </span>
          <span class="title">应急演练</span>
          <a-badge :numberStyle="{top:'-3px', 'margin-left':'5px','background-color':'#1478f0'}" :count="Number(yjyllistTable.pagination.total)" :showZero="true"/>
          <span class="button-bar"></span>
        </div>
        <div class="content">
          <div>
            <a-table
              bordered
              :rowClassName="rowClass"
              :dataSource="yjyllistTable.dataSource"
              :columns="yjyllistTable.columns"
              :pagination= "false"
              :size="yjyllistTable.size"
              :loading="yjyllistTable.tableIsLoading"
              :scroll="yjyllistTable.scrollSize"
              :rowSelection="yjyllistTable.rowSelection"
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
              v-model="yjyllistTable.pagination.current"
              style="margin-top: 8px; float:right; padding-right: 16px;"
              :total="yjyllistTable.pagination.total"
              :pageSizeOptions="yjyllistTable.pagination.pageSizeOptions"
              :pageSize="yjyllistTable.pagination.pageSize"
              showSizeChanger
              showQuickJumper
              :showTotal="total =>`共${total}条数据`"
              @change="changeYjyllistCurrentPage"
              @showSizeChange="showYjyllistSizeChange"
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
    name: "Yingji",
    props:{
      qyId:[String,Number],
    },
    data(){
      return{
        yjyalistTable:{
          dataSource:[],
          columns:[
            {title: '序号', dataIndex: 'index', width: '50px',align: 'center'},
            {title: '预案体系',dataIndex: 'yatx', width: '100px', align: 'center'},
            {title: '预案名称', dataIndex: 'yaname', width: '120px', align: 'center'},
            {title: '预案描述', dataIndex: 'yacontent', width: '150px', align: 'center',},
            {title: '审核人', dataIndex: 'uaudituser', width: '60px', align: 'center',},
            {title: '计划开始日期', dataIndex: 'planstartDate', width: '80px', align: 'center',},
            {title: '预案演练周期', dataIndex: 'scheNm', width: '80px', align: 'center',},
            {title: '是否启用', dataIndex: 'sfqy', width: '50px', align: 'center',},
            {title: '备注', dataIndex: 'remark', width: '120px', align: 'center',},
            {title: '计划有效期', dataIndex: 'endDay', width: '80px', align: 'center',},
            {title: '操作', dataIndex: 'actions', width: '80px', align: 'center', scopedSlots: {customRender: 'actionCell'}},
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
        yjyllistTable:{
          dataSource:[],
          columns:[
            {title: '序号', dataIndex: 'index', width: '50px',align: 'center'},
            {title: '演练名称',dataIndex: 'ylname', width: '120px', align: 'center'},
            {title: '演练类型', dataIndex: 'yltype', width: '80px', align: 'center'},
            {title: '演练年度', dataIndex: 'nd', width: '40px', align: 'center',},
            {title: '演练时间', dataIndex: 'yltime', width: '100px', align: 'center',},
            {title: '演练内容', dataIndex: 'ylcontent', width: '150px', align: 'center'},
            {title: '演练地点', dataIndex: 'yldd', width: '100px', align: 'center',},
            {title: '参演人数', dataIndex: 'ylrs', width: '50px', align: 'center',},
            {title: '金额', dataIndex: 'money', width: '50px', align: 'center',},
            {title: '涉及人员', dataIndex: 'ylusers', width: '150px', align: 'center',},
            {title: '是否完成', dataIndex: 'sfwc', width: '50px', align: 'center',},
            {title: '操作', dataIndex: 'actions', width: '100px', align: 'center', scopedSlots: {customRender: 'actionCell'}},
          ],
          size:'small',
          tableIsLoading:false,
          scrollSize: { x:1000, y: window.innerHeight - 120},
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
      this.reqYjyalistTableData()
      this.reqYjyllistTableData()
      this.yjyalistTable.columns=initColumn(this.yjyalistTable.columns)
      this.yjyllistTable.columns=initColumn(this.yjyllistTable.columns)
    },
    mounted(){

    },
    methods: {
      ...mapGetters(['get_yjya_list','get_yjyl_list']),
      ...mapActions(['reqYjyaList','reqYjylList']),

      handleAnchorClick (e, link) {
        e.preventDefault();
        console.log(link);
      },
      rowClass(record,index){
        if (index%2==1) return 'even-rows'
      },

      //排查清单
      reqYjyalistTableData(){
        this.yjyalistTable.tableIsLoading=true
        const parameter={
          param1:this.qyId,
          limit:this.yjyalistTable.pagination.pageSize,
          start:(this.yjyalistTable.pagination.current -1)*this.yjyalistTable.pagination.pageSize
        }
        this.reqYjyaList(parameter)
          .then((res)=>{
            this.yjyalistTable.dataSource=this.get_yjya_list()
            this.yjyalistTable.pagination.total=res.totalCount
            this.yjyalistTable.dataSource.forEach(item=>item.index=(this.yjyalistTable.pagination.current -1)*this.yjyalistTable.pagination.pageSize+item.index)
            this.yjyalistTable.tableIsLoading=false
          })
          .catch(err=>console.log(JSON.stringify(err)))
      },
      changeYjyalistCurrentPage(page, pageSize){
        this.yjyalistTable.pagination.current=page
        this.yjyalistTable.pagination.pageSize=pageSize
        this.reqYjyalistTableData()
      },
      showYjyalistSizeChange(current, size){
        const start=(this.yjyalistTable.pagination.current-1 )* this.yjyalistTable.pagination.pageSize
        if(start==0){
          this.yjyalistTable.pagination.current=1
        }else{
          this.yjyalistTable.pagination.current= Math.ceil(start/size)
        }
        this.yjyalistTable.pagination.pageSize=size
        this.reqYjyalistTableData()
      },
      //隐患记录
      reqYjyllistTableData(){
        this.yjyllistTable.tableIsLoading=true
        const parameter={
          param1:this.qyId,
          limit:this.yjyllistTable.pagination.pageSize,
          start:(this.yjyllistTable.pagination.current -1)*this.yjyllistTable.pagination.pageSize
        }
        this.reqYjylList(parameter)
          .then((res)=>{
            this.yjyllistTable.dataSource=this.get_yjyl_list()
            this.yjyllistTable.pagination.total=res.totalCount
            this.yjyllistTable.dataSource.forEach((item)=>{
              item.index=(this.yjyllistTable.pagination.current -1)*this.yjyllistTable.pagination.pageSize+item.index
              item.yltime=moment(item.yltime).format('YYYY-MM-DD HH-MM')
            })
            this.yjyllistTable.tableIsLoading=false
          })
          .catch(err=>console.log(JSON.stringify(err)))
      },
      changeYjyllistCurrentPage(page, pageSize){
        this.yjyllistTable.pagination.current=page
        this.yjyllistTable.pagination.pageSize=pageSize
        this.reqYjyllistTableData()
      },
      showYjyllistSizeChange(current, size){
        const start=(this.yjyllistTable.pagination.current-1 )* this.yjyllistTable.pagination.pageSize
        if(start==0){
          this.yjyllistTable.pagination.current=1
        }else{
          this.yjyllistTable.pagination.current= Math.ceil(start/size)
        }
        this.yjyllistTable.pagination.pageSize=size
        this.reqYjyllistTableData()
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