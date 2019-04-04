<template>
  <div class="sige-baifenlv">
    <!--下面是顶部的按钮栏-->
    <!--<div  class="header-buttons-bar" style="padding: 12px; display: flex;vertical-align: middle;">-->
      <!--&lt;!&ndash;<span style="display: inline-block;margin-top: 0px"><a-button @click="refresh"size="small">刷新</a-button></span>&ndash;&gt;-->
      <!--<template>-->
        <!--<a-select style="width: 120px;margin-right: 12px" v-model="yearSelectKey">-->
          <!--<a-select-option v-for="item in yearSels" :value="item.value">{{item.label}}</a-select-option>-->
        <!--</a-select>-->
        <!--<a-select  style="width: 120px;margin-right: 12px" v-model="jdSelectKey">-->
          <!--<a-select-option value="1">第一季度</a-select-option>-->
          <!--<a-select-option value="2">第二季度</a-select-option>-->
          <!--<a-select-option value="3">第三季度</a-select-option>-->
          <!--<a-select-option value="4">第四季度</a-select-option>-->
        <!--</a-select>-->
        <!--<a-button type="primary" style="margin-top: 0; margin-right: 12px" @click="reqTableData">确定</a-button>-->
        <!--<a-breadcrumb style="margin-top: 5px">-->
          <!--<a-breadcrumb-item v-for="(item,index) in breadcrumbs"><a @click="selBreadcrumb(item,index)">{{item.departName}}</a></a-breadcrumb-item>-->
        <!--</a-breadcrumb>-->
      <!--</template>-->
    <!--</div>-->

    <!--下面是表格区域，分为表格主体和分页器-->

    <div>
      <a-table
        bordered
        :rowClassName="rowClass"
        :dataSource="table.dataSource"
        :columns="table.columns"
        :pagination= "false"
        :size="table.size"
        :loading="table.tableIsLoading"
        :scroll="table.scrollSize"
        :rowSelection="table.rowSelection"
      >
        <span slot="actionCell" slot-scope="text,record,index" >
          <!--<a v-if="activeTab=='2'" href="javascript:;" @click="showModal('query',record)">查看</a>-->
          <!--<a-divider v-if="" type="vertical" />-->
          <!--<a href="javascript:;" @click="showModal('map',record)">位置</a>-->
          <!--<a-divider v-if="" type="vertical" />-->
          <!--<a href="javascript:;" @click="showModal('add',record)">归档</a>-->
          <!--<a-divider v-if="" type="vertical" />-->
          <!--<a-popconfirm title="您确认删除该条记录吗？" placement="bottomRight" okText="Yes" cancelText="No" @confirm="deleteRowData(record)">-->
          <!--<a href="javascript:;">删除</a>-->
          <!--</a-popconfirm>-->

        </span>
        <span slot="dwmc" slot-scope="text,record,index">
          <a v-if="isPid(record.departmentId)" @click="selDepartment(record.departmentId)">{{text}}</a>
          <div v-else>{{text}}</div>
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
      <div class="bottom-pagination-warpper" style="width: calc(100% - 176px)">
        <!--<a-pagination-->
          <!--v-model="pagination.current"-->
          <!--style="float:right;"-->
          <!--:total="pagination.total"-->
          <!--:pageSizeOptions="pagination.pageSizeOptions"-->
          <!--:pageSize="pagination.pageSize"-->
          <!--showSizeChanger-->
          <!--showQuickJumper-->
          <!--:showTotal="total =>`共${total}条数据`"-->
          <!--@change="changeCurrentPage"-->
          <!--@showSizeChange="showSizeChange"-->
          <!--size="small"/>-->
        <div style="clear: both"></div>
      </div>
    </div>
  </div>
</template>
<script>
  //常用通用工具类
  import {  mapGetters,mapActions } from 'vuex'
  import { initColumn } from '@/utils/tableColumnInit'
  import moment from 'moment'

  //页面全局变量

  const pageName='sigeBaifenlv'

  //修改以下获取store数据的getters 配置
  const getList='jxgl_sgbfl_list'                    //获取table的list
  const getSelOpitons=''              //获取选择项的配置内容
  const getDetailById=''              //获取某一具体记录的详情

  //修改以下增删改查的Actions 方法名
  const reqList=''                    //查询列表
  const createAction=''               //新增记录
  const editAction=''                 //修改记录
  const delAction=''                  //删除
  const editGpsAction=''              //修改Gps信息
  export default{
    name:'sigeBaifenlv',

    data(){
        return {
          recordId:'首页',
          departmentName:'首页',
          lastId:'',
          pIds:[],
          yearSels:[],
          yearSelectKey:null,
          jdSelectKey:null,
          breadcrumbs:[{
            departName:'首页',
            departmentId:'首页',
          }],
          //表格配置
          table:{
            dataSource:[],
            columns:[
              {title: '序号', dataIndex: 'index', width: '50px',align: 'center',style:{'font-size':'16px'}},
              {title: '考核单位名称', dataIndex: 'departName', width: '150px',align: 'left',titleAlign:'center',scopedSlots: {customRender: 'dwmc'},style:{'font-size':'16px'}},
              {title:'上报率',
              children:[
                {title: '单位数',dataIndex: 'dws', width: '60px', align: 'center',titleAlign:'center',style:{'font-size':'16px'}},
                {title: '上报数 ',dataIndex: 'wcs', width: '60px', align: 'center',titleAlign:'center',style:{'font-size':'16px'}},
                {title: '上报率',dataIndex: 'sbl', width: '60px', align: 'center',titleAlign:'center',style:{color:'#189cfc','font-size':'16px'}},
                {title: '评分',dataIndex: 'sblpf', width: '60px', align: 'center',titleAlign:'center',style:{color:'#189cfc','font-size':'16px'}},
              ]},
              {title:'查处率',
                children:[
                  {title: '黑名单企业数',dataIndex: 'hmds', width: '60px', align: 'center',titleAlign:'center',style:{'font-size':'16px'}},
                  {title: '查处数',dataIndex: 'ccs', width: '60px', align: 'center',titleAlign:'center',style:{'font-size':'16px'}},
                  {title: '查处率',dataIndex: 'ccl', width: '60px', align: 'center',titleAlign:'center',style:{color:'#189cfc','font-size':'16px'}},
                  {title: '评分',dataIndex: 'cclpf', width: '60px', align: 'center',titleAlign:'center',style:{color:'#189cfc','font-size':'16px'}},
                ]},
              {title:'检查率',
                children:[
                  {title: '零隐患企业总数',dataIndex: 'lyhqys', width: '60px', align: 'center',titleAlign:'center',style:{'font-size':'16px'}},
                  {title: '检查数',dataIndex: 'jcs', width: '60px', align: 'center',titleAlign:'center',style:{'font-size':'16px'}},
                  {title: '检查率',dataIndex: 'jcl', width: '60px', align: 'center',titleAlign:'center',style:{color:'#189cfc','font-size':'16px'}},
                  {title: '评分',dataIndex: 'jclpf', width: '60px', align: 'center',titleAlign:'center',style:{color:'#189cfc','font-size':'16px'}},
                ]},
              {title:'抽查率',
                children:[
                  {title: '其他企业数',dataIndex: 'qtqys', width: '60px', align: 'center',titleAlign:'center',style:{'font-size':'16px'}},
                  {title: '抽查数',dataIndex: 'choucs', width: '60px', align: 'center',titleAlign:'center',style:{'font-size':'16px'}},
                  {title: '抽查率',dataIndex: 'choucl', width: '60px', align: 'center',titleAlign:'center',style:{color:'#189cfc','font-size':'16px'}},
                  {title: '评分',dataIndex: 'chouclpf', width: '60px', align: 'center',titleAlign:'center',style:{color:'#189cfc','font-size':'16px'}},
                ]},
              {title: '总分', dataIndex: 'zongfen', width: '80px',align: 'center',titleAlign:'center',style:{color:'#189cfc','font-size':'16px'}},
//              {title: '操作', dataIndex: 'actions', width: '60px', align: 'center', scopedSlots: {customRender: 'actionCell'}},
            ],
            size:'large',
            tableIsLoading:false,
            scrollSize: { x:1500, y: window.innerHeight - 112},
//            rowSelection:{
//              selectedRowKeys: [],
//              onChange: this.onSelectChange,
//              columnWidth:'20px',
//            },
          rowSelection:null
          },
        }
    },
    created(){
      const thisYear=parseInt(moment().format('YYYY'))
      const thisMonth=parseInt(moment().format('MM'))
      const years=thisYear-2017
      for(let i=0;i<=years;i++){
        this.yearSels.push({
          value:2017+i,
          label:2017+i,
        })
      }
      this.yearSelectKey=thisYear
      if(thisMonth<4){
        this.jdSelectKey='1'
      }else if(thisMonth<7){
        this.jdSelectKey='2'
      }else if(thisMonth<10){
        this.jdSelectKey='3'
      }else{
        this.jdSelectKey='4'
      }
      this.reqZuzhiList({param2:'2'})
        .then((res)=>{
          if(res.success){
            res.data.forEach(item=>{
             const tmpIndex=this.pIds.findIndex(i=>i==item.parentid)
              if(tmpIndex==-1) this.pIds.push(item.parentid)
            })
          }
        })
      this.reqTableData()
      this.table.columns=initColumn(this.table.columns)
    },
    methods:{
      moment,
       ...mapActions(['reqSgbfl','reqDepartSgbfl','reqZuzhiList']),

      //页面刷新
      refresh(){
//        this.pagination.current=1
        this.reqTableData()
      },

      //单双行条纹样式
      rowClass(record,index){
        if (index%2==1) return 'even-rows'
      },
      //请求表格数据
      reqTableData(filterOption){
//          debugger
        this.table.tableIsLoading=true
        let selTime=this.yearSelectKey+ '-'
        switch (this.jdSelectKey){
          case '1':
            selTime=selTime+'01-01'
                break
          case '2':
            selTime=selTime+'04-01'
            break
          case '3':
            selTime=selTime+'07-01'
            break
          case '4':
            selTime=selTime+'10-01'
            break
        }
        const parameter={
//          limit:this.pagination.reqData ? this.pagination.pageSize:10000,
          limit:10000,
//          start:this.pagination.reqData ? (this.pagination.current -1)*this.pagination.pageSize:0,
          param1:this.recordId,
          param2:selTime
        }
        if(parameter.param1=='首页') delete parameter.param1
//        if (filterOption) parameter.filter = JSON.stringify(filterOption)       //增加搜索条件
        const reqAction= this.recordId=='首页'?'reqSgbfl':'reqDepartSgbfl'
        this.$store.dispatch(reqAction,parameter)
          .then((res)=>{
            if(res.success){
              //请求成功后，在下面进行数据处理，赋值给table
              this.table.dataSource=this.$store.getters[getList]
              let num=0
              this.table.dataSource.forEach((item,index)=>{
//              item.index=index+(this.pagination.current -1)*this.pagination.pageSize+1
//                item.index=index+1
                item.key=item.departmentId
                if(!item.ccs) item.ccs=0
                if(!item.choucs) item.choucs=0
                if(!item.dws) item.dws=0
                if(!item.hmds) item.hmds=0
                if(!item.jcs) item.jcs=0
                if(!item.lyhqys) item.lyhqys=0
                if(!item.qtqys) item.qtqys=0
                if(!item.wcs) item.wcs=0
                item.sbl=item.dws==0? '- ' : ((item.wcs/item.dws)*100).toFixed(2)+ '%'
                item.ccl =item.hmds==0? '- ' : ((item.ccs/item.hmds)* 100).toFixed(2) + '%'
                item.jcl=item.lyhqys==0? '- ' : ((item.jcs/item.lyhqys)* 100).toFixed(2) + '%'
                item.choucl=item.qtqys==0? '- ' : ((item.choucs/item.qtqys)* 100).toFixed(2) + '%'
                num = 0
//                debugger
                if(item.dws!=0){
                  item.sblpf=((item.wcs/item.dws)*100).toFixed(2)
                  item.zongfen=Number(item.sblpf)
                  num = num + 1
                }else{
                  item.sblpf= '- '
                }
                if(item.hmds!=0){
                  item.cclpf = ((item.ccs/item.hmds)* 100).toFixed(2)
                  item.zongfen=item.zongfen+Number(item.cclpf)
                  num = num + 1
                }else{
                  item.cclpf = '- '
                }
                if(item.lyhqys!=0){
                  item.jclpf= ((item.jcs/item.lyhqys)* 100).toFixed(2)
                  item.zongfen=item.zongfen+Number(item.jclpf)
                  num = num + 1
                }else{
                  item.jclpf='- '
                }
                if(item.qtqys!=0){
                  item.chouclpf= ((item.choucs/item.qtqys)* 100).toFixed(2)
                  item.zongfen=item.zongfen+Number(item.chouclpf)
                  num = num + 1
                }else{
                  item.chouclpf='- '
                }
//              item.jctimeend=moment(item.jctimeend).format('YYYY-MM-DD HH:ss')
//              item.fctime=item.fctime && item.fctime!='' ? moment(item.fctime).format('YYYY-MM-DD HH:ss'):''
                item.zongfen= num==0?'-':(item.zongfen/num).toFixed(2)
              })
              this.table.dataSource.sort((a,b)=>{
                  const aaa=a.zongfen=='-'? -1 :a.zongfen
                  const bbb=b.zongfen=='-'? -1 :b.zongfen
                  return bbb-aaa
              })
              this.table.dataSource.forEach((item,index)=>{
                  item.index=index+1
              })
//            this.pagination.total=res.totalCount
//            if(this.activeTab=='1') this.noEndNum=res.totalCount
              this.table.tableIsLoading=false
              if(this.recordId!='首页'){
//                  debugger
                if(this.breadcrumbs.findIndex(i=>i.departmentId==this.recordId)==-1){
                  this.breadcrumbs.push({
                    departName:this.departmentName,
                    departmentId:this.recordId,
                  })
                }
              }
            }else{
              this.$message.error(res.message)
              this.table.tableIsLoading=false
              this.recordId=this.lastId
              this.departmentName=this.lastName
            }
          })
          .catch(err=>{
            console.log(JSON.stringify(err))
            this.table.tableIsLoading=false
            this.recordId=this.lastId
            this.departmentName=this.lastName
          })
      },

      //选择组织进入下一层
      selDepartment(id){
        const tmp=this.table.dataSource.find(i=>i.departmentId==id)
        this.lastId=this.recordId
        this.lastName=this.departmentName
        this.recordId=id
        this.departmentName=tmp.departName
        this.reqTableData()
      },
      //面包屑选择部门
      selBreadcrumb(item,index){
        this.recordId=item.departmentId
        this.departmentName=item.departName
        this.reqTableData()
        this.breadcrumbs= this.breadcrumbs.slice(0,index+1)
      },

      //判断是否为父节点
      isPid(id){
        const tmpIndex=this.pIds.findIndex(i=>i==id)
        return tmpIndex > -1
      }
    }

  }
</script>

<style lang="scss">
  .sige-baifenlv{
    .ant-table-placeholder{
      top:120px;
    }
    .ant-breadcrumb{
      font-size: 16px;
    }
  }
</style>