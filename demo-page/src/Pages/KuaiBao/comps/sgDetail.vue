<template>
  <div class="sg-detail">
    <div  class="header-buttons-bar">
      <a-button @click="goBack" :style="{'margin-right':'5px','float':'right'}">返 回</a-button>
      <!--<a-button @click="" type="primary":style="{'margin-right':'5px','float':'right'}">续 报</a-button>-->
      <div style="clear: both"></div>
    </div>
    <div style="padding:0px 16px;overflow: auto">
      <a-card style="margin-top: 16px":bordered="false" title="流程进度">
        <a-steps  :current="currentStep">
          <a-step v-for="step in this.stepsData.steps" :title="step.title" >
            <span slot="description">
              <div>{{step.info.auditstate}}</div>
              <div>{{step.info.audituser}}</div>
              <div>{{step.info.audittime}}</div>
            </span>
          </a-step>
        </a-steps>
      </a-card>
      <a-row :gutter="16" style="margin-top: 12px">
        <a-col :lg="6">
          <a-card :bordered="false">
            <a-timeline>
              <a-timeline-item v-for="timeline in this.timelineData.timelines">{{timeline.auditstate+timeline.audituser+timeline.audittime}}</a-timeline-item>
            </a-timeline>
          </a-card>
        </a-col>
        <a-col :lg="18">
          <a-card :bordered="false" >
            <div slot="title">事故名称:{{this.sgDetail.sgnm}}</div>
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
  </div>
</template>

<script>
  import ATimeline from "ant-design-vue/es/timeline/Timeline";
  import ATimelineItem from "ant-design-vue/es/timeline/TimelineItem";
  import DetailList from './DetailList.vue'
  import  DetailListItem from './DetailListItem.vue'
  import {reqKuaiBaoDetail,reqKuaiBaoList,reqAllSbLc,reqSbLcTotal,reqSbLc} from '../api'
  import moment from 'moment'

  export default {
    components: {ATimelineItem, ATimeline,DetailList,DetailListItem },
    name:"sgDetail",
    data(){
        return {
          stepsData:{
            current:2,
            steps:[
              {title:'',info:{auditstate:'',audituser:'',audittime:''}}
              {title:'',info:{auditstate:'',audituser:'',audittime:''}}
              {title:'',info:{auditstate:'',audituser:'',audittime:''}}
              {title:'',info:{auditstate:'',audituser:'',audittime:''}}
              {title:'完成',info:{auditstate:'',audituser:'',audittime:''}}
            ],
          },
          timelineData:{
            isend:1,
            timelines:[
              {lcid:1,audituser:'XXX',auditstate:'上报',audittime:'2019-01-18 14:00'},
              {lcid:2,audituser:'XXX',auditstate:'通过',audittime:'2019-01-18 14:00'},
              {lcid:3,audituser:'XXX',auditstate:'不通过',audittime:'2019-01-18 14:00'},
              {lcid:2,audituser:'XXX',auditstate:'通过',audittime:'2019-01-18 14:00'},
              {lcid:3,audituser:'XXX',auditstate:'通过',audittime:'2019-01-18 14:00'},
              {lcid:4,audituser:'XXX',auditstate:'通过',audittime:'2019-01-18 14:00'}
            ],
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
      this.getDetail()
      this.reqLc()
      this.getLc()
      this.getLcDetail()
    },
    methods:{
      goBack(){
        this.$router.go(-1)
      },
      getDetail(){
        if (this.$route.params.xbid==0){
          const parameter={
            param1:sys_relateDepId2,
            param2:1,
            param4:this.$route.params.id
          }
          reqKuaiBaoDetail(parameter)
            .then((res)=>{
              if(res.success){
                this.sgDetail=res.data[0]
                this.sgDetail.upuser=res.data[0].__upuser.userName
                const ls = JSON.parse(localStorage.getItem('/asrsajjdic'))
                this.sgDetail.sgdj=ls["事故等级"].find(item =>item.value==this.sgDetail.sgdj).label
                this.sgDetail.sgxz=ls["事故性质"].find(item =>item.value==this.sgDetail.sgxz).label
                this.sgDetail.shlb=ls["事故伤害类型"].find(item =>item.value==this.sgDetail.shlb).label
                this.sgDetail.sglx=ls["事故类型"].find(item =>item.value==this.sgDetail.sglx).label
                this.sgDetail.fssj=moment(this.sgDetail.fssj).format('YYYY-MM-DD HH:MM')
                this.sgDetail.uptime=moment(this.sgDetail.uptime).format('YYYY-MM-DD HH:MM')
//                this.stepsData.current= this.sgDetail.dqlc
//                this.sgDetail.
              }else{
                this.$message.error(res.message)
              }
            }).catch((err)=>{
            console.log(JSON.stringify(err))
          })
        }else{
          const parameter={
            param1:sys_relateDepId2,
            param6:this.$route.params.id,
          }
          reqKuaiBaoList(parameter)
            .then((res)=>{
              if(res.success){
                this.sgDetail=res.data.find(item => item.xbid==this.$route.params.xbid)
                this.sgDetail.upuser=this.sgDetail.__upuser.userName
                const ls = JSON.parse(localStorage.getItem('/asrsajjdic'))
                this.sgDetail.sgdj=ls["事故等级"].find(item =>item.value==this.sgDetail.sgdj).label
                this.sgDetail.sgxz=ls["事故性质"].find(item =>item.value==this.sgDetail.sgxz).label
                this.sgDetail.shlb=ls["事故伤害类型"].find(item =>item.value==this.sgDetail.shlb).label
                this.sgDetail.sglx=ls["事故类型"].find(item =>item.value==this.sgDetail.sglx).label
                this.sgDetail.fssj=moment(this.sgDetail.fssj).format('YYYY-MM-DD HH:MM')
                this.sgDetail.uptime=moment(this.sgDetail.xbtime).format('YYYY-MM-DD HH:MM')
              }else{
                this.$message.error(res.message)
              }
            }).catch((err)=>{
            console.log(JSON.stringify(err))
          })
        }
      },
      reqLc(){
        const  parameter={
          param1:sys_relateDepId2,
        }
        reqSbLc(parameter)
          .then((res)=>{
            if(res.success){
              res.data.forEach((item)=>{this.stepsData.steps.push({
                title:item.lcname,
                info:{
                  auditstate:'',
                  audituser:'',
                  audittime:''
                }})})
              this.stepsData.steps.push({title:'完成'})
            }else{
              this.$message.error(res.message)
            }
          }).catch(err=>{})
      },
      getLc(){
        const  parameter={
          param1:sys_relateDepId2,
          param2:this.$route.params.id,
          param3:this.$route.params.xbid
        }
        reqSbLcTotal(parameter)
          .then((res)=>{
            if(res.success){
              res.data.forEach((item,index)=>{
                  if (index==0){
                    this.stepsData.steps[index].info={
//                      auditstate:'上报',
//                      audituser:`上报人：${item.audituser}`,
//                      audittime:`上报时间：${memoent(item.audittime).format('YYYY-MM-DD HH:MM')}`
                    }
                  }else{
                    this.stepsData.steps[index].info={
//                      auditstate:item.auditstate==1 ?'审核通过':item.auditstate==9 ?'审核不通过':null,
//                      audituser:`审核人：${item.audituser}`,
//                      audittime:`审核时间：${memoent(item.audittime).format('YYYY-MM-DD HH:MM')}`
                    }
                  }
              })
            }else{
              this.$message.error(res.message)
            }
          }).catch(err=>{})
      },
      getLcDetail(){
        const parameter={
          param1:sys_relateDepId2,
          param2:this.$route.params.id,
          param3:this.$route.params.xbid
        }
        reqAllSbLc(parameter)
          .then((res)=>{
            if(res.success){
              this.$message.success('成功')
            }else{
              this.$message.error(res.message)
            }
          }).catch((err)=>{
          console.log(JSON.stringify(err))
        })
      },
    }
  }
</script>
<style lang="scss">
  .sg-detail{
    background-color: #f0f2f5;
  }
</style>