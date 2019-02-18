<template>
  <div>
    <!--锚点-->
    <div style="float: right;margin-right:10px;width: 150px;padding-top:50px">
      <a-anchor  @click="handleAnchorClick">
        <a-anchor-link href="#职业卫生信息" title="职业卫生信息" />
        <a-anchor-link href="#职业病危害因素分布" title="职业病危害因素分布" />
        <a-anchor-link href="#职业健康监护" title="职业健康监护" />
        <a-anchor-link href="#检测报告登记" title="检测报告登记" />
      </a-anchor>
    </div>
    <!--详细内容-->
    <div class="content-list">
      <div class="content-wrapper" id="职业卫生信息">
        <div class="header">
          <span class="before-title"> </span>
          <span class="title">职业卫生信息</span>
          <span class="button-bar"></span>
        </div>
        <div class="content">
          <div style="width: 100%">
            <span class="wry-col-title"><div>职业卫生管理人员姓名：</div></span>
            <span class="wry-col-content"><div>{{zywsInfo.zywsxx.length==0 ? '': zywsInfo.zywsxx[0].gly}}</div></span>
            <span class="wry-col-title"><div>职业卫生管理人联系电话：</div></span>
            <span class="wry-col-content"><div>{{zywsInfo.zywsxx.length==0 ? '': zywsInfo.zywsxx[0].glydh}}</div></span>
          </div>
          <div style="width: 100%">
            <span class="wry-col-title"><div>是否专职：</div></span>
            <span class="wry-col-content"><div>{{zywsInfo.zywsxx.length>0 ? zywsInfo.zywsxx[0].sfzz==1 ? '是':'否' : ''}}</div></span>
            <span class="wry-col-title"><div>是否参加发证培训：</div></span>
            <span class="wry-col-content"><div>{{zywsInfo.zywsxx.length>0 ? zywsInfo.zywsxx[0].sfpx==1 ? '是':'否' : ''}}</div></span>
          </div>
          <div style="width: 100%">
            <span class="wry-col-title"><div>合格编号：</div></span>
            <span class="wry-col-content"><div>{{zywsInfo.zywsxx.length==0 ? '' : zywsInfo.zywsxx[0].zsbh}}</div></span>
            <span class="wry-col-title"><div>有无职业卫生管理机构：</div></span>
            <span class="wry-col-content"><div>{{zywsInfo.zywsxx.length==0 ? '': zywsInfo.zywsxx[0].ywgljg}}</div></span>
          </div>
          <div style="width: 100%">
            <span class="wry-col-title"><div>职业卫生管理专职人数：</div></span>
            <span class="wry-col-content"><div>{{zywsInfo.zywsxx.length == 0 ? '': zywsInfo.zywsxx[0].wsglzzrs}}</div></span>
            <span class="wry-col-title"><div>职业卫生管理兼职人数：</div></span>
            <span class="wry-col-content"><div>{{zywsInfo.zywsxx.length == 0 ? '': zywsInfo.zywsxx[0].wsgljzrs}}</div></span>
          </div>
          <div style="width: 100%">
            <span class="wry-col-title"><div>男劳动者数：</div></span>
            <span class="wry-col-content"><div>{{zywsInfo.zywsxx.length == 0 ? '' : zywsInfo.zywsxx[0].nam }}</div></span>
            <span class="wry-col-title"><div>女劳动者数：</div></span>
            <span class="wry-col-content"><div>{{zywsInfo.zywsxx.length==0 ? '' : zywsInfo.zywsxx[0].woman}}</div></span>
          </div>
          <div style="width: 100%">
            <span class="wry-col-title"><div>教育培训数：</div></span>
            <span class="wry-col-content"><div>{{zywsInfo.zywsxx.length==0 ? '': zywsInfo.zywsxx[0].pxrs}}</div></span>
            <span class="wry-col-title"><div>职业病危害劳动合同告知数：</div></span>
            <span class="wry-col-content"><div>{{zywsInfo.zywsxx.length==0 ? '' : zywsInfo.zywsxx[0].zybwhgzs}}</div></span>
          </div>
          <div style="width: 100%">
            <span class="wry-col-title"><div>接触职业病危害总人数：</div></span>
            <span class="wry-col-content"><div>{{zywsInfo.zywsxx.length==0 ? '' : zywsInfo.zywsxx[0].jczybzs}}</div></span>
            <span class="wry-col-title"><div></div></span>
            <span class="wry-col-content"><div></div></span>
          </div>
        </div>
      </div>
      <div class="content-wrapper" id="职业病危害因素分布">
        <div class="header">
          <span class="before-title"> </span>
          <span class="title">职业病危害因素种类</span>
          <span class="button-bar"></span>
        </div>
        <div class="content zyws-zybwh">
          <div>
            <span class="zyws-left zyws-title">分类 </span>
            <span class="zyws-center zyws-title" style="padding-right: 24px;">接触人数</span>
            <span class="zyws-right zyws-title">接触职业病危害总人数</span>
          </div>
          <div>
            <span class="zyws-left">粉尘类：</span>
            <span class="zyws-center">
              <span>
                <span class="zyws-man">男：{{zybwhzl.fc.man}}</span>
              <span class="zyws-woman">女：{{zybwhzl.fc.woman}}</span>
              <span class="zyws-total">合计：{{zybwhzl.fc.total}}</span>
              </span>
            </span>
            <span class="zyws-right"></span>
          </div>
          <div>
            <span class="zyws-left">化学物质类：</span>
            <span class="zyws-center">
              <span class="zyws-man">男：{{zybwhzl.hxw.man}}</span>
              <span class="zyws-woman">女：{{zybwhzl.hxw.woman}}</span>
              <span class="zyws-total">合计：{{zybwhzl.hxw.total}}</span>
            </span>
            <span class="zyws-right"></span>
          </div>
          <div>
            <span class="zyws-left">物理因素类：</span>
            <span class="zyws-center">
              <span class="zyws-man">男：{{zybwhzl.wlys.man}}</span>
              <span class="zyws-woman">女：{{zybwhzl.wlys.woman}}</span>
              <span class="zyws-total">合计：{{zybwhzl.wlys.total}}</span>
            </span>
            <span class="zyws-right">总计：{{zybwhzl.fc.total+zybwhzl.hxw.total+zybwhzl.wlys.total+zybwhzl.fsxwz.total+zybwhzl.swyh.total}}</span>
          </div>
          <div>
            <span class="zyws-left">放射性物质类：</span>
            <span class="zyws-center">
              <span class="zyws-man">男：{{zybwhzl.fsxwz.man}}</span>
              <span class="zyws-woman">女：{{zybwhzl.fsxwz.woman}}</span>
              <span class="zyws-total">合计：{{zybwhzl.fsxwz.total}}</span>
            </span>
            <span class="zyws-right"></span>
          </div>
          <div>
            <span class="zyws-left">生物有害因素及其他：</span>
            <span class="zyws-center">
              <span class="zyws-man">男：{{zybwhzl.swyh.man}}</span>
              <span class="zyws-woman">女：{{zybwhzl.swyh.woman}}</span>
              <span class="zyws-total">合计：{{zybwhzl.swyh.total}}</span>
            </span>
            <span class="zyws-right"></span>
          </div>
        </div>
      </div>
      <div class="content-wrapper">
        <div class="header">
          <span class="before-title"> </span>
          <span class="title">职业病危害因素分布</span>
          <a-badge :numberStyle="{top:'-3px', 'margin-left':'5px','background-color':'#1478f0'}" :count="Number(zybYsfbTable.pagination.total)" :showZero="true"/>
          <span class="button-bar"></span>
        </div>
        <div class="content">
          <div>
            <a-table
              bordered
              :rowClassName="rowClass"
              :dataSource="zybYsfbTable.dataSource"
              :columns="zybYsfbTable.columns"
              :pagination= "false"
              :size="zybYsfbTable.size"
              :loading="zybYsfbTable.tableIsLoading"
              :scroll="zybYsfbTable.scrollSize"
              :rowSelection="zybYsfbTable.rowSelection"
            >
              <span slot="actionCell" slot-scope="text,record,index" >
          <a href="javascript:;" @click="showModal('query',record)">查看</a>
                <a-divider v-if="" type="vertical" />
                <a href="javascript:;" @click="showModal('map',record)">职业病危害因素</a>
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
              v-model="zybYsfbTable.pagination.current"
              style="margin-top: 8px; float:right; padding-right: 16px;"
              :total="zybYsfbTable.pagination.total"
              :pageSizeOptions="zybYsfbTable.pagination.pageSizeOptions"
              :pageSize="zybYsfbTable.pagination.pageSize"
              showSizeChanger
              showQuickJumper
              :showTotal="total =>`共${total}条数据`"
              @change="changeZybYsfbCurrentPage"
              @showSizeChange="showZybYsfbSizeChange"
              size="small"/>
            <div style="clear: both"></div>
          </div>
        </div>
      </div>
      <div class="content-wrapper" id="职业健康监护">
        <div class="header">
          <span class="before-title"> </span>
          <span class="title">职业健康监护</span>
          <span class="button-bar"></span>
        </div>
        <div class="content">
          <div style="width: 100%">
            <span class="wry-col-title"><div>上岗前体检数：</div></span>
            <span class="wry-col-content"><div>{{zywsInfo.zywsjh.length==0 ? '': zywsInfo.zywsjh[0].sgqtjnum}}</div></span>
            <span class="wry-col-title"><div>岗中体检数：</div></span>
            <span class="wry-col-content"><div>{{zywsInfo.zywsjh.length==0 ? '': zywsInfo.zywsjh[0].gztjnum}}</div></span>
          </div>
          <div style="width: 100%">
            <span class="wry-col-title"><div>离岗前体检数：</div></span>
            <span class="wry-col-content"><div>{{zywsInfo.zywsjh.length==0 ? '': zywsInfo.zywsjh[0].lgtjnum }}</div></span>
            <span class="wry-col-title"><div>职业病种类：</div></span>
            <span class="wry-col-content"><div>{{zywsInfo.zywsjh.length==0 ? '': zywsInfo.zywsjh[0].zyblx }}</div></span>
          </div>
          <div style="width: 100%">
            <span class="wry-col-title"><div>疑似职业病数：</div></span>
            <span class="wry-col-content"><div>{{zywsInfo.zywsjh.length==0 ? '' : zywsInfo.zywsjh[0].yszybnum}}</div></span>
            <span class="wry-col-title"><div>累计职业病数：</div></span>
            <span class="wry-col-content"><div>{{zywsInfo.zywsjh.length==0 ? '': zywsInfo.zywsjh[0].ljzybnum}}</div></span>
          </div>
        </div>
      </div>
      <div class="content-wrapper">
        <div class="header">
          <span class="before-title"> </span>
          <span class="title">职业卫生警示标识告知卡</span>
          <a-badge :numberStyle="{top:'-3px', 'margin-left':'5px','background-color':'#1478f0'}" :count="Number(jsgzTable.pagination.total)" :showZero="true"/>
          <span class="button-bar"></span>
        </div>
        <div class="content">
          <div>
            <a-table
              bordered
              :rowClassName="rowClass"
              :dataSource="jsgzTable.dataSource"
              :columns="jsgzTable.columns"
              :pagination= "false"
              :size="jsgzTable.size"
              :loading="jsgzTable.tableIsLoading"
              :scroll="jsgzTable.scrollSize"
              :rowSelection="jsgzTable.rowSelection"
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
              v-model="jsgzTable.pagination.current"
              style="margin-top: 8px; float:right; padding-right: 16px;"
              :total="jsgzTable.pagination.total"
              :pageSizeOptions="jsgzTable.pagination.pageSizeOptions"
              :pageSize="jsgzTable.pagination.pageSize"
              showSizeChanger
              showQuickJumper
              :showTotal="total =>`共${total}条数据`"
              @change="changeJsgzCurrentPage"
              @showSizeChange="showJsgzSizeChange"
              size="small"/>
            <div style="clear: both"></div>
          </div>
        </div>
      </div>
      <div class="content-wrapper" id="检测报告登记">
        <div class="header">
          <span class="before-title"> </span>
          <span class="title">检测报告登记</span>
          <a-badge :numberStyle="{top:'-3px', 'margin-left':'5px','background-color':'#1478f0'}" :count="Number(jcbgTable.pagination.total)" :showZero="true"/>
          <span class="button-bar"></span>
        </div>
        <div class="content">
          <a-table
            bordered
            :rowClassName="rowClass"
            :dataSource="jcbgTable.dataSource"
            :columns="jcbgTable.columns"
            :pagination= "false"
            :size="jcbgTable.size"
            :loading="jcbgTable.tableIsLoading"
            :scroll="jcbgTable.scrollSize"
            :rowSelection="jcbgTable.rowSelection"
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
            v-model="jcbgTable.pagination.current"
            style="margin-top: 8px; float:right; padding-right: 16px;"
            :total="jcbgTable.pagination.total"
            :pageSizeOptions="jcbgTable.pagination.pageSizeOptions"
            :pageSize="jcbgTable.pagination.pageSize"
            showSizeChanger
            showQuickJumper
            :showTotal="total =>`共${total}条数据`"
            @change="changeJcbgCurrentPage"
            @showSizeChange="showJcbgSizeChange"
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
    name: "Zhiyeweisheng",
    props:{
      qyId:[String,Number],
      recordId:[String,Number],
    },
    data(){
      return{
        zywsInfo:{},
        zybwhzl:{},
        zybYsfbTable:{
          dataSource:[],
          //TODO 后台需优化，否则请求太多
          columns:[
            {title: '序号', dataIndex: 'index', width: '40px',align: 'center'},
            {title: '工作场所名称',dataIndex: 'gzcsname', width: '100px', align: 'center'},
            {title: '接触人数（男）', dataIndex: 'jcnan', width: '70px', align: 'center'},
            {title: '接触人数（女）', dataIndex: 'jcnv', width: '70px', align: 'center',},
            {title: '职业危害因素名称', dataIndex: 'lxPhone', width: '100px', align: 'center',},
            {title: '接触总人数', dataIndex: 'mobilePhone', width: '70px',align: 'center'},
            {title: '备注', dataIndex: 'remark', width: '120px', align: 'center',},
            {title: '操作', dataIndex: 'actions', width: '120px', align: 'center', scopedSlots: {customRender: 'actionCell'}},
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
        jsgzTable:{
          dataSource:[],
          columns:[
            {title: '序号', dataIndex: 'index', width: '50px',align: 'center'},
            {title: '工作场所',dataIndex: 'gzcsname', width: '120px', align: 'center'},
            {title: '警告标识', dataIndex: 'jsbs', width: '100px', align: 'center'},
            {title: '指令标识', dataIndex: 'zlbs', width: '150px', align: 'center',},
            {title: '职业病危害告知卡', dataIndex: 'zybwhgz', width: '150px', align: 'center',},
            {title: '备注', dataIndex: 'remark', width: '150px', align: 'center',},
            {title: '操作', dataIndex: 'actions', width: '50px', align: 'center', scopedSlots: {customRender: 'actionCell'}},
          ],
          size:'small',
          tableIsLoading:false,
          scrollSize: { x:800, y: window.innerHeight - 120},
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
        jcbgTable:{
          dataSource:[],
          columns:[
            {title: '序号', dataIndex: 'index', width: '50px',align: 'center'},
            {title: '编号',dataIndex: 'id', width: '50px', align: 'center'},
            {title: '检查场所', dataIndex: 'jccs', width: '120px', align: 'center'},
            {title: '检测时间', dataIndex: 'jcsj', width: '100px', align: 'center',},
            {title: '检测机构', dataIndex: 'jcjg', width: '150px', align: 'center',},
            {title: '职业危害因素', dataIndex: 'zywhys', width: '150px', align: 'center',},
            {title: '报告时间', dataIndex: 'bgsj', width: '100px', align: 'center',},
            {title: '有效期至', dataIndex: 'yxq', width: '100px', align: 'center',},
            {title: '检测结果', dataIndex: 'jcresult', width: '80px', align: 'center',},
            {title: '检测费用(元)', dataIndex: 'jcfy', width: '80px', align: 'center',},
            {title: '所属企业', dataIndex: 'departName', width: '120px', align: 'center',},
            {title: '备注', dataIndex: 'remark', width: '150px', align: 'center',},
            {title: '操作', dataIndex: 'actions', width: '150px', align: 'center', scopedSlots: {customRender: 'actionCell'}},
          ],
          size:'small',
          tableIsLoading:false,
          scrollSize: { x:1450, y: window.innerHeight - 120},
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
      this.reqZywsInfo()
      this.reqZybwhzlInfo()
      this.reqZybYsfbTableData()
      this.reqJsgzTableData()
      this.reqJcbgTableData()
      this.zybYsfbTable.columns=initColumn(this.zybYsfbTable.columns)
      this.jsgzTable.columns=initColumn(this.jsgzTable.columns)
      this.jcbgTable.columns=initColumn(this.jcbgTable.columns)
    },
    mounted(){

    },
    methods: {
      ...mapGetters(['get_zyws_info','get_zyws_zybwhzl','get_zyws_zybWhysFb','get_zyws_zyJkjh','get_zyws_jsbz','get_zyws_jcbg']),
      ...mapActions(['queryZywsInfo','queryZybWhzl','reqzZybWhysFbList','reqJsbzList','reqJcbgList']),

      handleAnchorClick (e, link) {
        e.preventDefault();
        console.log(link);
      },
      rowClass(record,index){
        if (index%2==1) return 'even-rows'
      },
      reqZywsInfo(){
        const parameter={
          param1:this.recordId
        }
        this.queryZywsInfo(parameter)
          .then((res)=>{
            this.zywsInfo=this.get_zyws_info()[0]
          })
          .catch(err=>console.log(JSON.stringify(err)))
      },

      reqZybwhzlInfo(){
        const parameter={
          param1:this.qyId
        }
        this.queryZybWhzl(parameter)
          .then((res)=>{
            this.zybwhzl=this.get_zyws_zybwhzl()
          })
          .catch(err=>console.log(JSON.stringify(err)))
      },

      reqZybYsfbTableData(){
        this.zybYsfbTable.tableIsLoading=true
        const parameter={
          param1:this.qyId,
          limit:this.zybYsfbTable.pagination.pageSize,
          start:(this.zybYsfbTable.pagination.current -1)*this.zybYsfbTable.pagination.pageSize
        }
        this.reqzZybWhysFbList(parameter)
          .then((res)=>{
            this.zybYsfbTable.dataSource=this.get_zyws_zybWhysFb()
            this.zybYsfbTable.pagination.total=res.totalCount
            this.zybYsfbTable.dataSource.forEach(item=>item.index=(this.zybYsfbTable.pagination.current -1)*this.zybYsfbTable.pagination.pageSize+item.index)
            this.zybYsfbTable.tableIsLoading=false
          })
          .catch(err=>console.log(JSON.stringify(err)))
      },
      changeZybYsfbCurrentPage(page, pageSize){
        this.zybYsfbTable.pagination.current=page
        this.zybYsfbTable.pagination.pageSize=pageSize
        this.reqZybYsfbTableData()
      },
      showZybYsfbSizeChange(current, size){
        const start=(this.zybYsfbTable.pagination.current-1 )* this.zybYsfbTable.pagination.pageSize
        if(start==0){
          this.zybYsfbTable.pagination.current=1
        }else{
          this.zybYsfbTable.pagination.current= Math.ceil(start/size)
        }
        this.zybYsfbTable.pagination.pageSize=size
        this.reqZybYsfbTableData()
      },

      reqJsgzTableData(){
        this.jsgzTable.tableIsLoading=true
        const parameter={
          param1:this.qyId,
          limit:this.jsgzTable.pagination.pageSize,
          start:(this.jsgzTable.pagination.current -1)*this.jsgzTable.pagination.pageSize
        }
        this.reqJsbzList(parameter)
          .then((res)=>{
            this.jsgzTable.dataSource=this.get_zyws_jsbz()
            // debugger
            this.jsgzTable.dataSource.forEach((item)=>{
              item.updateTime=moment(item.updateTime).format('YYYY-MM-DD HH-MM')
              item.index=(this.jsgzTable.pagination.current -1)*this.jsgzTable.pagination.pageSize+item.index
            })
            this.jsgzTable.pagination.total=res.totalCount
            this.jsgzTable.tableIsLoading=false
          })
          .catch(err=>console.log(JSON.stringify(err)))
      },
      changeJsgzCurrentPage(page, pageSize){
        this.jsgzTable.pagination.current=page
        this.jsgzTable.pagination.pageSize=pageSize
        this.reqJsgzTableData()
      },
      showJsgzSizeChange(current, size){
        const start=(this.jsgzTable.pagination.current-1 )* this.jsgzTable.pagination.pageSize
        if(start==0){
          this.jsgzTable.pagination.current=1
        }else{
          this.jsgzTable.pagination.current= Math.ceil(start/size)
        }
        this.jsgzTable.pagination.pageSize=size
        this.reqJsgzTableData()
      },


      reqJcbgTableData(){
        this.jcbgTable.tableIsLoading=true
        const parameter={
          param1:this.qyId,
          limit:this.jcbgTable.pagination.pageSize,
          start:(this.jcbgTable.pagination.current -1)*this.zybYsfbTable.pagination.pageSize
        }
        this.reqJcbgList(parameter)
          .then((res)=>{
            this.jcbgTable.dataSource=this.get_zyws_jcbg()
            this.jcbgTable.dataSource.forEach(item=>item.index=(this.jcbgTable.pagination.current -1)*this.jcbgTable.pagination.pageSize+item.index)
            this.jcbgTable.pagination.total=res.totalCount
            this.jcbgTable.tableIsLoading=false
          })
          .catch(err=>console.log(JSON.stringify(err)))
      },
      changeJcbgCurrentPage(page, pageSize){
        this.jcbgTable.pagination.current=page
        this.jcbgTable.pagination.pageSize=pageSize
        this.reqJcbgTableData()
      },
      showJcbgSizeChange(current, size){
        const start=(this.jcbgTable.pagination.current-1 )* this.jcbgTable.pagination.pageSize
        if(start==0){
          this.jcbgTable.pagination.current=1
        }else{
          this.jcbgTable.pagination.current= Math.ceil(start/size)
        }
        this.jcbgTable.pagination.pageSize=size
        this.reqJcbgTableData()
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
  .zyws-zybwh{
    span{
      display: inline-block;
    }
    .zyws-left{
      width: 180px;
      text-align: left;
    }
    .zyws-left :after{
      content: '：';
    }
    .zyws-title{
      font-size: 14px;
      font-weight: 600;

    }
    .zyws-center{
      width: 250px;
      text-align: center;
      .zyws-man{
        width: 80px;
        text-align: left;
      }
      .zyws-woman{
        width: 80px;
        text-align: left;
      }
      .zyws-total{
        width: 80px;
        text-align: left;
      }
    }
    .zyws-right{
      width: 180px;
      text-align: center;
    }
  }
  .wry-col-title{
    text-align: right;
    display: inline-block;
    width: 25%;
    padding:3px;
    /*min-height: 32px;*/
  }
  .wry-col-content{
    display: inline-block;
    width: 25%;
    padding:3px;
    /*min-height: 32px;*/
  }
  .width-82{
    width: 75% !important;
  }



</style>