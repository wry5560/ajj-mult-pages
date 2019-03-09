<template>
  <div class="jc-form" :style="{height:height}">
    <span  v-if="showTree" class="jc-sider" style="width: 300px">
      <a-card style="height: 100%">
        <div slot="title">
          检查表列表
          <a-icon style="float: right;font-size:12px;margin-top:5px;color:gray" v-if="!treeLoading" type="reload"  @click="reqTreeData"/>
          <a-icon style="float: right;font-size:12px;margin-top:5px;color:gray" v-else type="loading" />
        </div>
        <a-spin :spinning="treeLoading" size="small">
          <a-tree :treeData="treeData" showLine @select="handleSelect" :selectedKeys="treeSelectedKey"/>
        </a-spin>
      </a-card>
    </span>

      <span class="jc-content" :style="{width:showTree ? 'calc(100% - 300px)':'100%'}">
        <a-spin :spinning="contentLoading" wrapperClassName="spinning">
          <a-card style="height: 100%;">
            <div v-if="showTree"slot="title">检查表名称：{{selectedJcb.title}}</div>
            <div v-else slot="title">检查记录编号：{{jcd.jcno ?'[' + jcd.jcdlx + ']' + jcd.jcno :''}}</div>
            <a-form v-if="!refresh" :form="form" >
              <a-row :gutter="16">
            <a-col :lg="12" :md="12" :sm="24">
              <a-form-item label="被检查单位" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
                 {{jcd.dwmc}}
              </a-form-item>
            </a-col>
            <a-col :lg="12" :md="12" :sm="24">
              <a-form-item label="单位地址" :labelCol="{ span: 6 }" :wrapperCol="{ span: 17 }">
                <a-input size="small" placeholder="请输入单位地址" :autosize="{ minRows: 2, maxRows: 6 }"v-decorator="['dwdz',{rules: [{ required: true, message: '请输入单位地址', whitespace: true}],initialValue: jcd.dwdz ? jcd.dwdz:''}]" />
              </a-form-item>
            </a-col>
            <a-col :lg="12" :md="12" :sm="24">
              <a-form-item label="法人/负责人" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
                <a-input size="small" placeholder="请输入法人/负责人" :autosize="{ minRows: 2, maxRows: 6 }"v-decorator="['fr',{rules: [{ required: true, message: '请输入法人/负责人', whitespace: true}],initialValue: jcd.fr ? jcd.fr:''}]" />
              </a-form-item>
            </a-col>
            <a-col :lg="12" :md="12" :sm="24">
              <a-form-item label="联系电话" :labelCol="{ span: 6 }" :wrapperCol="{ span: 17 }">
                <a-input size="small" placeholder="请输入法人/负责人联系电话" :autosize="{ minRows: 2, maxRows: 6 }"v-decorator="['frlx',{rules: [{ required: true, message: '请输入法人/负责人联系电话', whitespace: true}],initialValue: jcd.frlx ? jcd.frlx:''}]" />
              </a-form-item>
            </a-col>
            <a-col :lg="12" :md="12" :sm="24">
              <a-form-item label="安全负责人" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
                <a-input size="small" placeholder="请输入安全负责人" :autosize="{ minRows: 2, maxRows: 6 }"v-decorator="['qyaqfzr',{rules: [{ required: true, message: '请输入安全负责人', whitespace: true}],initialValue: jcd.qyaqfzr ? jcd.qyaqfzr:''}]" />
              </a-form-item>
            </a-col>
            <a-col :lg="12" :md="12" :sm="24">
              <a-form-item label="联系电话" :labelCol="{ span: 6 }" :wrapperCol="{ span: 17 }">
                <a-input size="small" placeholder="请输入安全负责人联系电话" :autosize="{ minRows: 2, maxRows: 6 }"v-decorator="['qyaqfzrlx',{rules: [{ required: true, message: '安全负责人联系电话', whitespace: true}],initialValue: jcd.qyaqfzrlx ? jcd.qyaqfzrlx:''}]" />
              </a-form-item>
            </a-col>
            <a-col :lg="12" :md="12" :sm="24">
              <a-form-item label="所属辖区" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
                <a-select style="width:100%" size="small" placeholder="请选择所属辖区"
                          v-decorator="['ssxq',{rules: [{ required: true, message: '请选择所属辖区', whitespace: true}],initialValue: jcd.ssxq ? jcd.ssxq:undefined}]" >
                  <a-select-option v-for="item in selectOptions.ssxq" :key="item.value">{{item.label}}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :lg="12" :md="12" :sm="24">
              <a-form-item label="从业人数" :labelCol="{ span: 6 }" :wrapperCol="{ span: 17 }">
                <a-input-number style="width:100%" size="small" placeholder="请输入从业人数" :autosize="{ minRows: 2, maxRows: 6 }"v-decorator="['cyrs',{rules: [{ required: true, message: '请输入从业人数', whitespace: true,type:'number'}],initialValue: jcd.cyrs ? jcd.cyrs:null}]" />
              </a-form-item>
            </a-col>
                <a-col :lg="12" :md="12" :sm="24" >
                    <a-form-item label="检查开始时间" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
                        <a-date-picker  placeholder="请选择检查开始时间"
                                        style="width: 100%"
                                        v-decorator="['jctimestart',{rules: [{ required: true, message: '请选择检查开始时间',type:'object'}],initialValue: this.moment()}]"
                                        format="YYYY-MM-DD HH:mm"
                                        showTime
                                        :disabledDate="disableStartDate"
                        />
                    </a-form-item>
                  </a-col>
                <a-col :lg="12" :md="12" :sm="24">
              <a-form-item label="检查场所" :labelCol="{ span: 6 }" :wrapperCol="{ span: 17 }">
                <a-input size="small" placeholder="请输入检查场所" :autosize="{ minRows: 2, maxRows: 6 }"v-decorator="['jcdz',{rules: [{ required: true, message: '请输入检查场所', whitespace: true}],initialValue: jcd.jcdz ? jcd.jcdz:''}]" />
              </a-form-item>
            </a-col>
            <a-col :lg="12" :md="12" :sm="24">
               <a-form-item v-if="showTree"label="检查人员" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
                 <span style="display: inline-block;width: 70%">
                    <a-select ref="jcry" placeholder="请选择检查人员" :options="jcryList" mode="multiple"  allowClear  :labelInValue="true"
                               v-decorator="[ 'jcry',{rules: [{ required: true, message: '请选择检查人员', whitespace: true,type:'array',validateTrigger:'blur'}]}]" >
                  </a-select>
                  </span>
                  <span style="display: inline-block;width: 30%">
                    <a-tree-select :treeData="ssbm" style="width:100%;padding-left:5px"   placeholder="所属部门筛选" v-model="jcryDepartmentId" @select="jcryDepartSel"
                                   allowClear :dropdownStyle="{'max-height':'300px'}"/>
                  </span>
               </a-form-item>
              <a-row v-else >
                <a-col :lg="6">
                <span class="item-title"><strong>检查人员：</strong></span>
                </a-col>
                <a-col :lg="18">
                  <span class="item-content">{{jcd.jcusersname}}</span>
                </a-col>
              </a-row>
            </a-col>
            <a-col :lg="12" :md="12" :sm="24">
               <a-form-item v-if="showTree" label="陪同专家" :labelCol="{ span: 6 }" :wrapperCol="{ span: 17 }">
                 <span style="display: inline-block;width: 70%">
                  <a-select  placeholder="请选择陪同专家"  :options="zhuanjiaList"  mode="multiple"  allowClear  :labelInValue="true"
                             v-decorator="[ 'zhuanjia',{rules: [{ whitespace: true,type:'array',validateTrigger:'blur'}]}]" >
                  </a-select>
                   </span>
                  <span style="display: inline-block;width: 30%">
                    <a-tree-select :treeData="ssbm" style="width:100%;padding-left:5px"   placeholder="所属部门筛选" v-model="jczjDepartmentId" @select="jczjDepartSel"
                                   allowClear :dropdownStyle="{'max-height':'300px'}"/>
                  </span>

               </a-form-item>
                <a-row v-else>
                  <a-col :lg="6">
                    <span class="item-title"><strong>陪同专家：</strong></span>
                  </a-col>
                    <a-col :lg="17">
                    <span class="item-content" >{{jcd.jczjname}}</span>
                    </a-col>
                </a-row>
            </a-col>
          </a-row>
              <a-divider/>
              <div style="margin-bottom: 12px">
                <a-row :gutter="16">
                  <a-col :lg="19" :md="24">
                    <span style="padding-left: 16px;"><strong>检查内容：</strong></span>
                  </a-col>
                  <a-col :lg="5" :md="24">
                    <span><strong>检查结果：</strong></span>
                  </a-col>
                </a-row>
              </div>
              <template>
              <div>
                <a-collapse v-if="jcddetail && jcddetail.length>0 ":bordered="false"  :activeKey="activeKey">
                  <a-collapse-panel v-for="(item,index) in jcddetail"  :key="item.id" :showArrow="false" :style="customStyle" disabled>
                    <template slot="header">
                      <a-row  :gutter="12">
                      <a-col :lg="19" :md="24">
                        <a-form-item label="" :wrapperCol="{ span: 24 }">
                          <a-textarea size="small" placeholder="请输入检查内容" :autosize="{ minRows: 1, maxRows: 2 }" v-decorator="[`jcdetail[${index}].${item.id}.jcnr`,{rules: [{ required: true, message: '请输入检查内容', whitespace: true}],initialValue: item ? item.jcnr:''}]" />
                        </a-form-item>
                      </a-col>
                      <a-col :lg="4" :md="22">
                        <a-form-item  :wrapperCol="{ span: 24 }">
                            <a-select  placeholder="请选择检查结果"  @change="handleSelectChange([...arguments,index,item.id])"
                                       v-decorator="[ `jcdetail[${index}].${item.id}.jcjg`,{rules: [{ required: true, message: '请选择检查结果', whitespace: true,}],initialValue:item.jcjg!='' ? item.jcjg : undefined}]" >
                              <a-select-option v-for="selitem in selectOptions.jcjg" :key="selitem.value">{{selitem.label}}</a-select-option>
                            </a-select>
                         </a-form-item>
                      </a-col>
                      <a-col :lg="1":md="2">
                        <a href="javascript:;"@click="removeJcnr(index)"><a-icon type="close-circle" style="color:gray;margin-top:12px;"/></a>
                      </a-col>
                    </a-row>
                    </template>
                    <a-form-item v-if="item.jcjg=='未落实'||item.jcjg=='立即整改'"label="隐患内容" :labelCol="{ span: 3 }" :wrapperCol="{ span: 20}">
                      <a-textarea size="small" placeholder="请输入隐患内容" :autosize="{ minRows: 1, maxRows: 3 }"v-decorator="[ `jcdetail[${index}].${item.id}.yhnr`,{rules: [{ required: true, message: '请输入隐患内容', whitespace: true}],initialValue: item ? (showTree? item.yhts:item.yhnr):''}]" />
                    </a-form-item>
                    <a-form-item v-if="item.jcjg=='系统未落实'"label="系统未落实内容" :labelCol="{ span: 3 }" :wrapperCol="{ span: 20}">
                      <a-textarea size="small" placeholder="请输入系统未落实内容" :autosize="{ minRows: 1, maxRows: 3 }"v-decorator="[`jcdetail[${index}].${item.id}.sysnr`,{rules: [{ required: true, message: '请输入系统未落实内容', whitespace: true}],initialValue: item ? (showTree? item.systs:item.sysnr):''}]" />
                    </a-form-item>
                  </a-collapse-panel>
                </a-collapse>
                <a-row :gutter="16" v-if="activeKey.length>0">
                  <a-col :lg="12" :md="12" :sm="24" :offset="11">
                    <a-form-item label="要求整改完成日期" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
                        <a-date-picker  placeholder="请选择整改完成日期"
                                       style="width: 100%"
                                       v-decorator="['zgwcDate',{rules: [{ required: true, message: '请选择整改完成日期',type:'object'}],initialValue: jcd.yqzgsj && jcd.yqzgsj!=''?this.moment(jcd.yqzgsj) : null}]"
                                       format="YYYY-MM-DD"
                                       :disabledDate="disabledDate"
                        />
                    </a-form-item>
                  </a-col>
                </a-row>
              </div>
            </template>
              <a-button type="dashed" style="width: 100%" icon="plus"@click="addJcnr">添加检查标准</a-button>
            </a-form>

            <template>
              <div style="width:400px ;margin-top: 16px;min-height: 100px">
                <a-upload :action="uploadUrl+lsid" :multiple="true" :fileList="fileList" @change="handleChange"  :remove="rmFile">
                <a-button>
                  <a-icon type="upload" /> 上传附件
                  </a-button>
                </a-upload>
              </div>
              </template>
          </a-card>
        </a-spin>
    </span>

    <div class="bottom-buttons-bar">
      <div>
        <a-button size="small" type="primary" @click="handleCommit" style="float:right">提交</a-button>
        <a-button size="small" @click="modalCancel" style="float:right">取消</a-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {  mapGetters,mapActions } from 'vuex'
  import moment from 'moment'

  const selOptions=['ssxq','jcjg']

  export default {
    name: "jc-form",
    props: {
      showTree:{
        Boolean,
        default:true
      },
      height:String,
      departmentId:String,
      qyid:String,
      recordId:String
    },
    data() {
      return {
        jcryDepartmentId:undefined,
        jczjDepartmentId:undefined,
        ssbm:[],
        isFirstLoading:true,
        refresh:false,
        treeData:[],
        treeSelectedKey:[],
        treeLoading:false,


        selectOptions:[],
        disableStartDate(current) {
          return  current > moment().startOf('day');
        },
        disabledDate(current) {
          return  current < moment().startOf('day');
        },
        jcryList:[],
        zhuanjiaList:[],

        contentLoading:false,
        selectedJcb:{},
        form: this.$form.createForm(this),
        dwaqfzrlist:[],
        jcd:{},
        jcddetail:[],
        customStyle:{
          background: '#f6f6f6',
          'border-radius': '4px',
          'margin-bottom': '12px',
          border: 0,
        },
        activeKey:[],
        uploadUrl:process.env.NODE_ENV === 'production'?'other/FileManager.upfile.json?param2=2&param3=asro_jcd&param1=' :'api/other/FileManager.upfile.json?param2=2&param3=asro_jcd&param1=' ,
        fileList:[],
      };
    },
    computed:{
      lsid(){
        return this.showTree? 'lsundefined-'+moment().valueOf()+Math.ceil(Math.random()*1000):this.recordId
      }
    },
    created(){
      this.showTree ? this.reqTreeData():this.reqJcxx(this.recordId)
      this.reqJcNameList()
      this.reqZuzhiData()
        .then((res)=>{
          if(res.success){
            this.ssbm=[]
//            debugger
            const treeData=[{
              title:'全部',
              key:'0000',
              value:'0000',
              pId:'0',
              id:'0000'
            }]
            res.data.forEach((item)=>{
              treeData.push({
                title:item.name,
                key:item.id,
                value:item.id,
                ...item
              })
            })
            this.ssbm=this.initTreeData(treeData)
//            this.siderTreeOption.treeLoading=false
            this.jcryDepartmentId=this.ssbm[0].key
            this.jczjDepartmentId=this.ssbm[0].key
          }
        })
        .catch(err=>console.log(JSON.stringify(err)))
    },
    mounted(){
      this.$nextTick(function () {
        let _this=this
//        window.onresize = function(){
//          _this.table.scrollSize.y=  _this.search.showAdvanced ? window.innerHeight - 190 :window.innerHeight - 112
//          _this.modalOption.bodyStyle.height=window.innerHeight-80 + 'px'
//        }

        //初始化选择项,存入vuex相应store的state中
        const ls = JSON.parse(localStorage.getItem('/asrsajjdic'))

        const tmp={}
        selOptions.forEach(item=>{tmp[item]=ls[item]})
        this.selectOptions=tmp
      })
    },
    methods: {
      moment,
      ...mapGetters(['jczf_jcb_list']),
      ...mapActions(['reqJcjcbList','reqQyZfjcb','reqJcryList','removeFile','createJcDetail','reqJcxxlDetail','reqZuzhiData']),

      jcryDepartSel(selectKey){
          const jcryList=[]
        if(selectKey) this.jcryList.forEach(item=>{
            item={...item}
            item.class= item.departmentid==selectKey ||selectKey=='0000'?  '' :'display-none'
          jcryList.push(item)
        })
        this.jcryList=jcryList
      },
      jczjDepartSel(selectKey){
        const zhuanjiaList=[]
        if(selectKey) this.zhuanjiaList.forEach(item=>{
          item={...item}
            item.class= item.departmentid==selectKey ||selectKey=='0000'?  '' :'display-none'
          zhuanjiaList.push(item)
        })
        this.zhuanjiaList=zhuanjiaList
      },

      removeJcnr(index){
        this.jcddetail.splice(index,1)
      },
      addJcnr(){
        this.jcddetail.push({
          jcnr:'',
          id:moment().valueOf()+Math.ceil(Math.random()*1000)
        })
      },
      handleSelectChange(){
        const value=arguments[0][0]
        const index=arguments[0][2]
        const key=arguments[0][3]
        this.jcddetail[index].jcjg=value
        const tmpIndex=this.activeKey.findIndex(i=>i==key)
        if(value=='落实'){
           if(tmpIndex >-1) this.activeKey.splice(tmpIndex,1)
        }else{
          if(tmpIndex ==-1) this.activeKey.push(key)
        }
      },
      modalCancel(){
        this.$emit('cancel')
      },
      handleCommit(){
        this.form.validateFields((err, values) => {
          if (!err) {
            this.contentLoading=true
            const jsonData={
              zfjc:{},
              zfjcdetail:[],
            }
            jsonData.zfjc={...this.jcd}
            jsonData.zfjc.jctimestart=values.jctimestart.format('YYYY-MM-DD HH:mm')
            if (values.zgwcDate)jsonData.zfjc.yqzgsj=values.zgwcDate.format('YYYY-MM-DD')
            jsonData.zfjc.dwdz=values.dwdz
            jsonData.zfjc.fr=values.fr
            jsonData.zfjc.frlx=values.frlx
            jsonData.zfjc.qyaqfzr=values.qyaqfzr
            jsonData.zfjc.qyaqfzrlx=values.qyaqfzrlx
            jsonData.zfjc.ssxq=values.ssxq
            jsonData.zfjc.cyrs=values.cyrs
            jsonData.zfjc.jcdz=values.jcdz
            values.jcdetail.forEach((detail)=>{
              const id= Object.keys(detail)[0]
              const detailIndex=this.jcddetail.findIndex(i=>i.id==id)
              const postDetail=detailIndex>-1 ?{...this.jcddetail[detailIndex]}:{}
                postDetail.jcjg=detail[id].jcjg
                postDetail.jcnr=detail[id].jcnr
                if(detail[id].yhnr)postDetail.yhnr=detail[id].yhnr
                if(detail[id].sysnr)postDetail.sysnr=detail[id].sysnr
                jsonData.zfjcdetail.push(postDetail)
            })
            if (this.showTree){

              jsonData.zfusers=[]
              jsonData.zjusers=[]
              values.jcry.forEach((item)=>{
//                  debugger
//                const tmpKey=item.key.split('?')[1]
                const tmpKey=item.key
                jsonData.zfusers.push(this.jcryList.find(i=>i.id==tmpKey))
              })
              values.zhuanjia.forEach((item)=>{
//                const tmpKey=item.key.split('?')[1]
                const tmpKey=item.key
                jsonData.zjusers.push(this.zhuanjiaList.find(i=>i.id==tmpKey))
              })
              jsonData.zfjc.lsId=this.lsid
            }
            const paramater={
              jsonData:JSON.stringify(jsonData)
            }
            this.createJcDetail(paramater)
              .then((res)=>{
                if(res.success){
                  this.$message.success('提交成功')
                  this.contentLoading=false
                  this.$emit('cancel','success')
                }else{
                  this.$message.error(res.message)
                  this.contentLoading=false
                }
              })
              .catch(err=>console.log(JSON.stringify(err)))
          }})
//        this.modalCancel()
      },
      //格式化tree数据的方法
      initTreeData(data){
//        debugger
        if (data.length && data.length>0){
          // debugger
          const treeData=[]
//        data.sort((a,b)=>{
//          return b.nodeLevel - a.nodeLevel
//        })
          data.forEach(item=>{
//              debugger
            const parent = data.find(i=>item.pId==i.id)
            if (parent){
              if(!parent.children){
                parent.children=[]
              }
              parent.children.push(item)
            }else{
              treeData.push(item)
            }
          })
          return treeData
        }else{
          return []
        }
      },
      reqTreeData(){
      this.treeLoading=true
      const paramater={
        param1:this.departmentId
      }
        this.reqJcjcbList(paramater)
          .then((res)=>{
          if(res.success){
//              debugger
            this.treeData=[]
              res.data.forEach((item)=>{
//                debugger
                this.treeData.push({
                  title:item.planname,
                  key:item.id + '?'+item.gdlx,
                  id:item.id,
                  gdlx:item.gdlx,
                })
              })
            this.treeLoading=false

            if(this.isFirstLoading) {
                this.handleSelect([this.treeData[0].key])
              this.treeSelectedKey=[this.treeData[0].key]
            }
          }else{
              this.$message.error(res.message)
            this.treeLoading=false
          }
          })
          .catch(err=>console.log(JSON.stringify(err)))

      },
      reqJcNameList(){
//        this.contentLoading=true
        this.reqJcryList()
          .then((res)=>{
            if(res.success){
                const _this=this
//              debugger
                res.data.forEach((item)=>{
                  item.class=''
                  item.title=item.name
                  item.key=item.id
                })
                setTimeout( ()=>{
                  _this.zhuanjiaList=res.data
                  _this.jcryList=res.data
//                  _this.contentLoading=false
                }, 200)
            }else{
              this.$message.error(res.message)
              this.contentLoading=false
            }
          })
          .catch(err=>console.log(JSON.stringify(err)))
      },

      handleSelect(selectedKeys,e){
//          debugger
        if(selectedKeys.length>0)this.treeSelectedKey=selectedKeys
        const tmp=this.treeSelectedKey[0].split('?')[0]
        this.contentLoading=true
        this.selectedJcb=this.treeData.find(i=>i.id==tmp)
        const paramater={
             param1: this.qyid,
             param3:tmp,
             param4: this.selectedJcb.gdlx,
        }
        this.reqQyZfjcb(paramater)
          .then((res)=>{
            if(res.success){
              this.dwaqfzrlist=res.data[0].dwaqfzrlist
              this.jcd=res.data[0].jcd
              this.jcddetail=res.data[0].jcddetail
              this.contentLoading=false
              this.isFirstLoading=false

            }else{
              this.$message.error(res.message)
              this.contentLoading=false
            }
          })
          .catch(err=>console.log(JSON.stringify(err)))
      },
      reqJcxx(id){
        this.contentLoading=true
        this.refresh=true
        const paramater={
          param1: id,
        }
        this.reqJcxxlDetail(paramater)
          .then((res)=>{
            if(res.success){
              this.dwaqfzrlist=res.data[0].dwaqfzrlist
              this.jcd=res.data[0].jcd
              this.jcddetail=res.data[0].jcddetail
              this.jcddetail.forEach((item)=>{
                  if (item.jcjg=='未落实'||item.jcjg=='系统未落实'||item.jcjg=='立即整改') this.activeKey.push(item.id)
              })
//              debugger
              const filelist=[]
              if (res.data[0].filelist.length>0){
                res.data[0].filelist.forEach(item=>{
//                    debugger
                  filelist.push({
                    uid: item.id,
                    name: item.shortMsg,
                    status: 'done',
                    response: 'Server Error 500', // custom error message to show
                    url: item.fpath,
                  })
                })
                this.fileList=filelist
              }
              this.contentLoading=false
              this.isFirstLoading=false
              this.refresh=false
            }else{
              this.$message.error(res.message)
              this.contentLoading=false
              this.refresh=false
            }
          })
          .catch(err=>console.log(JSON.stringify(err)))
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
      rmFile(file){
        return new Promise((resolve,reject)=>{
            const paramater={
              param1: this.showTree? file.response.data[0].serverId :file.uid
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
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" >
  .display-none{
    display: none;
  }
  .jc-form{
    background-color: #f5f5f5;
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
    .jc-sider{
      padding:8px;
      width:300px;
      height: calc(100% - 45px);
      display: inline-block;
    }
    .jc-content{
      vertical-align:top;
      padding:8px;
      padding-left:0;
      width:calc(100% - 300px);
      height: calc(100% - 45px);
      display: inline-block;
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
