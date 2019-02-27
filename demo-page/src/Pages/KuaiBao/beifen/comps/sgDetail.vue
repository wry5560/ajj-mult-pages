<template>
  <div class="sg-detail">
    <div  class="header-buttons-bar">
      <a-button @click="goBack" :style="{'margin-right':'5px','float':'right'}">返 回</a-button>
      <a-button @click="reqAll" :style="{'margin-right':'5px','float':'right'}">刷 新</a-button>
      <!--<a-button @click="" type="primary":style="{'margin-right':'5px','float':'right'}">续 报</a-button>-->
      <div style="clear: both"></div>
    </div>
    <div style="padding:0px 16px;overflow: auto">
      <a-card style="margin-top: 16px":bordered="false" title="流程进度">
        <div v-if="stepsData.lcLoading" style="height: 95px; text-align: center;padding-top: 40px"><a-spin /></div>
        <a-steps v-if="!stepsData.lcLoading" :current="currentStep" style="height: 95px">
          <a-step v-for="(step,index) in stepsData.steps" :title="step.title" >
            <span v-if="step.auditstate!=''||index==0" slot="description">
              <div>{{step.auditstate}}</div>
              <div>{{step.audituser}}</div>
              <div>{{step.audittime}}</div>
            </span>
          </a-step>
        </a-steps>
      </a-card>
      <a-row :gutter="16" style="margin-top: 12px">
        <a-col :lg="6">
          <a-card :bordered="false">
            <a-timeline>
              <a-timeline-item v-for="timeline in this.timelineData.timelines":color="timeline.color">
                <div><span style="width: 120px;display: inline-block">{{timeline.lcname}}</span><span>{{timeline.auditstate}}</span></div>
                <div><span style="width: 120px;display: inline-block">{{timeline.audituser}}</span><span >{{timeline.audittime}}</span></div>
                <div>{{timeline.auditdesc}}</div>
              </a-timeline-item>
            </a-timeline>
          </a-card>
        </a-col>
        <a-col :lg="18">
          <a-card :bordered="false" >
            <div slot="title">
              <span>事故名称:{{this.sgDetail.sgnm}}</span>
              <span v-if="this.$route.params.isShenhe=='true'" style="display: inline-block;float: right">
                <a-button size="small"style="margin-right: 8px" @click="onEdit">编 辑</a-button>
                <a-button size="small" type="primary"@click="toggleShenhe">审 核</a-button>
              </span>
            </div>
            <div class="shenhe" v-if="openShenhe">
              <a-form  :form="shenheForm" ref="shenheCommit">
                <a-form-item label="审批意见" :labelCol="{ span: 3 }" :wrapperCol="{ span: 21 }">
                  <a-textarea size="small" placeholder="请输入审批意见(必填项）" :autosize="{ minRows: 2, maxRows: 6 }"v-decorator="['spyj',{rules: [{ required: true, message: '请输入审批意见', whitespace: true}]}]" />
                </a-form-item>
              </a-form>
              <span style="display: inline-block;float: right;">
                <a-popconfirm title="审核通过后将无法修改，您确认此操作吗？" @confirm="postShenhe(1)"  okText="Yes" cancelText="No">
                  <a-button type="primary" size="small" style="margin-right: 6px">通 过</a-button>
                </a-popconfirm>
                <a-popconfirm title="审核不通过后将将无法修改，您确认此操作吗？" @confirm="postShenhe(9)" okText="Yes" cancelText="No">
                  <a-button size="small">不通过</a-button>
                </a-popconfirm>
              </span>
              <div style="clear: both"></div>
              <a-divider ></a-divider>
             </div>
            <detail-list  size="small">
              <detail-list-item term="事故编号">{{this.sgDetail.xbid==0 ? this.sgDetail.id : (this.sgDetail.id + this.sgDetail.xbid)}}</detail-list-item>
              <detail-list-item term="上报时间">{{this.sgDetail.uptime}}</detail-list-item>
            </detail-list>
            <detail-list size="small">
              <detail-list-item term="上报人员">{{this.sgDetail.upuser}}</detail-list-item>
              <detail-list-item term="报送单位">{{this.sgDetail.bsdw}}</detail-list-item>
            </detail-list>
            <detail-list size="small">
              <detail-list-item term="发生时间">{{this.sgDetail.fssj}}</detail-list-item>
              <detail-list-item term="事故区域">{{this.sgDetail.qy}}</detail-list-item>
              <detail-list-item term="发生单位">{{this.sgDetail.sgfsdw}}</detail-list-item>
            </detail-list>
            <detail-list size="small">
              <detail-list-item term="事故地址">{{this.sgDetail.sgdwdz}}</detail-list-item>
              <detail-list-item term="发生地点">{{this.sgDetail.sgfsd}}</detail-list-item>
            </detail-list>
              <detail-list size="small">
                <detail-list-item term="行业分类">{{this.sgDetail.hy}}</detail-list-item>
                <detail-list-item term="管理分类">{{this.sgDetail.glfl}}</detail-list-item>
              </detail-list>
              <detail-list size="small">
                <detail-list-item term="监理单位">{{this.sgDetail.jldw}}</detail-list-item>
                <detail-list-item term="建设单位">{{this.sgDetail.jsdw}}</detail-list-item>
              </detail-list>
            <detail-list size="small">
              <detail-list-item term="事故等级">{{this.sgDetail.sgdj}}</detail-list-item>
              <detail-list-item term="事故性质">{{this.sgDetail.sgxz}}</detail-list-item>
            </detail-list>
              <detail-list size="small">
                <detail-list-item term="死亡人数">{{this.sgDetail.swrs}}人</detail-list-item>
                <detail-list-item term="受伤人数">{{this.sgDetail.ssrs}}人</detail-list-item>
              </detail-list>
              <detail-list size="small">
                <detail-list-item term="重伤人数">{{this.sgDetail.zsrs}}人</detail-list-item>
                <detail-list-item term="涉险人数">{{this.sgDetail.sxrs}}人</detail-list-item>
              </detail-list>
              <detail-list size="small">
                <detail-list-item term="失踪人数">{{this.sgDetail.szrs}}人</detail-list-item>
                <detail-list-item term="直接经济损失">{{this.sgDetail.jjss}}元</detail-list-item>
              </detail-list>
              <detail-list size="small">
                <detail-list-item term="事故类型">{{this.sgDetail.sglx}}<a-divider type="vertical" />{{this.sgDetail.sglx2}}</detail-list-item>
                <detail-list-item term="伤害类别">{{this.sgDetail.shlb}}</detail-list-item>
              </detail-list>

            <detail-list size="small">
              <detail-list-item term="事故简况" :lg="24">{{this.sgDetail.sgjk}}</detail-list-item>
              <detail-list-item term="事故原因":lg="24">{{this.sgDetail.sgyy}}</detail-list-item>
              <detail-list-item term="采取措施":lg="24">{{this.sgDetail.cqcs}}</detail-list-item>
              <detail-list-item term="处理结果":lg="24">{{this.sgDetail.cljg}}</detail-list-item>
              <detail-list-item term="备注":lg="24">{{this.sgDetail.bz}}</detail-list-item>
            </detail-list>
          </a-card>
        </a-col>
      </a-row>
    </div>
    <a-modal
      title="编 辑"
      okText="保 存"
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
      <sg-form sbType="sh" :sbData="sgDetail" :selectOptions="selectOptions" ref="sgCommit" :showSubmit="false"></sg-form>
      <template slot="footer">
        <a-button key="back" @click="modalCancel">返 回</a-button>
        <a-button  key="submit" type="primary" :loading="modalOption.commitLoading" @click="closeEdit">修改完成</a-button>
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
  import {reqKuaiBaoDetail,reqKuaiBaoList,reqAllSbLc,reqSbLcTotal,reqSbLc,sgAudit} from '../api'
  import moment from 'moment'

  export default {
    moment,
    components: {ATimelineItem, ATimeline,DetailList,DetailListItem,SgForm },
    name:"sgDetail",
    data(){
        return {
          openShenhe:false,
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
          if (this.sgDetail.isend==1){
            return 5
          }else{
            return this.stepsData.steps.findIndex(item=>item.title==this.sgDetail.lcname)
          }
      }
    },
    created(){
      this.reqAll()
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
      goBack(){
        this.$router.go(-1)
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
        //请求事故详情
        let parameter3={}
        if (this.$route.params.xbid==0) {
          parameter3 = {
            param1: sys_relateDepId2,
            param2: 1,
            param4: this.$route.params.id
          }
          reqKuaiBaoDetail(parameter3)
            .then((res)=>{
              //设置事故详情
              if(res.success){
//                 debugger
                  this.sgDetail=res.data[0]
                  this.sgDetail.upuser=res.data[0].__upuser.userName
                  const ls = JSON.parse(localStorage.getItem('/asrsajjdic'))
                  this.sgDetail.sgdj=this.sgDetail.sgdj ? ls["事故等级"].find(item =>item.value==this.sgDetail.sgdj).label :''
                  this.sgDetail.sgxz=this.sgDetail.sgxz ? ls["事故性质"].find(item =>item.value==this.sgDetail.sgxz).label :''
                  this.sgDetail.shlb=this.sgDetail.shlb ? ls["事故伤害类型"].find(item =>item.value==this.sgDetail.shlb).label :''
                  this.sgDetail.sglx=this.sgDetail.sglx ? ls["事故类型"].find(item =>item.value==this.sgDetail.sglx).label :''
                  this.sgDetail.fssj=moment(this.sgDetail.fssj).format('YYYY-MM-DD HH:mm')
                  this.sgDetail.uptimeBF=moment(this.sgDetail.uptime).format('YYYY-MM-DD HH:mm')
                  this.sgDetail.uptime=moment(this.sgDetail.uptime).format('YYYY-MM-DD HH:mm')
                  this.timelineData.isend=this.sgDetail.isend
              }else{
                this.$message.error(res.message)
              }
            })
            .catch(err=>{console.log(JSON.stringify(err))})
        }else{
          parameter3={
            param1:sys_relateDepId2,
            param6:this.$route.params.id,
          }
          reqKuaiBaoList(parameter3)
            .then((res)=>{
              if(res.success){
                // debugger
                this.sgDetail=res.data.find(item => item.xbid==this.$route.params.xbid)
                this.sgDetail.idBf= this.sgDetail.id
                this.sgDetail.id='续'+this.sgDetail.id
                this.sgDetail.upuser=this.sgDetail.__upuser.userName
                const ls = JSON.parse(localStorage.getItem('/asrsajjdic'))
                this.sgDetail.sgdj=this.sgDetail.sgdj ? ls["事故等级"].find(item =>item.value==this.sgDetail.sgdj).label :''
                this.sgDetail.sgxz=this.sgDetail.sgxz ? ls["事故性质"].find(item =>item.value==this.sgDetail.sgxz).label :''
                this.sgDetail.shlb=this.sgDetail.shlb ? ls["事故伤害类型"].find(item =>item.value==this.sgDetail.shlb).label :''
                this.sgDetail.sglx=this.sgDetail.sglx ? ls["事故类型"].find(item =>item.value==this.sgDetail.sglx).label :''
                this.sgDetail.fssj=moment(this.sgDetail.fssj).format('YYYY-MM-DD HH:mm')
                this.sgDetail.uptimeBF=moment(this.sgDetail.uptime).format('YYYY-MM-DD HH:mm')
                this.sgDetail.uptime=moment(this.sgDetail.xbtime).format('YYYY-MM-DD HH:mm')
                this.sgDetail.xbtime=moment(this.sgDetail.xbtime).format('YYYY-MM-DD HH:mm')
                this.timelineData.isend=this.sgDetail.isend
              }else{
                this.$message.error(res.message)
              }
            })
            .catch(err=>{console.log(JSON.stringify(err))})
        }
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
                  audituser:item.__uaudituser.userName ? item.__uaudituser.userName:'',
                  audittime:item.audittime ? moment(item.audittime).format('YYYY-MM-DD HH:mm'):'',
                  auditstate:item.lcsortnum=='1'? '上报':item.auditstate==1 ? '审核通过':item.auditstate==9 ? '审核不通过':'',
                  auditdesc:item.auditdesc ? item.auditdesc:'',
                  color:item.isend=='0'? 'blue':item.auditstate=='1'?'green':'red'
                })
                if (item.lcsortnum=='1'){}
              })
              if (this.timelineData.isend=='1'){this.timelineData.timelines.push({lcname:'已结束',auditstate:'',audituser:'',audittime:''})}
            }else{
              this.$message.error(res.message)
            }
          })
          .catch(err=>{console.log(JSON.stringify(err))})
      },
      onEdit(){
        this.modalOption.visible=true
      },
      modalCancel(){
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

      postShenhe(type){
      this.shenheForm.validateFields((err, values) => {
        if (!err){
          if (this.sgDetail.sgdj) this.sgDetail.sgdj=this.selectOptions.sgdj.find(item=>item[0]==this.sgDetail.sgdj)[1]
          if (this.sgDetail.sglx) this.sgDetail.sglx=this.selectOptions.sglx.find(item=>item[0]==this.sgDetail.sglx)[1]
          if (this.sgDetail.shlb) this.sgDetail.shlb=this.selectOptions.shlb.find(item=>item[0]==this.sgDetail.shlb)[1]
          if (this.sgDetail.sgxz) this.sgDetail.sgxz=this.selectOptions.sgxz.find(item=>item[0]==this.sgDetail.sgxz)[1]
          this.sgDetail.uptime=this.sgDetail.uptimeBF
          delete this.sgDetail.uptimeBF
          delete this.sgDetail.upuser
          const paramater={
            jsonData:JSON.stringify(this.sgDetail),
            param1:values.spyj,
            param2:type
          }
          sgAudit(paramater)
            .then((res)=>{
              if(res.success){
                this.$message.success("审核成功！")
                this.$router.go(-1)
              }else{
                this.$message.error(res.message)
                this.reqAll()
              }
            })
            .catch((err)=>console.log(JSON.stringify(err)))
        }})
      }
    }
  }
</script>
<style lang="scss">
  .sg-detail{
    background-color: #f0f2f5;
    .ant-steps-horizontal:not(.ant-steps-label-vertical) .ant-steps-item-description {
      max-width: 180px;
      white-space: normal;
    }
  }
</style>