<template>
  <div class="kuaibao-index">
    <div  class="header-buttons-bar">
      <!--<a-button @click="handleAdd">Add</a-button>-->
      <a-button type='primary' @click="showModal('sb')"size="small" :style="{'margin-left':'5px'}">事故上报</a-button>
      <a-button @click="reqTableData"size="small">刷 新</a-button>
      <a-input-search
        :placeholder="search.placeholder"
        style="width: 250px"
        v-model="search.searchValue"
        size="small"
        @search="onSearch"
      />
    </div>
    <div>
      <a-table
        :dataSource="dataSource"
        :columns="columns"
        :pagination= "false"
        size="small"
        :loading="tableIsLoading"
        :scroll="scrollSize"
        @change.current="changeCurrentPage"
        @showSizeChange="showSizeChange"
        :indentSize= 20
        @expand="reqXbData"
        :expandedRowKeys="expandedRowKeys"
      >
        <span slot="actionCell" slot-scope="text,record,index" >
          <a href="javascript:;" @click="gotoSgDetail(record)">查看详情</a>
          <a-divider v-if="record.xbid==0" type="vertical" />
          <a v-if="record.xbid==0" href="javascript:;" @click="showModal(record)">续报</a>
        </span>
        <template slot="status" slot-scope="isend">
          <a-badge :status="`${isend==0 ? 'processing':'success'}`" :text="`${isend==0 ? '审批中':'已审批'}`"/>
        </template>
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
    <a-modal
      :title="sbType=='sb'?'事故上报':'事故续报'"
      okText="上 报"
      @cancel="modalCancel"
      :visible="modalOption.visible"
      :destroyOnClose="true"
      :maskClosable="false"
      wrapClassName="nomal-modal"
      width="90%"
      :bodyStyle="modalOption.bodyStyle"
      :okButtonProps="modalOption.okButtonProps"
      :cancelButtonProps="modalOption.cancelButtonProps"
    >
      <sg-form :sbType="sbType" :sbData="sbData" :selectOptions="selectOptions" ref="sgCommit" :showSubmit="false"></sg-form>
      <template slot="footer">
        <a-button key="back" @click="modalCancel">返 回</a-button>
        <a-button v-if="sbType=='sb'" key="submit" type="primary" :loading="modalOption.commitLoading" @click="sgCommit">上 报</a-button>
        <a-button v-if="sbType!='sb'" key="submit" type="primary" :loading="modalOption.commitLoading" @click="xbCommit">续 报</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>
  import {reqKuaiBaoList,addSgkb,reqSbLc,addSgkbxb,searchKuaiBaoList} from './api'
  import SgForm from './comps/sgForm.vue'
  import moment from 'moment'
  import Vue from 'vue'

  moment.locale('zh-cn');

  export default{
    Vue,
    moment,
    components:{
      SgForm
    },
    data(){
      return {
        search:{
          searchValue:'',
          placeholder:'',
          searchOption:{}
        },
        sbType:'sb',
        sbData:{},
        expandedRowKeys:[],
        modalOption:{
          visible:false,
          bodyStyle:{
            "max-height":window.innerHeight-250+'px',
            "min-height":100
          },
          commitLoading:false
        },
        scrollSize: { x:1022, y: window.innerHeight - 120},
        tableIsLoading: false,
        pagination:{
          total:0,
          current:1,
          pageSize:20,
          pageSizeOptions:['10','20','50','100','500']
        },
        selectOptions:{
          hyType:[],
          glType:[],
          sgdj:[],
          sglx:[],
          shlb:[],
          sgxz:[],
        },
        dataSource: [],
        columns: [
          {title: '编号', dataIndex: 'id', width: 120, key:'id',align: 'center',style:{'padding-left':'20px'}},
          {title: '事故名称',dataIndex: 'sgnm', width: 100,key:'sgnm', align: 'left',slots:{title:'centerCell'}},
          {title: '续报数', dataIndex: 'xbnum', width: 50,key:'xbnum', align: 'center',},
          {title: '上报时间', dataIndex: 'uptime', width: 100, key:'uptime',align: 'center',},
          {title: '上报人', dataIndex: 'upuser', width: 100,key:'upuser', align: 'center',},
          {title: '审批状态', dataIndex: 'isend', width: 100,key:'isend', align: 'center',scopedSlots: {customRender: 'status'}},
          {title: '流程节点', dataIndex: 'lcname', width: 100, key:'lcname',align: 'center',},
          {title: '操作', dataIndex: 'actions', width: 100, key:'actions',align: 'center', scopedSlots: {customRender: 'actionCell'}},
//         {titleText:'操作', dataIndex: 'actions', width: 150, align:'center', scopedSlots: {customRender: 'actionCell', filterDropdown: 'levelOneDropdown', filterIcon: 'filterIcon',},
        ],
        // innerColumns: [
        //   {title: '编号', dataIndex: 'id', width: 100, key:'id',align: 'center',},
        //   {title: '事故名称',dataIndex: 'sgnm', width: 100,key:'sgnm', align: 'left',slots:{title:'centerCell'}},
        //   {title: '上报时间', dataIndex: 'uptime', width: 100, key:'uptime',align: 'center',},
        //   {title: '上报人', dataIndex: 'upuser', width: 100,key:'upuser', align: 'center',},
        //   {title: '审批状态', dataIndex: 'isend', width: 100,key:'isend', align: 'center',scopedSlots: {customRender: 'status'}},
        //   {title: '流程节点', dataIndex: 'dqlc', width: 100, key:'dqlc',align: 'center',},
        //   {title: '续报数', dataIndex: 'xbNum', width: 50,key:'xbNum', align: 'center',},
        //   {title: '操作', dataIndex: 'actions', width: 100, key:'actions',align: 'center', scopedSlots: {customRender: 'actionCell'}},
        // ]
      }
    },
    computed:{
    },
    beforeCreate(){
//        debugger
      if (process.env.NODE_ENV !== 'production'){
          const lsTemp= require('../../temp/lsTemp')
        localStorage.setItem('/asrsajjdic',JSON.stringify(lsTemp.asrsajjdic))
        localStorage.setItem('/asrsajjfixsearch',JSON.stringify(lsTemp.asrsajjfixsearch))
      }},
    created(){
      this.reqTableData()
    },
    mounted(){
//      console.log(this.modalOption)
      let _this=this
      window.onresize = function(){
        _this.modalOption.bodyStyle['max-height']= window.innerHeight                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     -250+'px'
      }
      document.getElementsByClassName('ant-table-body')[0].style.height=`${window.innerHeight}px`
      //初始化选择项配置
        const ls = JSON.parse(localStorage.getItem('/asrsajjdic'))
        ls['企业类型'].forEach((item)=>{this.selectOptions.hyType.push([item.label,item.value])})
        ls['事故管理分类'].forEach((item)=>{this.selectOptions.glType.push([item.label,item.value])})
        ls['事故等级'].forEach((item)=>{this.selectOptions.sgdj.push([item.label,item.value])})
        ls['事故类型'].forEach((item)=>{this.selectOptions.sglx.push([item.label,item.value])})
        ls['事故伤害类型'].forEach((item)=>{this.selectOptions.shlb.push([item.label,item.value])})
        ls['事故性质'].forEach((item)=>{this.selectOptions.sgxz.push([item.label,item.value])})
      const lsSearch=JSON.parse(localStorage.getItem('/asrsajjfixsearch'))['事故快报信息列表']
      this.search.placeholder="请输入"+lsSearch["0"][0].dispNm+"..."
      this.search.searchOption=lsSearch
      console.log(lsSearch["0"])
    },
    methods:{
      showModal(type){
        this.sbType=type=='sb'? 'sb':'xb'
        this.sbData=type=='sb'? {}:type
        this.modalOption.visible=true
      },
      sgCommit(){
        this.$refs.sgCommit.form.validateFields((err, values) => {
          if (!err) {
//            this.$notification['error']({
//              message: 'Received values of form:',
//              description: JSON.stringify(values)
//            })
            this.modalOption.commitLoading=true
            values.fssj=values.fssj.format('YYYY-MM-DD HH:MM')
//            debugger
            if (values.sgdj) values.sgdj=this.selectOptions.sgdj.find(item=>item[0]==values.sgdj)[1]
            if (values.sglx) values.sglx=this.selectOptions.sglx.find(item=>item[0]==values.sglx)[1]
            if (values.shlb) values.shlb=this.selectOptions.shlb.find(item=>item[0]==values.shlb)[1]
            if (values.sgxz) values.sgxz=this.selectOptions.sgxz.find(item=>item[0]==values.sgxz)[1]
            const parameter={
              jsonData:JSON.stringify(values),
              param1:sys_relateDepId2
            }
            addSgkb(parameter).then((res)=>{
                if (res.success==true){
                  this.$message.success('上报成功！')
                  this.reqTableData()
                  setTimeout(()=>{
                      this.modalOption.commitLoading=false
                      this.modalOption.visible=false
                    }
                    ,500
                  )
                }else{
                  this.$message.error(res.message+'请稍后再试！')
                  this.modalOption.commitLoading=false
                }
            })
          }
        })
//        this.modalOption.visible=false
      },
      xbCommit(){
        this.$refs.sgCommit.form.validateFields((err, values) => {
          if (!err) {
            this.modalOption.commitLoading=true
            values.fssj=values.fssj.format('YYYY-MM-DD HH:MM')
//            debugger
            if (values.sgdj) values.sgdj=this.selectOptions.sgdj.find(item=>item[0]==values.sgdj)[1]
            if (values.sglx) values.sglx=this.selectOptions.sglx.find(item=>item[0]==values.sglx)[1]
            if (values.shlb) values.shlb=this.selectOptions.shlb.find(item=>item[0]==values.shlb)[1]
            if (values.sgxz) values.sgxz=this.selectOptions.sgxz.find(item=>item[0]==values.sgxz)[1]
            values.id=this.sbType
            const parameter={
              jsonData:JSON.stringify(values),
              param1:sys_relateDepId2
            }
            addSgkbxb(parameter).then((res)=>{
              if (res.success==true){
                this.$message.success('上报成功！')
                this.reqTableData()
                setTimeout(()=>{
                    this.modalOption.commitLoading=false
                    this.modalOption.visible=false
                  }
                  ,500
                )
              }else{
                this.$message.error(res.message+'请稍后再试！')
                this.modalOption.commitLoading=false
              }
            })
          }else{
            this.$message.error('请填写必填项！')
          }
        })
//        this.modalOption.visible=false
      },
      modalCancel(){
        this.modalOption.commitLoading=false
        this.modalOption.visible=false
      },
      gotoSgsb(){
        this.$router.push('/sgsb')
      },
      gotoSgDetail(record){
//          debugger
        const id = record.xbid==0? record.id:record.idBf
        this.$router.push({name:'sgDetail',params:{id:id,xbid:record.xbid}})
      },

      reqTableData(){
          this.expandedRowKeys=[]
        this.tableIsLoading=true
        const parameter={
          param1:sys_relateDepId2,
          param5:1,

        }
        reqKuaiBaoList(parameter)
          .then((res)=>{
            if(res.success){
              this.initDataSource(res)
            }else{
              this.$message.error(res.message)
            }
          })
          .catch(err=>{})
      },
      reqXbData(expanded, record){
//          debugger
        if (expanded){
          this.expandedRowKeys.push(record.key)
          this.tableIsLoading=true
          const parameter={
            param1:sys_relateDepId2,
            param6:record.id,
          }
          const tmpChildren= [...record.children]
          record.children=[]
          reqKuaiBaoList(parameter)
            .then((res)=>{
              if(res.success){
                this.tableIsLoading=false
                this.initXbDataSource(res)
              }else{
                this.tableIsLoading=false
                record.children= tmpChildren
                this.$message.error(res.message)
              }
            })
            .catch(err=>{
              this.tableIsLoading=false
              record.children= tmpChildren
            })
        }else{
            const index=this.expandedRowKeys.findIndex(value=>value==record.key)
            this.expandedRowKeys.splice(index,1)
        }
      },
      initDataSource(res){
//         debugger
        const tempData = res.data.filter(i=>{return !i.xbid || i.xbid== 0})
        tempData.forEach((data,index)=>{
          if(data.xbnum && data.xbnum !=0){data.children=[]}else{ data.xbnum = 0}
          data.key=index+data.id
          data.upuser=data.__upuser.userName
          if (data.isend=='1'){data.lcname='已完结'}
          data.uptime=moment(data.uptime).format('YYYY-MM-DD \xa0 HH:MM')
        })
        this.$store.commit('ADD_KUAIBAO',tempData)
        this.dataSource = tempData
        this.pagination.total=res.totalCount
        this.tableIsLoading=false
      },

      initXbDataSource(res){
        const tmpData=[]
        const kbId=res.data[0].id
        res.data.forEach((item,itemIndex)=>{
//            debugger
          if(item.xbid && item.xbid>0){
            item.key=item.id + item.xbid+itemIndex
            item.upuser=item.__upuser.userName
            if (item.isend=='1'){item.lcname='已完结'}
            item.xbnum='-'
            tmpData.push({...item})
            item.uptime=moment(item.xbtime).format('YYYY-MM-DD \xa0 HH:MM')
            this.dataSource.find(i => i.id==item.id).children.push(item)
            item.idBf=item.id
            item.id="续 "+ item.id + "-"+item.xbid
          }
        })
        // debugger
        this.$store.commit('ADD_XUBAO',{id:kbId,xbData:tmpData})
      },
      changeCurrentPage(page, pageSize){
        this.pagination.current=page
        this.pagination.pageSize=pageSize
        this.reqTableData()
        console.log(page)
        console.log(pageSize)
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
        console.log(current)
        console.log(size)
      },
      routeChange(to,from){
        if(from.path=='/sgsb'){
          this.reqTableData()
        }
      },
      onSearch(){
        const searchItems=this.search.searchOption["0"][0].procSql.split('|')
        const filterOption=[]
        const normalVlaue={
          "operate":"more",
        }
        const valueA=[]
        const valueB={
          "relation":"0",
          "value":valueA
        }
        searchItems.forEach(item=>valueA.push({
        "operate":"like",
          "sqlIndex":item,
          "value":this.search.searchValue
        }))
        normalVlaue.value=JSON.stringify(valueB)
        filterOption.push(normalVlaue)
        this.expandedRowKeys=[]
        this.tableIsLoading=true
        const parameter={
          filter:JSON.stringify(filterOption),
          param1:sys_relateDepId2,
          param5:1,
          limit:this.pagination.pageSize,
          start:(this.pagination.current -1)*this.pagination.pageSize
        }
        searchKuaiBaoList(parameter)
          .then((res)=>{
            if(res.success){
              this.initDataSource(res)
            }else{
              this.$message.error(res.message)
            }
          })
          .catch(err=>{})
      }

    },

  }
</script>

<style lang="scss">



</style>

