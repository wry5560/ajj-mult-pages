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
          <a-divider v-if="" type="vertical" />
          <a href="javascript:;" @click="showModal('map',record)">位置</a>
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

  const pageName='yingji_team'
  const modalTitle="应急队伍"   //模态框的title标题

  const selOptions=['dwtype']          //选择项所需要的配置，localstorage中的配置名称
  const selOptionMutation='INIT_TEAM_SELECTED_OPTIONS'   //将选择项配置保存到store的mutation方法名
  //修改以下获取store数据的getters 配置
  const getList='yingji_team_list'                //获取table的list
  const getSelOpitons='yingji_Team_selOptions'   //获取选择项的配置内容
  const getDetailById='getTeamById'              //获取某一具体记录的详情

  //修改以下增删改查的Actions 方法名
  const reqList='reqTeamList'                   //查询列表
  const createAction='createTeam'             //新增记录
  const editAction='editTeam'                 //修改记录
  const delAction='delTeam'                   //删除
  const editGpsAction='editTeamGps'           //修改Gps信息

  export default {
    name:'yingji_team',
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
            {title: '序号', dataIndex: 'id', width: '50px', key:'id',align: 'center',style:{}},
            {title: '名称',dataIndex: 'dwname', width: '120px',key:'dwname', align: 'center'},
            {title: '类型', dataIndex: 'dwtype', width: '80px', key:'dwtype',align: 'center',},
            {title: '主管部门', dataIndex: 'zgbm', width: '120px',key:'zgbm', align: 'center'},
            {title: '行政区', dataIndex: 'xzqy', width: '80px', key:'xzqy',align: 'center',},
            {title: '地址', dataIndex: 'dz', width: '120px', key:'dz',align: 'center'},
            {title: '负责人', dataIndex: 'fzr', width: '75px', key:'fzr',align: 'center',},
            {title: '负责人电话', dataIndex: 'fzrlx', width: '100px', key:'fzrlx',align: 'center',},
            {title: '队伍人数', dataIndex: 'dwrs', width: '100px', key:'dwrs',align: 'center',},
            {title: '操作', dataIndex: 'actions', width: '180px', key:'actions',align: 'center', scopedSlots: {customRender: 'actionCell'}},
          ],
          size:'small',
          tableIsLoading:false,
          scrollSize: { x:1180, y: window.innerHeight - 120},
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
        // debugger
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
      // ...mapGetters(['yingji_team_list','yingji_Team_selOptions','getTeamById']),
      // ...mapActions(['reqTeamList','createTeam','editTeam','delTeam']),
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
            if (this.modalOption.modelType=='edit'){
              values.id=this.modalOption.recordId
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