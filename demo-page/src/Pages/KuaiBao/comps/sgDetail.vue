<template>
  <div class="sg-detail">
    <div  class="header-buttons-bar">
      <a-button @click="goBack" :style="{'margin-left':'16px'}">返 回</a-button>
      <a-button @click="reqAll" :style="{'margin-left':'8px'}">刷 新</a-button>
      <!--<a-button @click="" type="primary":style="{'margin-right':'5px','float':'right'}">续 报</a-button>-->
      <div style="clear: both"></div>
    </div>
    <div style="padding:0px 16px;overflow: auto;background-color:  #f0f2f5">
      <a-card :loading="stepsData.lcLoading"style="margin-top: 16px":bordered="false" title="流程进度">
        <a-steps  :current="currentStep" style="height: 95px">
          <a-step v-for="(step,index) in stepsData.steps" :title="step.title" :key="index" >
            <span v-if="step.auditstate!=''||index==0" slot="description">
              <div>{{step.auditstate}}</div>
              <div>{{step.audituser}}</div>
              <div>{{step.audittime}}</div>
            </span>
          </a-step>
        </a-steps>
      </a-card>
      <a-row :gutter="16" style="margin-top: 12px">
        <a-col :lg="16">
          <a-card :bordered="false" title="流程节点">
            <a-timeline>
              <a-timeline-item v-for="timeline in this.timelineData.timelines":color="timeline.color" :key="timeline.id">
                <div style="border-bottom: 1px solid #f0f0f0;margin-bottom: -10px;padding-bottom: 10px">
                  <div style="display: inline-block;width:120px;margin-right: 6px">
                    <div >{{timeline.lcname}}</div>
                    <div style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap">{{timeline.audituser}}</div>
                  </div>
                  <div style="display: inline-block;width:130px;margin-right: 8px">
                    <div>{{timeline.auditstate}}</div>
                    <div>{{timeline.audittime}}</div>
                  </div>
                  <div :style="timeline.feedback !=''?{width: 'calc(50% - 130px)',display:'inline-block','margin-right':'8px',}:{display:'inline-block','margin-right':'8px'}">
                    <div>审核意见：
                      <span style="display: inline-block ;margin-left: 25px">
                          <a href="javascript:;" v-if="timeline.feedback ==''" @click="showModal(timeline.lcid)">回 复</a>
                      </span>
                    </div>
                    <a-tooltip :mouseEnterDelay="0.5">
                      <div style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap">{{timeline.auditdesc==''?'暂无':timeline.auditdesc}}</div>
                    </a-tooltip>
                  </div>
                  <div v-if="timeline.feedback !=''" style="display: inline-block;width: calc(50% - 150px);position: absolute;right: 0">
                    <div style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap">{{timeline.feedbackuser}} {{timeline.feedbacktime}} 回复</div>
                    <a-tooltip :mouseEnterDelay="0.5">
                      <div style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap">{{timeline.feedback }}</div>
                    </a-tooltip>
                  </div>
                </div>
              </a-timeline-item >
            </a-timeline>
          </a-card>
        </a-col>
        <a-col :lg="8">
          <a-spin  :spinning="modalLoading">
          <a-card :bordered="false" >
            <div slot="title">
              <span>事件编号:{{sbData.xbid==0?sbData.id:"续 "+ sbData.id + "-"+sbData.xbid}}</span>
              <span v-if="this.$route.params.isShenhe=='true'" style="display: inline-block;float: right">
                <span style="display: inline-block;float: right;">
                  <!--<a-radio-group name="radioGroup" :defaultValue="1" v-model="shjg">-->
                    <!--<a-radio :value="1">通过</a-radio>-->
                    <!--<a-radio :value="9">不通过</a-radio>-->
                <!--</a-radio-group>-->
                <a-popconfirm title="审核确认后将无法修改，您确认此操作吗？" @confirm="postShenhe"  okText="Yes" cancelText="No">
                  <a-button type="primary" size="small" style="margin-right: 6px">审核确认</a-button>
                </a-popconfirm>
                  <a-popconfirm title="该事件流程即将关闭，关闭后无法修改，您确认此操作吗？" @confirm="endSg"  okText="Yes" cancelText="No">
                  <a-button type="danger" size="small" style="margin-right: 6px" v-if="sbData.xbid && sbData.xbid !=0">关闭事件</a-button>
                </a-popconfirm>
                <!--<a-popconfirm title="审核不通过后将将无法修改，您确认此操作吗？" @confirm="postShenhe(9)" okText="Yes" cancelText="No">-->
                  <!--<a-button size="small">不通过</a-button>-->
                <!--</a-popconfirm>-->
              </span>
                <!--<a-button size="small"style="margin-right: 8px" @click="onEdit">编 辑</a-button>-->
                <!--<a-button size="small" type="primary"@click="toggleShenhe">审 核</a-button>-->
              </span>
            </div>
            <div class="shenhe" v-if="openShenhe && this.$route.params.isShenhe=='true'">
              <a-form  :form="shenheForm" ref="shenheCommit">
                  <a-form-item  v-if="sbData.lclevel !='一级' &&  shjg!=9 "label="审核人" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
                    <a-select  size="small" placeholder="请选择审核人"
                               v-decorator="['shr',{rules: [{ required: true, message: '请选择审核人', whitespace: true,type:'number'}]}]" >
                      <a-select-option v-for="(item) in shrList" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
                    </a-select>
                  </a-form-item>
                <a-form-item label="审批意见" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
                  <a-textarea size="small" placeholder="请输入审批意见(必填项）" :autosize="{ minRows: 2, maxRows: 6 }"v-decorator="['spyj',{rules: [{ required: true, message: '请输入审批意见', whitespace: true}]}]" />
                </a-form-item>
              </a-form>
              <!--<span style="display: inline-block;float: right;">-->
                <!--<a-popconfirm title="审核通过后将无法修改，您确认此操作吗？" @confirm="postShenhe(1)"  okText="Yes" cancelText="No">-->
                  <!--<a-button type="primary" size="small" style="margin-right: 6px">通 过</a-button>-->
                <!--</a-popconfirm>-->
                <!--<a-popconfirm title="审核不通过后将将无法修改，您确认此操作吗？" @confirm="postShenhe(9)" okText="Yes" cancelText="No">-->
                  <!--<a-button size="small">不通过</a-button>-->
                <!--</a-popconfirm>-->
              <!--</span>-->
              <div style="clear: both"></div>
              <a-divider ></a-divider>
             </div>
            <span v-if="this.$route.params.isShenhe!='true'">
              <!--<detail-list  size="small">-->
              <!--<detail-list-item term="上报人员">{{sbData.__upuser.userName}}</detail-list-item>-->
              <!--<detail-list-item term="上报时间">{{sbData.uptime}}</detail-list-item>-->
              <!--</detail-list>-->
            <detail-list size="">
              <detail-list-item term="接报来源" :lg="24" ><div style="text-align: right">{{sbData.jbly}}</div></detail-list-item>
              <detail-list-item term="发生时间" :lg="24" ><div style="text-align: right">{{sbData.fstime}}</div></detail-list-item>
              <detail-list-item term="详细描述" :lg="24"></detail-list-item>
              <div>{{sbData.jbms}}</div>
            </detail-list>
            </span>
            <span v-if="this.$route.params.isShenhe == 'true'">
              <a-row :gutter="16">
                <a-col :lg="12">
                  <!--<span style="display:inline-block;width: 25%;text-align: right;line-height:40px;color: rgba(0, 0, 0, 0.85);font-size: 14px;margin-bottom: 12px">上报人员：</span>-->
                  <!--<span style="display:inline-block;width: 25%;color: rgba(0, 0, 0, 0.85);font-size: 14px">{{sbData.__upuser.userName}}</span>-->
                </a-col>
                <a-col :lg="12">
                  <!--<span style="display:inline-block;width: 25%;text-align: right;line-height:40px;color: rgba(0, 0, 0, 0.85);font-size: 14px">上报时间：</span>-->
                  <!--<span style="display:inline-block;width: 25%;color: rgba(0, 0, 0, 0.85);font-size: 14px">{{sbData.uptime}}</span>-->
                </a-col>
              </a-row>
              <sg-form sbType="sh" :sbData="sbData" :selectOptions="selectOptions" ref="sgCommit" :showSubmit="false"></sg-form>
            </span>
          </a-card>
          </a-spin>
        </a-col>
      </a-row>
    </div>
    <a-modal
      title="请输入回复内容"
      @cancel="modalCancel"
      :visible="modalOption.visible"
      :destroyOnClose="true"
      :maskClosable="false"
      wrapClassName="nomal-modal"
      width="70%"
      :bodyStyle="modalOption.bodyStyle"
    >
      <a-spin  :spinning="modalLoading">
      <a-textarea :autosize="{ minRows: 6}" placeholder="请输入回复内容" v-model="feedback"> </a-textarea>
      </a-spin>
      <!--<sg-form sbType="sh" :sbData="sgDetail" :selectOptions="selectOptions" ref="sgCommit" :showSubmit="false"></sg-form>-->
      <template slot="footer">
        <a-button key="back" @click="modalCancel">返 回</a-button>
        <a-button  key="submit" type="primary" :loading="modalOption.commitLoading" @click="addFeedback">确认回复</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>
  import ATimeline from "ant-design-vue/es/timeline/Timeline";
  import ATimelineItem from "ant-design-vue/es/timeline/TimelineItem";
  import DetailList from './DetailList.vue'
  import  DetailListItem from './DetailListItem.vue'
  import SgForm from './sgForm.vue'
  import {reqKuaiBaoDetail,reqKuaiBaoList,reqAllSbLc,reqSbLcTotal,reqSbLc,sgAudit,GeneralQuery,addSgkbFeedback,sgEnd} from '../api'
  import moment from 'moment'

  export default {
    moment,
    components: {ATimelineItem, ATimeline,DetailList,DetailListItem,SgForm },
    name:"sgDetail",
    props:{

    },
    data(){
        return {
          feedback:'',
          shjg:1,
          feedbackId:null,
          modalLoading:false,
          popoverVisible:{},
          shrList:[],
          sbData:{},
          openShenhe:true,
          modalOption:{
            visible:false,
            bodyStyle:{
              "max-height":window.innerHeight-250+'px',
              "min-height":100
            },
            commitLoading:false
          },
          selectOptions:{
            hyType:[],
            glType:[],
            sgdj:[],
            sglx:[],
            shlb:[],
            sgxz:[],
          },
          shenheForm: this.$form.createForm(this),
          stepsData:{
            lcLoading:false,
            showSteps:false,
            current:2,
            steps:[],
          },
          timelineData:{
            isend:'',
            timelines:[],
          },
          sgDetail:{
            id:'',
            xbid:'',
            sgnm:'',
            qy:'',
            hy:'',
            bsdw:'',
            sgfsdw:'',
            jldw:'',
            jsdw:'',
            glfl:'',
            sgdwdz:'',
            sgfsd:'',
            fssj:'',
            sgjk:'',
            sgdj:'',
            swrs:'',
            ssrs:'',
            zsrs:'',
            sxrs:'',
            zsrs:'',
            sxrs:'',
            szrs:'',
            jjss:'',
            sglx:'',
            sglx2:'',
            shlb:'',
            sgyy:'',
            cqcs:'',
            sgxz:'',
            cljg:'',
            sfnrtj:'',
            bz:'',
            uptime:'',
            upuser:'',
            isend:0
          }
        }
      },
    computed:{
      currentStep(){
          if (this.sbData.isend && this.sbData.isend==1){
            return 5
          }else{
            return this.stepsData.steps.findIndex(item=>item.title==this.sbData.lcname)
          }
      }
    },
    created(){
      this.reqAll()
//      this.reqShrList()
    },
    mounted(){
      //初始化选择项配置
//      debugger
      const ls = JSON.parse(localStorage.getItem('/asrsajjdic'))
      ls['企业类型'].forEach((item)=>{this.selectOptions.hyType.push([item.label,item.value])})
      ls['事故管理分类'].forEach((item)=>{this.selectOptions.glType.push([item.label,item.value])})
      ls['事故等级'].forEach((item)=>{this.selectOptions.sgdj.push([item.label,item.value])})
      ls['事故类型'].forEach((item)=>{this.selectOptions.sglx.push([item.label,item.value])})
      ls['事故伤害类型'].forEach((item)=>{this.selectOptions.shlb.push([item.label,item.value])})
      ls['事故性质'].forEach((item)=>{this.selectOptions.sgxz.push([item.label,item.value])})
    },
    methods:{
      moment,
      goBack(){
        this.$router.go(-1)
      },
      reqShrList(params){
        const parameter={
          sqlId:'S360015',
          param1:sys_relateDepId2,
          limit:1000,
          start:0,
          ...params
        }

        GeneralQuery(parameter)
          .then((res)=>{
            if(res.success){
              this.shrList=[]
              res.data.forEach((item)=>{
                this.shrList.push({
                  value:item.id,
                  label:item.name
                })
              })
            }else{
              message.error('获取审核人列表失败！')
            }
          })
          .catch(err=>console.log(JSON.stringify(err)))

      },
      reqAll(){
        //请求流程名称的参数
        const  parameter={
          param1:sys_relateDepId2,
        }
        //请求总流程节点的参数
        const  parameter2={
          param1:sys_relateDepId2,
          param2:this.$route.params.id,
          param3:this.$route.params.xbid
        }
//debugger
        if(this.$route.params.xbid==0){
            this.sbData=this.$store.getters.getKuaibaoById(this.$route.params.id)
        }else{
          if(this.$route.params.isShenhe){
            const id="续"+this.$route.params.id+"-"+this.$route.params.xbid
            this.sbData=this.$store.getters.getKuaibaoById(id)
//            this.sbData=tmp.find(item=>item.xbid==this.$route.params.id)
          }else{
            const id="续"+this.$route.params.id+"-"+this.$route.params.xbid
//            this.sbData=this.$store.getters.getXubaoById(this.$route.params.id,this.$route.params.xbid)
            this.sbData=this.$store.getters.getKuaibaoById(id)
            if (!this.sbData) this.sbData=this.$store.getters.getXubaoById(this.$route.params.id,this.$route.params.xbid)
//            debugger
          }
        }
        //请求事故详情
        let parameter3={}
//        if (this.$route.params.xbid==0) {
//          parameter3 = {
//            param1: sys_relateDepId2,
//            param2: 1,
//            param4: this.$route.params.id
//          }
//          reqKuaiBaoDetail(parameter3)
//            .then((res)=>{
//              //设置事故详情
//              if(res.success){
////                 debugger
//                  this.sgDetail=res.data[0]
//                  this.sgDetail.upuser=res.data[0].__upuser.userName
//                  const ls = JSON.parse(localStorage.getItem('/asrsajjdic'))
//                  this.sgDetail.sgdj=this.sgDetail.sgdj ? ls["事故等级"].find(item =>item.value==this.sgDetail.sgdj).label :''
//                  this.sgDetail.sgxz=this.sgDetail.sgxz ? ls["事故性质"].find(item =>item.value==this.sgDetail.sgxz).label :''
//                  this.sgDetail.shlb=this.sgDetail.shlb ? ls["事故伤害类型"].find(item =>item.value==this.sgDetail.shlb).label :''
//                  this.sgDetail.sglx=this.sgDetail.sglx ? ls["事故类型"].find(item =>item.value==this.sgDetail.sglx).label :''
//                  this.sgDetail.fssj=moment(this.sgDetail.fssj).format('YYYY-MM-DD HH:mm')
//                  this.sgDetail.uptimeBF=moment(this.sgDetail.uptime).format('YYYY-MM-DD HH:mm')
//                  this.sgDetail.uptime=moment(this.sgDetail.uptime).format('YYYY-MM-DD HH:mm')
//                  this.timelineData.isend=this.sgDetail.isend
//              }else{
//                this.$message.error(res.message)
//              }
//            })
//            .catch(err=>{console.log(JSON.stringify(err))})
//        }else{
//          parameter3={
//            param1:sys_relateDepId2,
//            param6:this.$route.params.id,
//          }
//          reqKuaiBaoList(parameter3)
//            .then((res)=>{
//              if(res.success){
//                // debugger
//                this.sgDetail=res.data.find(item => item.xbid==this.$route.params.xbid)
//                this.sgDetail.idBf= this.sgDetail.id
//                this.sgDetail.id='续'+this.sgDetail.id
//                this.sgDetail.upuser=this.sgDetail.__upuser.userName
//                const ls = JSON.parse(localStorage.getItem('/asrsajjdic'))
//                this.sgDetail.sgdj=this.sgDetail.sgdj ? ls["事故等级"].find(item =>item.value==this.sgDetail.sgdj).label :''
//                this.sgDetail.sgxz=this.sgDetail.sgxz ? ls["事故性质"].find(item =>item.value==this.sgDetail.sgxz).label :''
//                this.sgDetail.shlb=this.sgDetail.shlb ? ls["事故伤害类型"].find(item =>item.value==this.sgDetail.shlb).label :''
//                this.sgDetail.sglx=this.sgDetail.sglx ? ls["事故类型"].find(item =>item.value==this.sgDetail.sglx).label :''
//                this.sgDetail.fssj=moment(this.sgDetail.fssj).format('YYYY-MM-DD HH:mm')
//                this.sgDetail.uptimeBF=moment(this.sgDetail.uptime).format('YYYY-MM-DD HH:mm')
//                this.sgDetail.uptime=moment(this.sgDetail.xbtime).format('YYYY-MM-DD HH:mm')
//                this.sgDetail.xbtime=moment(this.sgDetail.xbtime).format('YYYY-MM-DD HH:mm')
//                this.timelineData.isend=this.sgDetail.isend
//              }else{
//                this.$message.error(res.message)
//              }
//            })
//            .catch(err=>{console.log(JSON.stringify(err))})
//        }
        this.stepsData.lcLoading=true
        Promise.all([reqSbLc(parameter),reqSbLcTotal(parameter2)])
          .then((values)=>{
          const lcRes=values[0]
          const lcTotalRes=values[1]
          // const sgDetail=values[2]
          const errMessage=[]
          //设置流程名称
          if(lcRes.success){
            this.stepsData.steps=[]
            lcRes.data.forEach((item)=>{
              this.stepsData.steps.push({
                title:item.lcname,
                  auditstate:'',
                  audituser:'',
                  audittime:''
              })})
            this.stepsData.steps.push({title:'完成'})
          }else{
            errMessage.push(lcRes.message)
          }
          //设置上方总的流程节点信息
          if(lcTotalRes.success){
            const steps=this.stepsData.steps
            lcTotalRes.data.forEach((item,index)=>{
              if (index==0){
                steps[0].auditstate=' '
                steps[0].audituser='上报人：'+ item.__uaudituser.userName
                if (item.audittime){steps[0].audittime= moment(item.audittime).format('YYYY-MM-DD HH:mm')}
              }else{
                steps[index].auditstate=item.auditstate==1 ?'审核通过':item.auditstate==9 ?'审核不通过':'',
                steps[index].audituser='审核人：'+ item.__uaudituser.userName
                if (item.audittime){steps[index].audittime=  moment(item.audittime).format('YYYY-MM-DD HH:mm')}
              }
            })
            this.stepsData.lcLoading=false
          }else{
            errMessage.push(lcTotalRes.message)
          }
        })
          .catch(err=>{console.log(JSON.stringify(err))})

        //请求所有流程节点信息
        const parameter4={
          param1:this.$route.params.id,
          param2:this.$route.params.xbid
        }
        reqAllSbLc(parameter4)
          .then((res)=>{
            if(res.success){
              this.timelineData.timelines=[]
              res.data.forEach((item)=>{
                this.timelineData.timelines.push({
                  lcname:item.lcname,
                  id:item.id,
                  lcid:item.id,
                  lcsortnum:item.lcsortnum,
                  audituser:item.__uaudituser.userName ? item.__uaudituser.userName:'',
                  audittime:item.audittime ? moment(item.audittime).format('YYYY-MM-DD HH:mm'):'',
                  auditstate:item.lcsortnum=='1'? '上报':item.auditstate==1 ? '审核通过':item.auditstate==9 ? '审核不通过':'',
                  auditdesc:item.auditdesc ? item.auditdesc:'',
                  color:item.isend=='0'? 'blue':item.auditstate=='1'?'green':'red',
                  feedbacktime:item.feedbacktime ? moment(item.feedbacktime).format('YYYY-MM-DD HH:mm'):'',
                  feedbackuser:item.__ufeedbackuser.userName ?item.__ufeedbackuser.userName:'',
                  feedback:item.feedback?item.feedback:''
                })
                this.popoverVisible[item.lcsortnum]=false
                if (item.lcsortnum=='1'){}
              })
              if (this.timelineData.isend=='1'){this.timelineData.timelines.push({lcname:'已结束',auditstate:'',audituser:'',audittime:''})}
            }else{
              this.$message.error(res.message)
            }
          })
          .catch(err=>{console.log(JSON.stringify(err))})


        //请求流程设置人员
        const parameter5={}
        switch(this.sbData.lclevel){
          case '三级':
           parameter5.param3=1
              break
          case '二级':
            parameter5.param4=1
              break
        }
        this.reqShrList(parameter5)
      },
      onEdit(){
        this.modalOption.visible=true
      },
      showModal(lcid){
        this.feedback=''
        this.feedbackId=lcid
        this.modalOption.visible=true
      },
      modalCancel(){
        this.modalLoading=false
        this.modalOption.visible=false
      },
      closeEdit(){
        this.$refs.sgCommit.form.validateFields((err, values) => {
          if (!err) {
//            this.$notification['error']({
//              message: 'Received values of form:',
//              description: JSON.stringify(values)
//            })
            values.fssj=values.fssj.format('YYYY-MM-DD HH:mm')
            console.log(values.fssj)
            // debugger
            // if (values.sgdj) values.sgdj=this.selectOptions.sgdj.find(item=>item[1]==values.sgdj)[0]
            // if (values.sglx) values.sglx=this.selectOptions.sglx.find(item=>item[1]==values.sglx)[0]
            // if (values.shlb) values.shlb=this.selectOptions.shlb.find(item=>item[1]==values.shlb)[0]
            // if (values.sgxz) values.sgxz=this.selectOptions.sgxz.find(item=>item[1]==values.sgxz)[0]
            for(let key in this.sgDetail){
              for(let k in values){
                if (key==k){
                  this.sgDetail[key]=values[k]
                }
              }
            }
          }
          console.log(this.sgDetail.fssj)
          this.modalOption.visible=false
        })
      },
      toggleShenhe(){
        this.openShenhe=!this.openShenhe
      },
      addFeedback(){
        this.modalLoading=true
        const params={
          param1:this.feedbackId,
          param2:encodeURI(this.feedback)
        }
        addSgkbFeedback(params)
          .then((res)=>{
            if(res.success){
              this.$message.success('回复成功！')
              this.reqAll()
              this.modalCancel()
            }else{
              this.$message.error(res.message)
              this.modalLoading=false
            }
          })
          .catch(err=>{
            console.log(JSON.stringify(err))
            this.modalLoading=false
          })

      },
      postShenhe(type){
      this.shenheForm.validateFields((err, shenheValues) => {
        if (!err){
//          if (this.sgDetail.sgdj) this.sgDetail.sgdj=this.selectOptions.sgdj.find(item=>item[0]==this.sgDetail.sgdj)[1]
//          if (this.sgDetail.sglx) this.sgDetail.sglx=this.selectOptions.sglx.find(item=>item[0]==this.sgDetail.sglx)[1]
//          if (this.sgDetail.shlb) this.sgDetail.shlb=this.selectOptions.shlb.find(item=>item[0]==this.sgDetail.shlb)[1]
//          if (this.sgDetail.sgxz) this.sgDetail.sgxz=this.selectOptions.sgxz.find(item=>item[0]==this.sgDetail.sgxz)[1]
//          this.sgDetail.uptime=this.sgDetail.uptimeBF
//          delete this.sgDetail.uptimeBF
//          delete this.sgDetail.upuser

          this.$refs.sgCommit.form.validateFields((err, values) => {
            if (!err) {
//              debugger
              this.modalLoading=true
              values.jbtime=values.jbtime.format('YYYY-MM-DD HH:mm')
              values.fstime=values.fstime.format('YYYY-MM-DD HH:mm')
              values.id=this.$route.params.xbid !=0? this.sbData.idBf:this.sbData.id
              values.xbid=this.$route.params.xbid
              const tmp={...this.sbData}
              tmp.jbtime=values.jbtime
              tmp.fstime=values.fstime
              tmp.jbly=values.jbly
              tmp.jbms=values.jbms
              tmp.id=values.id
              delete tmp.key
              delete tmp.idBf

              const paramater={
                jsonData:encodeURI(JSON.stringify(tmp)),
                param1:encodeURI(shenheValues.spyj),
                param2:this.shjg,
                param3:shenheValues.shr
              }
              sgAudit(paramater)
                .then((res)=>{
                  if(res.success){
                    this.$message.success("审核成功！")
                    this.$router.go(-1)
                  }else{
                    this.$message.error(res.message)
                    this.modalLoading=false
                    this.reqAll()
                  }
                })
                .catch((err)=>{
                  console.log(JSON.stringify(err))
                  this.modalLoading=false
                })
            }
          })

        }})
      },
      endSg(){
        this.shenheForm.validateFields((err, shenheValues) => {
          if (!err){
//          if (this.sgDetail.sgdj) this.sgDetail.sgdj=this.selectOptions.sgdj.find(item=>item[0]==this.sgDetail.sgdj)[1]
//          if (this.sgDetail.sglx) this.sgDetail.sglx=this.selectOptions.sglx.find(item=>item[0]==this.sgDetail.sglx)[1]
//          if (this.sgDetail.shlb) this.sgDetail.shlb=this.selectOptions.shlb.find(item=>item[0]==this.sgDetail.shlb)[1]
//          if (this.sgDetail.sgxz) this.sgDetail.sgxz=this.selectOptions.sgxz.find(item=>item[0]==this.sgDetail.sgxz)[1]
//          this.sgDetail.uptime=this.sgDetail.uptimeBF
//          delete this.sgDetail.uptimeBF
//          delete this.sgDetail.upuser

            this.$refs.sgCommit.form.validateFields((err, values) => {
              if (!err) {
//              debugger
                this.modalLoading=true
                values.jbtime=values.jbtime.format('YYYY-MM-DD HH:mm')
                values.fstime=values.fstime.format('YYYY-MM-DD HH:mm')
                values.id=this.$route.params.xbid !=0? this.sbData.idBf:this.sbData.id
                values.xbid=this.$route.params.xbid
                const tmp={...this.sbData}
                tmp.jbtime=values.jbtime
                tmp.fstime=values.fstime
                tmp.jbly=values.jbly
                tmp.jbms=values.jbms
                tmp.id=values.id
                delete tmp.key
                delete tmp.idBf

                const paramater={
                  jsonData:encodeURI(JSON.stringify(tmp)),
                  param1:encodeURI(shenheValues.spyj),
                  param3:shenheValues.shr
                }
                sgEnd(paramater)
                  .then((res)=>{
                    if(res.success){
                      this.$message.success("关闭成功！")
                      this.$router.go(-1)
                    }else{
                      this.$message.error(res.message)
                      this.modalLoading=false
                      this.reqAll()
                    }
                  })
                  .catch((err)=>{
                    console.log(JSON.stringify(err))
                    this.modalLoading=false
                  })
              }
            })

          }})
      }
    }
  }
</script>
<style lang="scss">
  .sg-detail{
    height:100%;
    background-color: #f0f2f5;
    .ant-steps-horizontal:not(.ant-steps-label-vertical) .ant-steps-item-description {
      max-width: 180px;
      white-space: normal;
    }
    .ant-form-item{
      margin-bottom: 12px;
    }
    .ant-divider-horizontal{
      margin:12px 0
    }
  }
</style>