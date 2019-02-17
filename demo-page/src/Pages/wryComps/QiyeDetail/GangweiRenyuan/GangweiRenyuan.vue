<template>
  <div>
    <!--锚点-->
    <div style="position: fixed;right:20px;width: 120px;top:100px">
      <a-anchor  @click="handleAnchorClick">
        <a-anchor-link href="#岗位管理" title="岗位管理" />
        <a-anchor-link href="#人员管理" title="人员管理" />
        <a-anchor-link href="#持证人员" title="持证人员" />
        <a-anchor-link href="#岗位清单" title="岗位清单" />
        <a-anchor-link href="#培训管理" title="培训管理" />
      </a-anchor>
    </div>
    <!--详细内容-->
    <div class="content-list">
      <div class="content-wrapper" id="岗位管理">
        <div class="header">
          <span class="before-title"> </span>
          <span class="title">岗位管理</span>
          <a-badge :numberStyle="{top:'-3px', 'margin-left':'5px','background-color':'#1478f0'}" :count="Number(gwlistTable.pagination.total)" :showZero="true"/>
          <span class="button-bar"></span>
        </div>
        <div class="content">
          <div>
            <a-table
              bordered
              :rowClassName="rowClass"
              :dataSource="gwlistTable.dataSource"
              :columns="gwlistTable.columns"
              :pagination= "false"
              :size="gwlistTable.size"
              :loading="gwlistTable.tableIsLoading"
              :scroll="gwlistTable.scrollSize"
              :rowSelection="gwlistTable.rowSelection"
            >
              <span slot="actionCell" slot-scope="text,record,index" >
          <!--<a href="javascript:;" @click="showModal('query',record)">查看</a>-->
                <!--<a-divider v-if="" type="vertical" />-->
                <!--<a href="javascript:;" @click="showModal('map',record)">位置</a>-->
                <!--<a-divider v-if="" type="vertical" />-->
                <a href="javascript:;" @click="showModal('edit',record)">修改</a>
                <a-divider v-if="" type="vertical" />
                <a-popconfirm title="您确认删除该条记录吗？" placement="bottomRight" okText="Yes" cancelText="No" @confirm="deleteRowData(record)">
                <a href="javascript:;">删除</a>
                </a-popconfirm>
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
              v-model="gwlistTable.pagination.current"
              style="margin-top: 8px; float:right; padding-right: 16px;"
              :total="gwlistTable.pagination.total"
              :pageSizeOptions="gwlistTable.pagination.pageSizeOptions"
              :pageSize="gwlistTable.pagination.pageSize"
              showSizeChanger
              showQuickJumper
              :showTotal="total =>`共${total}条数据`"
              @change="changeGwlistCurrentPage"
              @showSizeChange="showGwlistSizeChange"
              size="small"/>
            <div style="clear: both"></div>
          </div>
        </div>
      </div>
      <div class="content-wrapper" id="人员管理">
        <div class="header">
          <span class="before-title"> </span>
          <span class="title">人员管理</span>
          <a-badge :numberStyle="{top:'-3px', 'margin-left':'5px','background-color':'#1478f0'}" :count="Number(rylistTable.pagination.total)" :showZero="true"/>
          <span class="button-bar"></span>
        </div>
        <div class="content">
          <a-table
            bordered
            :rowClassName="rowClass"
            :dataSource="rylistTable.dataSource"
            :columns="rylistTable.columns"
            :pagination= "false"
            :size="rylistTable.size"
            :loading="rylistTable.tableIsLoading"
            :scroll="rylistTable.scrollSize"
            :rowSelection="rylistTable.rowSelection"
          >
              <span slot="actionCell" slot-scope="text,record,index" >
          <!--<a href="javascript:;" @click="showModal('query',record)">查看</a>-->
                <!--<a-divider v-if="" type="vertical" />-->
                <!--<a href="javascript:;" @click="showModal('map',record)">位置</a>-->
                <!--<a-divider v-if="" type="vertical" />-->
                <a href="javascript:;" @click="showModal('edit',record)">修改</a>
                <a-divider v-if="" type="vertical" />
                <a-popconfirm title="您确认删除该条记录吗？" placement="bottomRight" okText="Yes" cancelText="No" @confirm="deleteRowData(record)">
                <a href="javascript:;">删除</a>
                </a-popconfirm>
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
            v-model="rylistTable.pagination.current"
            style="margin-top: 8px; float:right; padding-right: 16px;"
            :total="rylistTable.pagination.total"
            :pageSizeOptions="rylistTable.pagination.pageSizeOptions"
            :pageSize="rylistTable.pagination.pageSize"
            showSizeChanger
            showQuickJumper
            :showTotal="total =>`共${total}条数据`"
            @change="changeRylistCurrentPage"
            @showSizeChange="showRylistSizeChange"
            size="small"/>
          <div style="clear: both"></div>
        </div>
      </div>
      <div class="content-wrapper" id="持证人员">
        <div class="header">
          <span class="before-title"> </span>
          <span class="title">持证人员</span>
          <a-badge :numberStyle="{top:'-3px', 'margin-left':'5px','background-color':'#1478f0'}" :count="Number(czrylistTable.pagination.total)":showZero="true"/>
          <span class="button-bar"></span>
        </div>
        <div class="content">
          <a-table
            bordered
            :rowClassName="rowClass"
            :dataSource="czrylistTable.dataSource"
            :columns="czrylistTable.columns"
            :pagination= "false"
            :size="czrylistTable.size"
            :loading="czrylistTable.tableIsLoading"
            :scroll="czrylistTable.scrollSize"
            :rowSelection="czrylistTable.rowSelection"
          >
              <span slot="actionCell" slot-scope="text,record,index" >
          <a href="javascript:;" @click="showModal('query',record)">查看</a>
                <a-divider v-if="" type="vertical" />
                <a href="javascript:;" @click="showModal('',record)">文件管理</a>
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
            v-model="czrylistTable.pagination.current"
            style="margin-top: 8px; float:right; padding-right: 16px;"
            :total="czrylistTable.pagination.total"
            :pageSizeOptions="czrylistTable.pagination.pageSizeOptions"
            :pageSize="czrylistTable.pagination.pageSize"
            showSizeChanger
            showQuickJumper
            :showTotal="total =>`共${total}条数据`"
            @change="changeCzrylistCurrentPage"
            @showSizeChange="showCzrylistSizeChange"
            size="small"/>
          <div style="clear: both"></div>
        </div>
      </div>
      <div class="content-wrapper" id="岗位清单">
        <div class="header">
          <span class="before-title"> </span>
          <span class="title">岗位清单</span>
          <a-badge :numberStyle="{top:'-3px', 'margin-left':'5px','background-color':'#1478f0'}" :count="Number(gwqdlistTable.pagination.total)" :showZero="true"/>
          <span class="button-bar"></span>
        </div>
        <div class="content">
          <a-table
            bordered
            :rowClassName="rowClass"
            :dataSource="gwqdlistTable.dataSource"
            :columns="gwqdlistTable.columns"
            :pagination= "false"
            :size="gwqdlistTable.size"
            :loading="gwqdlistTable.tableIsLoading"
            :scroll="gwqdlistTable.scrollSize"
            :rowSelection="gwqdlistTable.rowSelection"
          >
              <span slot="actionCell" slot-scope="text,record,index" >
          <a href="javascript:;" @click="showModal('query',record)">查看明细</a>
                <a-divider v-if="" type="vertical" />
                <a href="javascript:;" @click="showModal('map',record)">排查内容</a>
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
            v-model="gwqdlistTable.pagination.current"
            style="margin-top: 8px; float:right; padding-right: 16px;"
            :total="gwqdlistTable.pagination.total"
            :pageSizeOptions="gwqdlistTable.pagination.pageSizeOptions"
            :pageSize="gwqdlistTable.pagination.pageSize"
            showSizeChanger
            showQuickJumper
            :showTotal="total =>`共${total}条数据`"
            @change="changeGwqdlistCurrentPage"
            @showSizeChange="showGwqdlistSizeChange"
            size="small"/>
          <div style="clear: both"></div>
        </div>
      </div>
      <div class="content-wrapper" id="培训管理">
        <div class="header">
          <span class="before-title"> </span>
          <span class="title">培训管理</span>
          <a-badge :numberStyle="{top:'-3px', 'margin-left':'5px','background-color':'#1478f0'}" :count="Number(pxlistTable.pagination.total)" :showZero="true"/>
          <span class="button-bar"></span>
        </div>
        <div class="content">
          <a-table
            bordered
            :rowClassName="rowClass"
            :dataSource="pxlistTable.dataSource"
            :columns="pxlistTable.columns"
            :pagination= "false"
            :size="pxlistTable.size"
            :loading="pxlistTable.tableIsLoading"
            :scroll="pxlistTable.scrollSize"
            :rowSelection="pxlistTable.rowSelection"
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
            v-model="pxlistTable.pagination.current"
            style="margin-top: 8px; float:right; padding-right: 16px;"
            :total="pxlistTable.pagination.total"
            :pageSizeOptions="pxlistTable.pagination.pageSizeOptions"
            :pageSize="pxlistTable.pagination.pageSize"
            showSizeChanger
            showQuickJumper
            :showTotal="total =>`共${total}条数据`"
            @change="changePxlistCurrentPage"
            @showSizeChange="showPxlistSizeChange"
            size="small"/>
          <div style="clear: both"></div>
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
    name: "GangweiRenyuan",
    props:{
      qyId:[String,Number],
    },
    data(){
      return{
        gwlistTable:{
          dataSource:[],
          columns:[
            {title: '序号', dataIndex: 'index', width: '50px',align: 'center'},
            {title: '岗位',dataIndex: 'postNm', width: '100px', align: 'center'},
            {title: '岗位说明', dataIndex: 'postDesc', width: '300px', align: 'center'},
            {title: '所属企业', dataIndex: 'departName', width: '100px', align: 'center',},
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
        rylistTable:{
          dataSource:[],
          columns:[
            {title: '序号', dataIndex: 'index', width: '50px',align: 'center'},
            {title: '姓名',dataIndex: 'name', width: '100px', align: 'center'},
            {title: '性别', dataIndex: 'sex', width: '80px', align: 'center'},
            {title: '登录名', dataIndex: 'loginId', width: '100px', align: 'center',},
            {title: '所属企业', dataIndex: 'departName', width: '120px', align: 'center',},
            {title: '联系电话', dataIndex: 'mobilePhone', width: '100px', align: 'center',},
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
        czrylistTable:{
          dataSource:[],
          columns:[
            {title: '序号', dataIndex: 'index', width: '50px',align: 'center'},
            {title: '姓名',dataIndex: 'userNm', width: '80px', align: 'center'},
            {title: '证件类型', dataIndex: 'zjType', width: '100px', align: 'center'},
            {title: '证件名称', dataIndex: 'zjName', width: '120px', align: 'center',},
            {title: '证件编号', dataIndex: 'pxzs', width: '120px', align: 'center',},
            {title: '证件有效期', dataIndex: 'pxyxq', width: '100px', align: 'center',},
            {title: '发证机关', dataIndex: 'fzjg', width: '120px', align: 'center',},
            {title: '所属企业', dataIndex: 'departName', width: '100px', align: 'center',},
            {title: '操作', dataIndex: 'actions', width: '100px', align: 'center', scopedSlots: {customRender: 'actionCell'}},
          ],
          size:'small',
          tableIsLoading:false,
          scrollSize: { x:950, y: window.innerHeight - 120},
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
        gwqdlistTable:{
          dataSource:[],
          columns:[
            {title: '序号', dataIndex: 'index', width: '50px',align: 'center'},
            {title: '清单编号',dataIndex: 'id', width: '180px', align: 'center'},
            {title: '清单名',dataIndex: 'gdNm', width: '180px', align: 'center'},
            {title: '岗位', dataIndex: 'gwNm', width: '100px', align: 'center'},
            {title: '开始时间', dataIndex: 'kstime', width: '100px', align: 'center',},
            {title: '结束时间', dataIndex: 'jstime', width: '100px', align: 'center',},
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
        pxlistTable:{
          dataSource:[],
          columns:[
            {title: '序号', dataIndex: 'index', width: '50px',align: 'center'},
            {title: '主题',dataIndex: 'zt', width: '100px', align: 'center'},
            {title: '培训类型', dataIndex: 'pxType', width: '80px', align: 'center'},
            {title: '内容', dataIndex: 'remark', width: '150px', align: 'center',},
            {title: '培训时间', dataIndex: 'pxtime', width: '100px', align: 'center',},
            {title: '培训结束时间', dataIndex: 'pxendtime', width: '100px', align: 'center',},
            {title: '培训人数', dataIndex: 'pxrs', width: '50px', align: 'center',},
            {title: '涉及人员', dataIndex: 'sjry', width: '100px', align: 'center',},
            {title: '所属企业', dataIndex: 'departName', width: '100px', align: 'center',},
            {title: '操作', dataIndex: 'actions', width: '100px', align: 'center', scopedSlots: {customRender: 'actionCell'}},
          ],
          size:'small',
          tableIsLoading:false,
          scrollSize: { x:950, y: window.innerHeight - 120},
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
      this.reqGwlistTableData()
      this.reqRylistTableData()
      this.reqCzrylistTableData()
      this.reqGwqdlistTableData()
      this.reqPxlistTableData()
      this.gwlistTable.columns=initColumn(this.gwlistTable.columns)
      this.rylistTable.columns=initColumn(this.rylistTable.columns)
      this.czrylistTable.columns=initColumn(this.czrylistTable.columns)
      this.gwqdlistTable.columns=initColumn(this.gwqdlistTable.columns)
      this.pxlistTable.columns=initColumn(this.pxlistTable.columns)
    },
    mounted(){

    },
    methods: {
      ...mapGetters(['get_gwry_gwlist','get_gwry_rylist','get_gwry_czrylist','get_gwry_gwqdlist','get_gwry_pxlist']),
      ...mapActions(['reqGangweiList','reqRenyuanList','reqChizhengList','reqGwqdList','reqPeixunList']),

      handleAnchorClick (e, link) {
        e.preventDefault();
        console.log(link);
      },
      rowClass(record,index){
        if (index%2==1) return 'even-rows'
      },

      //岗位
      reqGwlistTableData(){
        this.gwlistTable.tableIsLoading=true
        const parameter={
          param1:this.qyId,
          limit:this.gwlistTable.pagination.pageSize,
          start:(this.gwlistTable.pagination.current -1)*this.gwlistTable.pagination.pageSize
        }
        this.reqGangweiList(parameter)
          .then((res)=>{
            this.gwlistTable.dataSource=this.get_gwry_gwlist()
            this.gwlistTable.pagination.total=res.totalCount
            this.gwlistTable.dataSource.forEach(item=>item.index=(this.gwlistTable.pagination.current -1)*this.gwlistTable.pagination.pageSize+item.index)
            this.gwlistTable.tableIsLoading=false
          })
          .catch(err=>console.log(JSON.stringify(err)))
      },
      changeGwlistCurrentPage(page, pageSize){
        this.gwlistTable.pagination.current=page
        this.gwlistTable.pagination.pageSize=pageSize
        this.reqGwlistTableData()
      },
      showGwlistSizeChange(current, size){
        const start=(this.gwlistTable.pagination.current-1 )* this.gwlistTable.pagination.pageSize
        if(start==0){
          this.gwlistTable.pagination.current=1
        }else{
          this.gwlistTable.pagination.current= Math.ceil(start/size)
        }
        this.gwlistTable.pagination.pageSize=size
        this.reqGwlistTableData()
      },

      //人员
      reqRylistTableData(){
        this.rylistTable.tableIsLoading=true
        const parameter={
          param1:this.qyId,
          limit:this.rylistTable.pagination.pageSize,
          start:(this.rylistTable.pagination.current -1)*this.rylistTable.pagination.pageSize
        }
        this.reqRenyuanList(parameter)
          .then((res)=>{
            this.rylistTable.dataSource=this.get_gwry_rylist()
            // debugger
            this.rylistTable.dataSource.forEach((item)=>{
              // item.updateTime=moment(item.updateTime).format('YYYY-MM-DD HH-MM')
              item.index=(this.rylistTable.pagination.current -1)*this.rylistTable.pagination.pageSize+item.index
            })
            this.rylistTable.pagination.total=res.totalCount
            this.rylistTable.tableIsLoading=false
          })
          .catch(err=>console.log(JSON.stringify(err)))
      },
      changeRylistCurrentPage(page, pageSize){
        this.rylistTable.pagination.current=page
        this.rylistTable.pagination.pageSize=pageSize
        this.reqRylistTableData()
      },
      showRylistSizeChange(current, size){
        const start=(this.rylistTable.pagination.current-1 )* this.rylistTable.pagination.pageSize
        if(start==0){
          this.rylistTable.pagination.current=1
        }else{
          this.rylistTable.pagination.current= Math.ceil(start/size)
        }
        this.rylistTable.pagination.pageSize=size
        this.reqRylistTableData()
      },

      //持证人员
      reqCzrylistTableData(){
        this.czrylistTable.tableIsLoading=true
        const parameter={
          param1:this.qyId,
          limit:this.czrylistTable.pagination.pageSize,
          start:(this.czrylistTable.pagination.current -1)*this.czrylistTable.pagination.pageSize
        }
        this.reqChizhengList(parameter)
          .then((res)=>{
            this.czrylistTable.dataSource=this.get_gwry_czrylist()
            this.czrylistTable.dataSource.forEach(item=>item.index=(this.czrylistTable.pagination.current -1)*this.czrylistTable.pagination.pageSize+item.index)
            this.czrylistTable.pagination.total=res.totalCount
            this.czrylistTable.tableIsLoading=false
          })
          .catch(err=>console.log(JSON.stringify(err)))
      },
      changeCzrylistCurrentPage(page, pageSize){
        this.czrylistTable.pagination.current=page
        this.czrylistTable.pagination.pageSize=pageSize
        this.reqCzrylistTableData()
      },
      showCzrylistSizeChange(current, size){
        const start=(this.czrylistTable.pagination.current-1 )* this.czrylistTable.pagination.pageSize
        if(start==0){
          this.czrylistTable.pagination.current=1
        }else{
          this.czrylistTable.pagination.current= Math.ceil(start/size)
        }
        this.czrylistTable.pagination.pageSize=size
        this.reqCzrylistTableData()
      },

      //岗位清单
      reqGwqdlistTableData(){
        this.gwqdlistTable.tableIsLoading=true
        const parameter={
          param1:this.qyId,
          limit:this.gwqdlistTable.pagination.pageSize,
          start:(this.gwqdlistTable.pagination.current -1)*this.gwqdlistTable.pagination.pageSize
        }
        this.reqGwqdList(parameter)
          .then((res)=>{
            this.gwqdlistTable.dataSource=this.get_gwry_gwqdlist()
            this.gwqdlistTable.dataSource.forEach((item)=>{
              // item.changetime=moment(item.changetime).format('YYYY-MM-DD HH-MM')
              // item.audittime=item.audittime?moment(item.audittime).format('YYYY-MM-DD HH-MM'):''
              item.index=(this.gwqdlistTable.pagination.current -1)*this.gwqdlistTable.pagination.pageSize+item.index
            })
            this.gwqdlistTable.pagination.total=res.totalCount
            this.gwqdlistTable.tableIsLoading=false
          })
          .catch(err=>console.log(JSON.stringify(err)))
      },
      changeGwqdlistCurrentPage(page, pageSize){
        this.gwqdlistTable.pagination.current=page
        this.gwqdlistTable.pagination.pageSize=pageSize
        this.reqGwqdlistTableData()
      },
      showGwqdlistSizeChange(current, size){
        const start=(this.gwqdlistTable.pagination.current-1 )* this.gwqdlistTable.pagination.pageSize
        if(start==0){
          this.gwqdlistTable.pagination.current=1
        }else{
          this.gwqdlistTable.pagination.current= Math.ceil(start/size)
        }
        this.gwqdlistTable.pagination.pageSize=size
        this.reqGwqdlistTableData()
      },


      //培训
      reqPxlistTableData(){
        this.pxlistTable.tableIsLoading=true
        const parameter={
          param1:this.qyId,
          limit:this.pxlistTable.pagination.pageSize,
          start:(this.pxlistTable.pagination.current -1)*this.pxlistTable.pagination.pageSize
        }
        this.reqPeixunList(parameter)
          .then((res)=>{
            this.pxlistTable.dataSource=this.get_gwry_pxlist()
            this.pxlistTable.dataSource.forEach((item)=>{
              // item.changetime=moment(item.changetime).format('YYYY-MM-DD HH-MM')
              // item.audittime=item.audittime?moment(item.audittime).format('YYYY-MM-DD HH-MM'):''
              item.index=(this.pxlistTable.pagination.current -1)*this.pxlistTable.pagination.pageSize+item.index
            })
            this.pxlistTable.pagination.total=res.totalCount
            this.pxlistTable.tableIsLoading=false
          })
          .catch(err=>console.log(JSON.stringify(err)))
      },
      changePxlistCurrentPage(page, pageSize){
        this.pxlistTable.pagination.current=page
        this.pxlistTable.pagination.pageSize=pageSize
        this.reqPxlistTableData()
      },
      showPxlistSizeChange(current, size){
        const start=(this.pxlistTable.pagination.current-1 )* this.pxlistTable.pagination.pageSize
        if(start==0){
          this.pxlistTable.pagination.current=1
        }else{
          this.pxlistTable.pagination.current= Math.ceil(start/size)
        }
        this.pxlistTable.pagination.pageSize=size
        this.reqPxlistTableData()
      },
    }
  }
</script>

<style lang="scss" scoped>
  .content-list{
    width: calc(100% - 150px);
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