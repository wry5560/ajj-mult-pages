<template>
  <div class="role-form mywork-form" :style="{height:height}">
    <div class="role-content" :style="contentStyle">
      <a-spin :spinning="contentLoading" wrapperClassName="spinning">
        <a-form :form="form" >
          <a-row :gutter="16">
            <a-col :lg="24">
              <a-form-item label="工作内容" :labelCol="{ span: 4 }" :wrapperCol="{ span: 20 }">
                {{wdgz.gznr}}

                </a-form-item>
            </a-col>
            <a-col :lg="12" :md="12" :sm="24">
              <a-form-item label="开始时间" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
                {{wdgz.starttime ? moment(wdgz.starttime).format('YYYY-MM-DD HH:ss'):''}}
              </a-form-item>
            </a-col>
            <a-col :lg="12" :md="12" :sm="24">
              <a-form-item label="要求完成时间" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
                {{wdgz.jhwctime ? moment(wdgz.jhwctime).format('YYYY-MM-DD'):'' }}
              </a-form-item>
            </a-col>
            <a-col :lg="12" :md="12" :sm="24">
              <a-form-item label="难易程度" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
                {{wdgz.nycd}}
              </a-form-item>
            </a-col>
            <a-col :lg="12" :md="12" :sm="24">
              <a-form-item label="完成进度" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
                {{wdgz.wcjd && wdgz.wcjd != '' ?  zongJd : '0' }} %
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
              <a-tabs @change="tabChange" >
              <a-tab-pane key="1">
                <a-badge slot="tab">
                  <div>工作记录详情</div>
                </a-badge>
              </a-tab-pane>
              <a-tab-pane tab="子任务" key="2"></a-tab-pane>
            </a-tabs>
            <!--<a-divider/>-->
          </a-row>
          <span v-show="activeTab=='1'">
            <div style="margin-bottom: 12px">
            <a-row v-if="wdgzdetail.length>0" :gutter="16">
              <a-col :lg="23" :md="24" :offset="1">
                <span style="padding-left: 0px;" class="gzjl-title"><strong>工作内容描述：</strong></span>
              </a-col>
              <!--<a-col :lg="5" :md="24">-->
              <!--<span class="gzjl-title"><strong>工作进度：</strong></span>-->
              <!--</a-col>-->
            </a-row>
            <div v-else style="text-align: center">暂无工作详情</div>
          </div>
            <a-row  :gutter="12" v-for="(item,index) in wdgzdetail" :key="item.id">
            <a-col :lg="1">
              <div style="text-align: center;line-height: 36px">{{index + 1}}</div>
            </a-col>
            <a-col :lg="22" :md="24">
              <a-form-item label="" :wrapperCol="{ span: 24 }">
                <a-textarea placeholder="请输入工作内容" :autosize="{ minRows: 1, maxRows: 2 }" @change="gznrChange([...arguments,index,item])"
                            v-decorator="[`gznr-${item.id}`,{rules: [{ required: true, message: '请输入工作内容', whitespace: true}],initialValue: item ? item.gznr:''}]"/>
              </a-form-item>
            </a-col>
            <!--<a-col :lg="4" :md="22">-->
            <!--<a-form-item  :wrapperCol="{ span: 24 }">-->
            <!--<a-input-number-->
            <!--style="width: 100%"-->
            <!--placeholder="请输入工作进度"-->
            <!--:min="0"-->
            <!--:formatter="value => `${value}%`"-->
            <!--:parser="value => value.replace('%', '')"-->
            <!--@change="jdChange([...arguments,index,item])"-->
            <!--v-decorator="[`gzjd-${item.id}`,{rules: [{ required: true, message: '请输入工作进度', type:'number',whitespace: true}],initialValue: x}]"/>-->
            <!--</a-form-item>-->
            <!--</a-col>-->
            <a-col :lg="1":md="2">
              <a href="javascript:;"@click="removeGz(index)"><a-icon type="close-circle" style="color:gray;margin-top:12px;"/></a>
            </a-col>
          </a-row>
            <a-button type="dashed" style="width: 100%" icon="plus"@click="addGz">添加工作详情</a-button>
            <template>
            <div style="width:400px ;margin-top: 16px;min-height: 50px;margin-left: 50px">
              <a-upload :action="uploadUrl+lsid" :multiple="true" :fileList="fileList" @change="handleChange"  :remove="rmFile">
                <a-button>
                  <a-icon type="upload" /> 上传附件
                </a-button>
              </a-upload>
            </div>
          </template>


          </span>
          <span v-show="activeTab=='2'" >
            <a-table
              bordered
              :rowClassName="rowClass"
              :dataSource="table.dataSource"
              :columns="table.columns"
              :pagination= "false"
              :size="table.size"
              :loading="table.tableIsLoading"
              :scroll="table.scrollSize"
              :expandedRowKeys="table.expandedRowKeys"
              :rowSelection="table.rowSelection"
            >
            <span slot="actionCell" slot-scope="text,record,index" >
              <a-popconfirm title="您确认完成当前的工作吗？" placement="topRight" okText="Yes" cancelText="No" @confirm="finishMyWork(record)">
              <a href="javascript:;">完成</a>
              </a-popconfirm>
              <!--<a href="javascript:;" @click="showModal('query',record)">详情</a>-->
              <!--<a-divider v-if="" type="vertical" />-->
              <!--<a href="javascript:;" @click="showModal('map',record)">位置</a>-->
              <!--<a-divider v-if="" type="vertical" />-->
              <!--<a href="javascript:;" @click="showModal('edit',record)">修改</a>-->
              <!--<a-divider v-if="" type="vertical" />-->
              <!--<a href="javascript:;" @click="showModal('addZrw',record)">新增子任务</a>-->
              <!--<a-divider v-if="" type="vertical" />-->
              <!--<a-popconfirm title="您确认删除该条记录吗？" placement="bottomRight" okText="Yes" cancelText="No" @confirm="deleteRowData(record)">-->
              <!--<a href="javascript:;">删除</a>-->
              <!--</a-popconfirm>-->
          <!--<a-divider v-if="" type="vertical" />-->
          <!--<a-popconfirm title="您确认发布该条工作吗？" placement="bottomRight" okText="Yes" cancelText="No" @confirm="fbWork(record)">-->
          <!--<a v-if="record.sffb=='0'" href="javascript:;" >发布</a>-->
          <!--</a-popconfirm>-->
          <!--<a-popconfirm title="您确认取消发布该条工作吗？" placement="bottomRight" okText="Yes" cancelText="No" @confirm="qxWork(record)">-->
          <!--<a  v-if="record.sffb=='1'" href="javascript:;" >取消发布</a>-->
          <!--</a-popconfirm>-->
        </span>
        <template slot="jjcd" slot-scope="text,record,index" >
          <div v-if="record.endtime || !record.jhwctime" style="text-align: center">-</div>
          <div v-else style="text-align: center">
            <div v-if="text=='1'" style="width: 10px;height:10px;border-radius: 10px;background: #0096ff;display: inline-block"></div>
            <div v-if="text=='2'" style="width: 10px;height:10px;border-radius: 10px;background: #ffa800;display: inline-block"></div>
            <div v-if="text=='3'" style="width: 10px;height:10px;border-radius: 10px;background: #e30000;display: inline-block"></div>
          </div>
        </template>
        <template slot="jindu" slot-scope="text,record,index" >
          <div style="padding-left: 10px">
            <a-progress
              :percent="record.wcjd && record.wcjd!=''? record.wcjd:0"
              size="small"
              :status="record.wcjd=='100'? 'success' : record.sffb=='1'? 'active':'normal'"
              :strokeColor="record.sffb=='0'? '#CBCBCB':''"

            />
          </div>

        </template>
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
          </span>
        </a-form>
      </a-spin>
    </div>
    <div class="bottom-buttons-bar">
    <div>
      <a-popconfirm title="您确认提交当前信息吗？" placement="topRight" okText="Yes" cancelText="No" @confirm="handleCommit">
      <a-button size="small" type="primary"  style="float:right">保存</a-button>
      </a-popconfirm>
      <a-popconfirm title="您确认完成当前的工作吗？" placement="topRight" okText="Yes" cancelText="No" @confirm="finishMyWork">
        <a-button size="small" type="primary"  style="float:right" :disabled="getMyWorkById()(recordId).zwrnum>0">完成工作</a-button>
      </a-popconfirm>
      <a-button size="small" @click="emitCancel" style="float:right">取消</a-button>
      </div>
    </div>
  </div>
</template>

<script>
  //如果有使用时间选择器，则打开下面的注释，引入moment
   import moment from 'moment'
  import {mapGetters,mapActions} from 'vuex'
  import { initTableChildren } from '@/utils/tableChildrenInit'


  export default{
    name:'myWorkForm',
    components: {

    },
    props:{
      selectOptions:Object,
      height:String,
      maxHeight:String,
      recordId:[String,Number],
      modelType:String,
      dataSource:Array,
      departId:[String,Number],
    },

    data(){
      return {
        sys_relateDepId2,
        form: this.$form.createForm(this),
        contentLoading: false,
        activeTab:'1',
        wdgz:{},
        wdgzdetail: [],
        contentStyle:{
          padding:'16px',
          'padding-bottom':'96px',
          'max-height':parseInt(this.maxHeight)-50+'px',
          overflow: 'auto'
      },
        uploadUrl:process.env.NODE_ENV === 'production'?'other/FileManager.upfile.json?param2=2&param3=asro_ajgzhz&param1=' :'api/other/FileManager.upfile.json?param2=2&param3=asro_ajgzhz&param1=' ,
        fileList:[],
        //表格配置
        table: {
          dataSource: [],
          columns: [
            {title: '序号', dataIndex: 'index', width: '50px', align: 'center'},
            {title: '逾期提醒',dataIndex: 'gqtype', width: '60px', align: 'center',titleAlign:'center',scopedSlots: {customRender: 'jjcd'}},
            {title: '子任务数',dataIndex: 'zwrnum', width: '60px', align: 'center',titleAlign:'center'},
            {title: '工作内容', dataIndex: 'gznr', width: '200px', align: 'left', titleAlign: 'center'},
            // {title: '状态', dataIndex: 'state', width: '60px', align: 'center', titleAlign: 'center'},
//            {title: '所属部门', dataIndex: 'ssbm', width: '80px', align: 'left', titleAlign: 'center'},
//            {title: '负责人', dataIndex: 'fzr', width: '80px', align: 'center', titleAlign: 'center'},
            {title: '要求完成时间', dataIndex: 'jhwctime', width: '80px', align: 'center', titleAlign: 'center'},
//            {title: '开始时间', dataIndex: 'starttime', width: '80px', align: 'center', titleAlign: 'center'},
//            {title: '完成时间', dataIndex: 'endtime', width: '80px', align: 'center', titleAlign: 'center'},
            {title: '难易程度', dataIndex: 'nycd', width: '60px', align: 'center', titleAlign: 'center',},
//            {
//              title: '是否发布',
//              dataIndex: 'sffb',
//              width: '60px',
//              align: 'center',
//              titleAlign: 'center',
//              scopedSlots: {customRender: 'sf'}
//            },
            {title: '完成进度', dataIndex: 'wcjd', width: '80px', align: 'center', titleAlign: 'center',scopedSlots: {customRender: 'jindu'}},
            {
              title: '操作',
              dataIndex: 'actions',
              width: '80px',
              align: 'center',
              scopedSlots: {customRender: 'actionCell'}
            },
          ],
          size: 'small',
          tableIsLoading: false,
          scrollSize: {x: 750},
          // scrollSize: {x: 1450, y: window.innerHeight - 112},
//           rowSelection:{
//             selectedRowKeys: [],
//             onChange: this.onSelectChange,
//             columnWidth:'20px',
//           }
          rowSelection: null
        },
      }
    },
    created(){
      this.reqDetail()
      this.reqFlies()
      this.reqTableData()
    },
    computed:{
      lsid(){
        return  this.recordId
      },
      initialValues(){
        let initialValues={}
        if(this.modelType=='edit'|| this.modelType=='fenpei') {
          initialValues = {...this.getMyWorkById()(this.recordId)}
        }
        return initialValues
      },
      treeData(){
        return this.initTree(initTableChildren(this.data))
      },
      zongJd(){
          let jd=0
        this.wdgzdetail.forEach(item=>{
          jd=jd+item.gzjd
        })
        return jd
      }
    },
    methods:{
      moment,
      ...mapGetters(['getMyWorkById','']),
      ...mapActions(['reqWorkDetail','editMyWork','finishWork','removeFile','reqWorkFilelist']),

      modalCancel(){
        this.$emit('cancel')
      },
      initTree(datas){
//          debugger
        let aaa=[]
        datas.forEach((data,index)=>{
//              debugger
          const tmp={
            title:data.departname,
            value:data.id,
            key:data.id,
          }
          if (data.children && data.children.length>0) tmp.children=this.initTree(data.children)
          aaa.push(tmp)
        })
        return aaa
      },
      handleTreeSelect(value,node, extra){
        console.log(value)
        this.departId=value
      },
      reqDetail(){
          this.contentLoading=true
         const paramater={
           param1:this.recordId,
           param3:'0'
         }
         this.reqWorkDetail(paramater)
           .then((res)=>{
             if(res.success){
               this.wdgz=res.data[0].wdgz
               this.wdgzdetail=res.data[0].wdgzdetail
               this.contentLoading=false
             }else{
               this.$message.error('获取工作详情失败')
               this.contentLoading=false
             }
           })
           .catch((err)=>{
              console.log(JSON.stringify(err))
             this.contentLoading=false
           })
      },
      addGz(){
        this.wdgzdetail.push({
          gznr:'',
          gzjd:0,
          id:'lsid-'+moment().valueOf()+Math.ceil(Math.random()*1000)
        })
      },
      removeGz(index){
        this.wdgzdetail.splice(index,1)
      },
      handleCommit(){
        this.form.validateFields((err, values) => {
          if (!err) {
            this.contentLoading=true
              this.wdgz.wcjd=this.zongJd
            this.wdgzdetail.forEach(detail=>{
//                debugger
              if(detail.id.indexOf('lsid')>-1) {
                delete detail.id
              }
            })
            const paramater={
                jsonData:JSON.stringify({
                  wdgz:this.wdgz,
                  wdgzdetail:this.wdgzdetail
                })
            }
            this.editMyWork(paramater)
              .then((res)=>{
                if(res.success){
                  this.$message.success('提交成功！')
                  this.$emit('cancel','success')
                  this.contentLoading=false
                }else{
                  this.$message.error(res.message)
                  this.contentLoading=false
                }
              })
              .catch((err)=>{
                console.log(JSON.stringify(err))
                this.contentLoading=false
              })
          }
        })
      },
      finishMyWork(record){
        debugger
        this.contentLoading=true
        const paramater={
          param1:record.id ? record.id : this.recordId
        }
        this.finishWork(paramater)
          .then((res)=>{
            if(res.success){
              this.$message.success('提交成功！')
              this.$emit('cancel','success')
              this.contentLoading=false
            }else{
              this.$message.error(res.message)
              this.contentLoading=false
            }
          })
          .catch((err)=>{
            console.log(JSON.stringify(err))
            this.contentLoading=false
          })
      },
      jdChange(){
        const value=arguments[0][0]
        const index=arguments[0][1]
        const item=arguments[0][2]
        this.wdgzdetail[index].gzjd=value
        if(this.zongJd>100){
//        if(value>50){
//            debugger
//          this.$message.error('')
          const aaa=`gzjd-${item.id}`
          const oldValue=this.form.getFieldValue(aaa)
//          const tmp={}
//          tmp[aaa]=50
//          this.form.setFieldsValue(tmp)
          this.wdgzdetail[index].gzjd=oldValue
          const form=this.form
          this.$error({
            title:'总进度不能超过100%，请重新设置！',
            style:{top:'300px'},
//            centered:'true',
            onOk(){
            form.resetFields()
            }
          })
        }
      },
      gznrChange(){
//        debugger
        const e=arguments[0][0]
        const index=arguments[0][1]
        this.wdgzdetail[index].gznr=e.target.value
      },
      emitCancel(){
        this.$emit('cancel')
      },
      tabChange(activeKey){
        activeKey == '1' ? this.activeTab = '1' : this.activeTab = '2'
      },

      //单双行条纹样式
      rowClass(record, index){
        if (index % 2 == 1) return 'even-rows'
      },
      //请求表格数据
      reqTableData(filterOption){
        this.table.tableIsLoading = true
        const parameter = {
          limit:10000,
          start:0,
          param4:this.recordId
        }
        if (filterOption) parameter.filter = JSON.stringify(filterOption)       //增加搜索条件
        this.$store.dispatch('reqZrwList',parameter)
          .then((res) => {
            //请求成功后，在下面进行数据处理，赋值给table
            // this.table.dataSource = this.$store.getters[getList]
            this.table.dataSource = res.data
            this.table.dataSource.forEach((item, index) => {
              item.index = index  + 1
              item.starttime = item.starttime && item.starttime != '' ? moment(item.starttime).format('YYYY-MM-DD HH:ss') : ''
              item.endtime = item.endtime && item.endtime != '' ? moment(item.endtime).format('YYYY-MM-DD HH:ss') : ''
              item.jhwctime = item.jhwctime && item.jhwctime != '' ? moment(item.jhwctime).format('YYYY-MM-DD') : ''
            })
            // if(this.activeTab=='1') this.noEndNum=res.totalCount
            // this.pagination.total = res.totalCount
            this.table.tableIsLoading = false
          })
          .catch(err => console.log(JSON.stringify(err)))
      },

      handleChange(info){
        let fileList = info.fileList
        fileList.forEach((file)=>{
          if(file.response){
            if(file.response.success){
              file.url=file.response.data[0].urlpicpath+file.response.data[0].cpPic_name
            }else{
              file.status="error"
              this.$message.error(file.response.message)
            }
          }
        })
        this.fileList=fileList
      },
      reqFlies(){
        if (!this.recordId ||this.recordId=='')return
        const  paramater={
          param2:this.recordId
        }
        this.reqWorkFilelist(paramater)
          .then((res)=>{
//            debugger
            if(res.success){
              const filelist=[]
              if (res.data.length>0){
                res.data.forEach(item=>{
//                    debugger
                  filelist.push({
                    uid: item.id,
                    name: item.shortMsg,
                    status: 'done',
                    message: 'Server Error 500', // custom error message to show
                    url: item.fpath,
                  })
                })
                this.fileList=filelist
//                  this.$message.success('文件上传成功')
              }
            }else{
              this.$message.error('请求附件列表失败！')
            }
          })
          .catch(err=>console.log(JSON.stringify(err)))
      },
      rmFile(file){
        return new Promise((resolve,reject)=>{
          const paramater={
            param1: file.response ? file.response.data[0].serverId :file.uid
          }
          this.removeFile(paramater)
            .then((res)=>{
              if (res.success){
                this.$message.success('文件已删除！ ')
                resolve()
              }else{
                this.$message.error('删除文件失败！ '+res.message)
                reject()
              }
            })
            .catch((err)=>{
              console.log(JSON.stringify(err))
              reject()
            })
        })
      },
    }
  }
</script>

<style lang="scss" >
  .gzjl-title{
      :before {
      display: inline-block;
      margin-right: 4px;
      content: '*';
      font-family: SimSun;
      line-height: 1;
      font-size: 14px;
      color: #f5222d;
    }
  }
  .gznr-title{
    :before {
      display: inline-block;
      margin-right: 4px;
      content: '*';
      font-family: SimSun;
      line-height: 1;
      font-size: 14px;
      color: #f5222d;
    }
  }
  .mywork-form{
    .ant-table-placeholder{
      padding:0
    }
  }
  .role-form{

    .item-title{
      text-align: right;
      display: inline-block;
      width: 100%;
    }
    .spinning{
      height:100%;
      .ant-spin-container{
        height:100%;
      }
    }
    .ant-form-item{
      margin-bottom: 8px;
    }
    .role-sider{
      padding:8px;

      width:300px;
      height: calc(100% - 45px);
      display: inline-block;
    }
    .role-content{
      vertical-align:top;
      padding:8px;
      padding-left:0;
      padding-right: 24px;
      /*width:calc(100% - 300px);*/
      /*height: calc(100% - 45px);*/
      height: 100%;
      /*display: inline-block;*/
    }
    .ant-card-head{
      padding:0 14px;
      min-height: 32px;
      font-size: 14px;
      .ant-card-head-title{
        padding:8px 0;
      }

    }
    .ant-card-body{
      padding:8px;
      height: calc(100% - 37px);
      overflow: auto;
    }
    .ant-tree-switcher{
      width: 18px !important;
      height: 18px !important;
      line-height: 18px !important;
    }
    .ant-tree-node-content-wrapper{
      height: 18px !important;
      line-height: 18px !important;
      font-size: 12px !important;
    }
    .ant-tree li {
      padding: 2px 0;
    }
    .ant-tree.ant-tree-show-line li:not(:last-child):before{
      left: 8px;
      margin: 4px 0;
    }
    .ant-divider-horizontal{
      margin:12px 0
    }
    .ant-collapse-borderless{
      .ant-form-item{
        margin-bottom: 0px;
      }
      .ant-collapse-content-box{
        padding:0px
      }
    }
    .ant-collapse-borderless > .ant-collapse-item > .ant-collapse-content > .ant-collapse-content-box {
      padding-top: 0px;
    }
  }
</style>