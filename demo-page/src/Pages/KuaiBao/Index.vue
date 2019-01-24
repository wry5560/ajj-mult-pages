<template>
  <div class="kuaibao-index">
    <div  class="header-buttons-bar">
      <!--<a-button @click="handleAdd">Add</a-button>-->
      <a-button type='primary' @click="showModal"size="small" :style="{'margin-left':'5px'}">事故上报</a-button>
      <a-button @click="reqTableData"size="small">刷 新</a-button>
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
      >
        <!--<template slot="centerCell" >-->
          <!--<div style="text-align:center">事故名称</div>-->
        <!--</template>-->
        <span slot="actionCell" slot-scope="text,record,index" >
          <a href="javascript:;" @click="gotoSgDetail(record.id)">查看详情</a>
          <a-divider v-if="record.xbid==0" type="vertical" />
          <a v-if="record.xbid==0" href="javascript:;" @click="">续报</a>
        </span>
        <template slot="status" slot-scope="isend">
          <a-badge :status="`${isend==0 ? 'processing':'success'}`" :text="`${isend==0 ? '审批中':'已审批'}`"/>
        </template>
        <!--<a-table-->
          <!--slot="expandedRowRender"-->
          <!--slot-scope="record, index, indent, expanded"-->
          <!--:columns="innerColumns"-->
          <!--:dataSource="record.xbList"-->
          <!--size="small"-->
          <!--:pagination="false"-->
          <!--:showHeader="false"-->

        <!--&gt;-->
          <!--<span slot="actionCell" slot-scope="text" >-->
            <!--<a href="javascript:;">查看详情</a>-->
          <!--</span>-->
          <!--<template slot="status" slot-scope="isend">-->
            <!--<a-badge :status="`${isend==0 ? 'processing':'success'}`" :text="`${isend==0 ? '审批中':'已审批'}`"/>-->
          <!--</template>-->
        <!--</a-table>-->

      </a-table>
      <a-pagination
        v-model="pagination.current"
        style="margin-top: 8px; float:right; padding-right: 16px;"
        :total="pagination.total"
        :pageSizeOptions="pagination.pageSizeOptions"
        :pageSize="pagination.pageSize"
        showSizeChanger
        showQuickJumper
        :showTotal="total => `共${total}条数据`"
        @change="changeCurrentPage"
        @showSizeChange="showSizeChange"
        size="small"/>
    </div>
    <a-modal
      title="事故上报"
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
      <sg-form :selectOptions="selectOptions" ref="sgCommit" :showSubmit="false"></sg-form>
      <template slot="footer">
        <a-button key="back" @click="modalCancel">返 回</a-button>
        <a-button key="submit" type="primary" :loading="modalOption.commitLoading" @click="sgCommit">上 报</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>
  import {reqKuaiBaoList,addSgkb} from './api'
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
          pageSize:10,
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
      if (process.env.NODE_ENV !== 'production') {
        const {asrsajjdic}=require('../../temp/lsTemp')
        localStorage.setItem('/asrsajjdic',JSON.stringify(asrsajjdic))
      }
    },
    created(){
      this.reqTableData()

    },
    mounted(){
//      console.log(this.modalOption)
      let _this=this
      window.onresize = function(){
        console.log(_this.modalOption.bodyStyle['max-height'])
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
      // debugger
    },
    methods:{
      showModal(){
        this.modalOption.visible=true
      },
      sgCommit(){
        this.$refs.sgCommit.form.validateFields((err, values) => {
           debugger
          if (!err) {
//            this.$notification['error']({
//              message: 'Received values of form:',
//              description: JSON.stringify(values)
//            })
            this.modalOption.commitLoading=true
            values.fssj=values.fssj.format('YYYY-MM-DD HH:MM:SS')
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
      modalCancel(){
        this.modalOption.commitLoading=false
        this.modalOption.visible=false
      },
      gotoSgsb(){
        this.$router.push('/sgsb')
      },
      gotoSgDetail(id){
        console.log("id:"+id)
        this.$router.push('/sgDetail')
      },
      reqTableData(){
        this.tableIsLoading=true
        const parameter={
          param1:sys_relateDepId2,
          param5:1
//          limit:2,
//          start:0
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
          this.tableIsLoading=true
          const parameter={
            param1:sys_relateDepId2,
            param6:record.id
//          limit:2,
//          start:0
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
            item.id="续 "+ item.id + item.xbid
          }
        })
        // debugger
        this.$store.commit('ADD_XUBAO',{id:kbId,xbData:tmpData})
      },
      changeCurrentPage(page, pageSize){
        console.log(page)
        console.log(pageSize)
      },
      showSizeChange(current, size){
        console.log(current)
        console.log(size)
      },
      routeChange(to,from){
        if(from.path=='/sgsb'){
          this.reqTableData()
        }
      },
    },

  }
</script>

<style lang="scss">



</style>

