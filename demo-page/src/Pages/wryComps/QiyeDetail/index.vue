<template>
    <div>
      <div style="">
        <a-menu
          v-model="current"
          mode="horizontal"
          style="padding-left: 30px"
          @select="selectMenuItem"
        >
          <a-sub-menu key='企业户籍'@titleClick="titleClick">
            <span slot="title" class="">企业户籍</span>
            <a-menu-item key="基本信息">基本信息</a-menu-item>
            <a-menu-item key="安全生产信息登记">安全生产信息登记</a-menu-item>
            <a-menu-item key="安全生产负责人">安全生产负责人</a-menu-item>
            <a-menu-item key="安全生产管理制度">安全生产管理制度</a-menu-item>
            <a-menu-item key="企业证照管理">企业证照管理</a-menu-item>
            <a-menu-item key="变更信息管理">变更信息管理</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key='岗位及人员'@titleClick="titleClick">
            <span slot="title" class="">岗位及人员</span>
            <a-menu-item key="岗位管理">岗位管理</a-menu-item>
            <a-menu-item key="人员管理">人员管理</a-menu-item>
            <a-menu-item key="持证人员">持证人员</a-menu-item>
            <a-menu-item key="岗位清单">岗位清单</a-menu-item>
            <a-menu-item key="培训管理">培训管理</a-menu-item>
          </a-sub-menu>
          <a-sub-menu  key='职业卫生'@titleClick="titleClick">
            <span slot="title" class="">职业卫生</span>
            <a-menu-item key="职业卫生信息">职业卫生信息</a-menu-item>
            <a-menu-item key="职业病危害因素分布">职业病危害因素分布</a-menu-item>
            <a-menu-item key="职业健康监护">职业健康监护</a-menu-item>
            <a-menu-item key="检测报告登记">检测报告登记</a-menu-item>
          </a-sub-menu>
          <a-sub-menu  key='应急管理'@titleClick="titleClick">
            <span slot="title" class="">应急管理</span>
            <a-menu-item key="应急预案管理">应急预案管理</a-menu-item>
            <a-menu-item key="应急演练管理">应急演练管理</a-menu-item>
          </a-sub-menu>
          <a-sub-menu  key='隐患排查'@titleClick="titleClick">
            <span slot="title" class="">隐患排查</span>
            <a-menu-item key="排查清单">排查清单</a-menu-item>
            <a-menu-item key="隐患记录">隐患记录</a-menu-item>
          </a-sub-menu >

          <a-menu-item key="危险品">危险品</a-menu-item>
          <a-menu-item key="特殊作业">特殊作业</a-menu-item>
          <a-menu-item key="监管人员检查记录">监管检查记录</a-menu-item>

          <!--<a-menu-item key="alipay">-->
          <!--<a href="https://ant.design" target="_blank" rel="noopener noreferrer">Navigation Four - Link</a>-->
          <!--</a-menu-item>-->
          <a-button size="small" @click="() => this.$emit('return')" style="float: right;margin-top: 12px;margin-right: 16px">返回</a-button>
        </a-menu>
      </div>
      <div style="">
        <qiye-huji v-if="isCurrent=='qiyehuji'" :anchor="current[0]" :qyId="QiyeId"/>
        <gangwei-renyuan v-if="isCurrent=='gangweirenyuan'":anchor="current[0]" :qyId="QiyeId"/>
        <jianguan-jiancha v-if="isCurrent=='jianguanjiancha'":anchor="current[0]" :qyId="QiyeId"/>
        <teshuzuoye v-if="isCurrent=='teshuzuoye'":anchor="current[0]" :qyId="QiyeId"/>
        <weixianpin v-if="isCurrent=='weixianpin'":anchor="current[0]" :qyId="QiyeId"/>
        <yinghuan-paicha v-if="isCurrent=='yinhuanpaicha'":anchor="current[0]" :qyId="QiyeId"/>
        <yingji v-if="isCurrent=='yingji'" :anchor="current[0]" :qyId="QiyeId"/>
        <zhiye-weisheng v-if="isCurrent=='zhiyeweisheng'" :anchor="current[0]" :qyId="QiyeId" :recordId="recordId"/>
      </div>
    </div>
</template>

<script>
  import QiyeHuji from './QiyeHuji/QiyeHuji'
  import GangweiRenyuan from './GangweiRenyuan/GangweiRenyuan'
  import JianguanJiancha from './Jianguanjiancha/JianguanJiancha'
  import Teshuzuoye from './Teshuzuoye/Teshuzuoye'
  import Weixianpin from './Weixianpin/Weixianpin'
  import YinghuanPaicha from './YinhuanPaicha/YinghuanPaicha'
  import Yingji from './Yingji/Yingji'
  import ZhiyeWeisheng from './ZhiyeWeisheng/ZhiyeWeisheng'

    export default {
      name: "QiyeDetail",
      components:{QiyeHuji, GangweiRenyuan, JianguanJiancha,Teshuzuoye,Weixianpin,YinghuanPaicha,Yingji,ZhiyeWeisheng},
      props:{
        QiyeId:[String,Number],
        recordId:[String,Number],
      },
      data(){
          return{
            current:['基本信息'],
            menus:{
              qiyehuji:['基本信息','安全生产信息登记','安全生产负责人','安全生产管理制度','企业证照管理','变更信息管理'],
              gangweirenyuan:['岗位管理','人员管理','持证人员','岗位清单','培训管理'],
              zhiyeweisheng:['职业卫生信息','职业病危害因素分布','职业健康监护','检测报告登记'],
              yingji:['应急预案管理','应急演练管理'],
              yinhuanpaicha:['排查清单','隐患记录'],
              weixianpin:['危险品'],
              teshuzuoye:['特殊作业'],
              jianguanjiancha:['监管人员检查记录'],
            }
          }
      },
      computed:{
        isCurrent(){
          let isCurrent=''
          for (let key in this.menus){
            isCurrent = this.menus[key].findIndex(item => item==this.current[0])>-1 ? key:isCurrent
          }
          return isCurrent
        }
      },
      methods:{
        titleClick({key,domEvent }){
          switch (key) {
            case '企业户籍':
              this.current=['基本信息']
              break
            case '岗位及人员':
              this.current=['岗位管理']
              break
            case '职业卫生':
              this.current=['职业卫生信息']
              break
            case '应急管理':
              this.current=['应急预案管理']
              break
            case '隐患排查':
              this.current=['排查清单']
              break
          }
        },
        selectMenuItem({ item, key, selectedKeys }){
        },
      }
    }
</script>

<style scoped>

</style>