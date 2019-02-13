<template>
  <div :class="pageNmae" style="height: 100%">
    <!--下面是顶部的按钮栏-->
    <div  class="header-buttons-bar" style="padding-left: 5px">
      <a-button type='primary' @click="showModal('add')"size="small">新增{{this.pageTitle}}</a-button>
      <a-popconfirm title="您确认删除该条记录吗？" placement="bottomLeft" okText="Yes" cancelText="No" @confirm="deleteRowData('multi')">
        <!--<a-button  size="small" :disabled="table.rowSelection.selectedRowKeys.length<2">批量删除</a-button>-->
      </a-popconfirm>
      <a-button @click="refresh"size="small">刷新</a-button>

      <!--搜索条-->
      <!--<a-input-search-->
      <!--:placeholder="search.placeholder"-->
      <!--style="width: 220px"-->
      <!--v-model="search.searchValue"-->
      <!--size="small"-->
      <!--@search="onSearch"-->
      <!--/>-->
    </div>

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
          <a href="javascript:;" @click="showModal('query',record)">查看</a>
          <!--<a-divider v-if="" type="vertical" />-->
          <!--<a href="javascript:;" @click="showModal('map',record)">位置</a>-->
          <a-divider v-if="" type="vertical" />
          <a href="javascript:;" @click="showModal('edit',record)">修改</a>
          <a-divider v-if="" type="vertical" />
          <a-popconfirm title="您确认删除该条记录吗？" placement="bottomRight" okText="Yes" cancelText="No" @confirm="deleteRowData(record)">
            <a href="javascript:;">删除</a>
          </a-popconfirm>
        </span>
      </a-table>
      <a-pagination
        v-model="pagination.current"
        style="margin-top: 8px; float:right; padding-right: 16px;"
        :total="pagination.total"
        :pageSizeOptions="pagination.pageSizeOptions"
        :pageSize="pagination.pageSize"
        showSizeChanger
        showQuickJumper
        :showTotal="total =>`共${total}条数据`"
        @change="changeCurrentPage"
        @showSizeChange="showSizeChange"
        size="small"/>
    </div>

    <!--下面是弹出框-->
    <div>
      <a-modal
        :title="modalOption.title"
        @cancel="modalCancel"
        :visible="modalOption.visible"
        :destroyOnClose="true"
        :maskClosable="false"
        :wrapClassName="modalOption.modalClass"
        :width="modalOption.width"
        :bodyStyle="modalOption.bodyStyle"
      >

        <edit-form
          v-if="this.modalOption.modelType =='add'||this.modalOption.modelType =='edit'"
          :selectOptions="modalOption.selectOptions"
          :recordId="modalOption.recordId"
          :modelType="modalOption.modelType"
          ref="commitForm"/>

        <data-detail
          v-if="this.modalOption.modelType=='query'"
          :recordId="modalOption.recordId" />

        <amap-modal
          v-if="modalOption.modelType=='map'"
          :recordId="modalOption.recordId"
          :recordGps="{lng:recordData.lng,lat:recordData.lat}"
          :height="modalOption.bodyStyle['max-height']"
          @closeMap="closeMap"
          :city="modalOption.mapCity"
          :default-center="modalOption.defaultCenter"
          :commitGpsAction="modalOption.commitGpsAction"/>

        <template slot="footer" >
          <a-button v-show="this.modalOption.modelType!='map'" key="back" @click="modalCancel" size="small">返 回</a-button>
          <a-popconfirm title="您确认提交当前信息吗？" placement="topRight" okText="Yes" cancelText="No" @confirm="handleCommit">
            <a-button v-show="this.modalOption.modelType!='query'&&this.modalOption.modelType!='map'" key="submit" type="primary" :loading="modalOption.commitLoading"  size="small">提 交</a-button>
          </a-popconfirm>
        </template>
      </a-modal>
    </div>
  </div>
</template>

<script>
  import {  mapGetters,mapActions } from 'vuex'
  import editForm from './editForm'
  import dataDetail from './dataDetail'
  import AmapModal from  '../../wryComps/AmapModal.vue'

  const pageName='yingji_zhuanjia'
  const modalTitle="专家"   //模态框的title标题

  const selOptions=['zbtype']          //选择项所需要的配置，localstorage中的配置名称
  const selOptionMutation='INIT_ZJ_SELECTED_OPTIONS'   //将选择项配置保存到store的mutation方法名
  //修改以下获取store数据的getters 配置
  const getList='yingji_zj_list'                //获取table的list
  const getSelOpitons='yingji_zj_selOptions'   //获取选择项的配置内容
  const getDetailById='getZjById'              //获取某一具体记录的详情

  //修改以下增删改查的Actions 方法名
  const reqList='reqZjList'                   //查询列表
  const createAction='createYjzj'             //新增记录
  const editAction='editYjzj'                 //修改记录
  const delAction='delYjzj'                   //删除
  const editGpsAction=''           //修改Gps信息

  export default {
    name:pageName,
    components:{
      editForm,
      dataDetail,
      AmapModal
    },
    data(){
      return{
        pageTitle:modalTitle,
        pageNmae:pageName,
        search:{
          placeholder:'',
          searchValue:''
        },
        table:{
          dataSource:[],
          columns:[
            {title: '序号', dataIndex: 'id', width: '50px', key:'id',align: 'center'},
            {title: '姓名',dataIndex: 'xm', width: '80px',key:'xm', align: 'center'},
            {title: '性别', dataIndex: 'xb', width: '60px',key:'xb', align: 'center'},
            {title: '出生日期', dataIndex: 'csrq', width: '80px', key:'csrq',align: 'center'},
            {title: '最高学历', dataIndex: 'zgxl', width: '80px', key:'zgxl',align: 'center',},
            {title: '毕业学校', dataIndex: 'byxx', width: '120px', key:'byxx',align: 'center'},
            {title: '毕业年月', dataIndex: 'bynf', width: '100px', key:'bynf',align: 'center'},
            {title: '电话', dataIndex: 'mobilePhone', width: '90px', key:'mobilePhone',align: 'center',},
            {title: '专业专长', dataIndex: 'zyzc', width: '100px', key:'zyzc',align: 'center',},
            {title: '行业类别', dataIndex: 'hylb', width: '100px', key:'hylb',align: 'center',},
            {title: '操作', dataIndex: 'actions', width: '180px', key:'actions',align: 'center', scopedSlots: {customRender: 'actionCell'}},
          ],
          size:'small',
          tableIsLoading:false,
          scrollSize: { x:500, y: window.innerHeight - 120},
          // rowSelection:{
          //   selectedRowKeys: [],
          //   onChange: this.onSelectChange,
          //   columnWidth:'20px',
          // }
          rowSelection:null
        },
        pagination:{
          total:0,
          current:1,
          pageSize:20,
          pageSizeOptions:['10','20','50','100','500']
        },
        modalOption:{
          title:'',
          width:'85%',
          visible:false,
          bodyStyle:{
            "max-height":window.innerHeight-250 + 'px',
            "min-height":100
          },
          commitLoading:false,
          mapCity:'珠海',
          commitGpsAction:editGpsAction,
          defaultCenter:{
            lng:113.536232,
            lat:22.120977
          },
          selectOptions:{},
          recordId:'',
          modelType:'',
          modalClass:'nomal-modal'
        }
      }
    },
    computed:{
      recordData(){
        return this.$store.getters[getDetailById](this.modalOption.recordId)
      }
    },
    beforeCreate(){
//        debugger
      //如果是测试环境，则设置以下localstorage
      if (process.env.NODE_ENV !== 'production'){
        const lsTemp= require('../../../temp/lsTemp')
        localStorage.setItem('/asrsajjdic',JSON.stringify(lsTemp.asrsajjdic))
        localStorage.setItem('/asrsajjfixsearch',JSON.stringify(lsTemp.asrsajjfixsearch))
      }},

    created(){
      this.reqTableData()
    },
    mounted(){
      this.$nextTick(function () {
        let _this=this
        window.onresize = function(){
          _this.modalOption.bodyStyle['max-height']= window.innerHeight                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  -250+'px'
        }
        document.getElementsByClassName('ant-table-body')[0].style.height=`${window.innerHeight}px`

        //初始化选择项,存入vuex相应store的state中
        const ls = JSON.parse(localStorage.getItem('/asrsajjdic'))
        const tmp=[]
        selOptions.forEach(item=>{tmp.push({name:item,value:ls[item]})})
        this.$store.commit(selOptionMutation,tmp)
        this.modalOption.selectOptions=this.$store.getters[getSelOpitons]
      })
    },
    methods:{
      // ...mapGetters(['yingji_wz_list','yingji_wz_selOptions','getWzById']),
      // ...mapActions(['reqWzList','createYjwz','editYjwz','delYjwz','editYjwzGps']),
      rowClass(record,index){
        if (index%2==1) return 'even-rows'
      },
      onSelectChange(selectedRowKeys){
        this.table.rowSelection.selectedRowKeys = selectedRowKeys
      },
      refresh(){
        this.reqTableData()
      },
      onSearch(){
        alert('onSearch')
      },
      showModal(type,record){
        switch (type) {
          case 'add':
            this.modalOption.title='新增'+ modalTitle
            this.modalOption.modelType='add'
            this.modalOption.modalClass ='nomal-modal '
            break;
          case 'query':
            this.modalOption.title=modalTitle+'详情'
            this.modalOption.modelType='query'
            this.modalOption.recordId=record.id
            this.modalOption.modalClass ='nomal-modal '
            break;
          case 'edit':
            this.modalOption.title='修改'+ modalTitle+'信息'
            this.modalOption.modelType='edit'
            this.modalOption.recordId=record.id
            this.modalOption.modalClass ='nomal-modal '
            break;
          case 'map':
            this.modalOption.title=modalTitle+'位置信息'
            this.modalOption.modelType='map'
            this.modalOption.recordId=record.id
            this.modalOption.modalClass ='nomal-modal mapModal'
            break
        }
        this.modalOption.visible=true
      },
      modalCancel(){
        this.modalOption.commitLoading=false
        this.modalOption.visible=false
      },
      closeMap(data){
        if (data=='post')this.reqTableData()
        this.modalOption.visible=false
      },
      handleCommit(){
        this.$refs.commitForm.form.validateFields((err, values) => {
          if (!err) {
            //若存在选择项value和显示内容不相同，需转换内容后再提交
            this.modalOption.commitLoading=true
            values.csrq=values.csrq.format('YYYY-MM-DD')
            values.bynf=values.bynf.format('YYYY-MM')
            values.qprq=values.qprq.format('YYYY-MM-DD')
            values.ymrq=values.ymrq.format('YYYY-MM-DD')
            if (this.modalOption.modelType=='edit'){
              values.id=this.modalOption.recordId
              // values.bnscno=this.$store.getters[getDetailById](this.modalOption.recordId).bnscno
            }
            let parameter={
              jsonData:JSON.stringify(values),
            }
            switch (this.modalOption.modelType) {
              case 'add':
                this.$store.dispatch(createAction,parameter).then((res)=>{
                  if (res.success==true){
                    this.$message.success('提交成功！')
                    this.reqTableData()
                    setTimeout(()=>{
                        this.modalOption.commitLoading=false
                        this.modalOption.visible=false
                      }
                      ,300
                    )
                  }else{
                    this.$message.error(res.message+'请稍后再试！')
                    this.modalOption.commitLoading=false
                  }
                })
                break
              case 'edit':

                this.$store.dispatch(editAction,parameter).then((res)=>{
                  if (res.success==true){
                    this.$message.success('提交成功！')
                    this.reqTableData()
                    setTimeout(()=>{
                        this.modalOption.commitLoading=false
                        this.modalOption.visible=false
                      }
                      ,300
                    )
                  }else{
                    this.$message.error(res.message+'请稍后再试！')
                    this.modalOption.commitLoading=false
                  }
                })
                break
            }
          }
        })
      },
      deleteRowData(record){
        let parameter={
          jsonData:JSON.stringify(this.$store.getters[getDetailById](record.id)),
        }
        this.table.tableIsLoading=true
        this.$store.dispatch(delAction,parameter)
          .then((res)=>{
            if (res.success==true){
              this.$message.success('删除成功！')
              this.reqTableData()
              this.table.tableIsLoading=false
            }else{
              this.$message.error(res.message+'请稍后再试！')
              this.table.tableIsLoading=false
            }
          })
          .catch((err)=>{
            console.log(JSON.stringify(err))
            this.table.tableIsLoading=false
          })
      },
      reqTableData(){
        this.table.tableIsLoading=true
        const parameter={
          limit:this.pagination.pageSize,
          start:(this.pagination.current -1)*this.pagination.pageSize
        }
        this.$store.dispatch(reqList,parameter)
          .then((res)=>{
            this.table.dataSource=this.$store.getters[getList]
            this.pagination.total=res.totalCount
            this.table.tableIsLoading=false
          })
          .catch(err=>console.log(JSON.stringify(err)))
      },

      changeCurrentPage(page, pageSize){
        this.pagination.current=page
        this.pagination.pageSize=pageSize
        this.reqTableData()
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
      },
    }
  }

</script>