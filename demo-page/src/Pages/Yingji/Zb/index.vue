<template>
  <div class="yingji_zb" style="height: 100%">
    <!--下面是顶部的按钮栏-->
    <div  class="header-buttons-bar" style="padding-left: 5px">
      <a-button type='primary' @click="showModal('add')"size="small">新增装备</a-button>
      <a-popconfirm title="您确认删除该条记录吗？" placement="bottomLeft" okText="Yes" cancelText="No" @confirm="deleteRowData('multi')">
        <!--<a-button  size="small" :disabled="table.rowSelection.selectedRowKeys.length<2">批量删除</a-button>-->
      </a-popconfirm>
      <a-button @click="refresh"size="small">刷 新</a-button>

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
        <template slot="ellipsis" slot-scope="text,record,index">
          <ellipsis tooltip :length="10">
            {{text}}
          </ellipsis>
        </template>
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
        wrapClassName="nomal-modal"
        :width="modalOption.width"
        :bodyStyle="modalOption.bodyStyle"
      >
        <edit-form v-if="this.modalOption.modelType!='query'" :selectOptions="modalOption.selectOptions" :recordId="modalOption.recordId" :modelType="modalOption.modelType" ref="commitForm"></edit-form>
        <data-detail v-if="this.modalOption.modelType=='query'" :recordId="modalOption.recordId" ></data-detail>
        <template slot="footer" >
          <a-button key="back" @click="modalCancel" size="small">返 回</a-button>
          <a-button v-show="this.modalOption.modelType!='query'" key="submit" type="primary" :loading="modalOption.commitLoading" @click="handleCommit" size="small">提 交</a-button>
        </template>
      </a-modal>
    </div>
  </div>
</template>

<script>
  import {  mapGetters,mapActions } from 'vuex'
  import editForm from './editForm'
  import dataDetail from './dataDetail'
  import{Ellipsis}from '../../../components/Ellipsis/Ellipsis'


  export default {
    name:'yingji_zb',
    components:{
      editForm,
      Ellipsis,
      dataDetail
    },
    data(){
      return{
        search:{
          placeholder:'',
          searchValue:''
        },
        table:{
          dataSource:[],
          columns:[
            {title: '序号', dataIndex: 'id', width: '50px', key:'id',align: 'center',style:{}},
            {title: '装备名称',dataIndex: 'zbname', width: '120px',key:'zbname', align: 'center',scopedSlots: {customRender: 'ellipsis'}},
            {title: '装备级别', dataIndex: 'zbjb', width: '120px',key:'zbjb', align: 'center',scopedSlots: {customRender: 'ellipsis'}},
            {title: '类型', dataIndex: 'zbtype', width: '80px', key:'zbtype',align: 'center',},
            {title: '主管部门', dataIndex: 'zgbm', width: '80px', key:'zgbm',align: 'center',},
            {title: '行政区', dataIndex: 'xzqy', width: '80px', key:'xzqy',align: 'center',},
            {title: '存放场所', dataIndex: 'zbcfcs', width: '120px', key:'zbcfcs',align: 'center',scopedSlots: {customRender: 'ellipsis'}},
            {title: '负责人', dataIndex: 'fzr', width: '75px', key:'fzr',align: 'center',},
            {title: '联系电话', dataIndex: 'fzrlx', width: '100px', key:'fzrlx',align: 'center',},
            {title: '装备数量', dataIndex: 'zbsl', width: '100px', key:'zbsl',align: 'center',},
            {title: '计量单位', dataIndex: 'jldw', width: '100px', key:'jldw',align: 'center',},
            {title: '操作', dataIndex: 'actions', width: '180px', key:'actions',align: 'center', scopedSlots: {customRender: 'actionCell'}},
          ],
          size:'small',
          tableIsLoading:false,
          scrollSize: { x:1280, y: window.innerHeight - 120},
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
            "max-height":window.innerHeight-250+'px',
            "min-height":100
          },
          commitLoading:false,
          selectOptions:{},
          recordId:'',
          modelType:''
        }
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
      let _this=this
      window.onresize = function(){
        _this.modalOption.bodyStyle['max-height']= window.innerHeight                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     -250+'px'
      }
      document.getElementsByClassName('ant-table-body')[0].style.height=`${window.innerHeight}px`

      //初始化选择项,存入vuex相应store的state中
      const ls = JSON.parse(localStorage.getItem('/asrsajjdic'))
      this.$store.commit('INIT_ZB_SELECTED_OPTIONS',[
        {name:'zbtype',value:ls['zbtype']},
        {name:'zbjb',value:ls['zbjb']},
      ])
      this.modalOption.selectOptions=this.yingji_zb_selOptions()
    },
    methods:{
      ...mapGetters(['yingji_zb_list','yingji_zb_selOptions','getZbById']),
      ...mapActions(['reqZbList','createYjzb','editYjzb','delYjzb']),
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
            this.modalOption.title='新增装备'
            this.modalOption.modelType='add'
            break;
          case 'query':
            this.modalOption.title='装备详情'
            this.modalOption.modelType='query'
            this.modalOption.recordId=record.id
            break;
          case 'edit':
            this.modalOption.title='修改装备信息'
            this.modalOption.modelType='edit'
            this.modalOption.recordId=record.id
            break;
          case 'map':

            break
        }
        this.modalOption.visible=true
      },
      modalCancel(){
        this.modalOption.visible=false
      },
      handleCommit(){
        this.$refs.commitForm.form.validateFields((err, values) => {
          if (!err) {
            //若存在选择项value和显示内容不相同，需转换内容后再提交
            this.modalOption.commitLoading=true
            if (this.modalOption.modelType=='edit'){
              values.id=this.modalOption.recordId
              // values.bnscno=this.getZbById()(this.modalOption.recordId).bnscno
            }
            let parameter={
              jsonData:JSON.stringify(values),
            }
            switch (this.modalOption.modelType) {
              case 'add':
                this.createYjzb(parameter).then((res)=>{
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
                this.editYjzb(parameter).then((res)=>{
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
          jsonData:JSON.stringify(this.getZbById()(record.id)),
        }
        this.table.tableIsLoading=true
        this.delYjzb(parameter)
          .then((res)=>{
            if (res.success==true){
              this.$message.success('删除成功！')
              this.reqTableData()
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
        this.reqZbList(parameter)
          .then((res)=>{
            this.table.dataSource=this.yingji_zb_list()
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