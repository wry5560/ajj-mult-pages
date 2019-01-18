<template>
  <div class="sg-detail">
    <div  class="header-buttons-bar">
      <a-button @click="gotoIndex" :style="{'margin-right':'5px','float':'right'}">返 回</a-button>
      <!--<a-button @click="" type="primary":style="{'margin-right':'5px','float':'right'}">续 报</a-button>-->
      <div style="clear: both"></div>
    </div>
    <div>
      <a-card style="margin-top: 12px":bordered="false" title="流程进度">
        <a-steps  :current="stepsData.current">
          <a-step v-for="step in this.stepsData.steps" :title="step.title" >
            <span slot="description">{{step.info}}</span>
          </a-step>
        </a-steps>
      </a-card>

      <a-card style="margin-top: 12px;margin-right: 12px":bordered="false">
        <a-timeline>
          <a-timeline-item v-for="timeline in this.timelineData.timelines">{{timeline.auditstate+timeline.audituser+timeline.audittime}}</a-timeline-item>
        </a-timeline>
      </a-card>
    </div>
  </div>
</template>

<script>
  import ATimeline from "ant-design-vue/es/timeline/Timeline";
  import ATimelineItem from "ant-design-vue/es/timeline/TimelineItem";
  export default {
    components: {ATimelineItem, ATimeline}, name:"sgDetail",
    data(){
        return {
          stepsData:{
            current:2,
            steps:[
              {title:'上报',info:'提交人：许工  提交时间：2019-01-18 14：00'},
              {title:'组长审核',info:'审核人：徐组长  审核时间：2019-01-18 15：00'},
              {title:'副局长审核',info:'待审核'},
              {title:'局长审核',info:''}
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
          }
        }
      },
    methods:{
      gotoIndex(){
        this.$router.push('/')
      }
    }
  }
</script>