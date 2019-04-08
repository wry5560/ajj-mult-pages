<template>
  <div class="content-center">
    <a-spin  :spinning="pageLoading">
      <div v-show="!showData" style="width:1000px;display: inline-block">
        <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
          <div class="search-item">
            <span class="search-title">搜索类型：</span>
            <span class="search-input">
            <a-radio-group v-model="searchValues.type">
              <a-radio :value="1">企业列表</a-radio>
              <a-radio :value="2">排查列表</a-radio>
              <a-radio :value="3">隐患列表</a-radio>
            </a-radio-group>
          </span>
          </div>
          <div class="search-item">
            <span class="search-title">开始时间：</span>
            <span class="search-input">
              <a-date-picker style="width: 100%" v-model="searchValues.startTime" placeholder="请选择开始时间"></a-date-picker>
            </span>
          </div>
          <div class="search-item">
            <span class="search-title">截止时间：</span>
            <span class="search-input">
              <a-date-picker style="width: 100%" v-model="searchValues.endTime" placeholder="请选择截止时间"></a-date-picker>
            </span>
          </div>
        <div class="search-item">
          <span class="search-title">企业名称：</span>
          <span class="search-input">
            <a-input v-model="searchValues.qyname" placeholder="请输入企业名称"></a-input>
          </span>
        </div>
        <div class="search-item">
          <span class="search-title">企业地址：</span>
          <span class="search-input">
            <a-input v-model="searchValues.qydz" placeholder="请输入企业地址"></a-input>
          </span>
        </div>
        <div class="search-item">
          <span class="search-title">企业类型：</span>
          <span class="search-input">
            <a-cascader
              :options="selectOptions['企业类型']"
              style="width:100%"
              :loadData="selLoadData"
              placeholder="请选择企业类型"
              v-model="searchValues.qylx"
              changeOnSelect />
          </span>
        </div>
        <div class="search-item">
          <span class="search-title">国民经济类型：</span>
          <span class="search-input">
            <a-cascader
              :options="selectOptions['国民经济行业分类']"
              style="width:100%"
              :loadData="selGmjjLoadData"
              placeholder="请选择国名经济类型"
              v-model="searchValues.gmjjfl"
              changeOnSelect />
          </span>
        </div>
        <div class="search-item">
          <span class="search-title">工贸行业类型：</span>
          <span class="search-input">
            <a-select
              :options="selectOptions['安全监管行业']"
              style="width:100%"
              placeholder="请选择工贸行业类型"
              v-model="searchValues.gmhy"
              allowClear />
          </span>
        </div>
          <div class="search-item" v-if="searchValues.type==2">
            <span class="search-title">是否复查：</span>
            <span class="search-input">
              <a-radio-group v-model="searchValues.sffc">
                <a-radio :value="2">全部</a-radio>
                <a-radio :value="1">是</a-radio>
                <a-radio :value="0">否</a-radio>
              </a-radio-group>
            </span>
          </div>
          <div class="search-item" v-if="searchValues.type==2">
            <span class="search-title">复查是否完成：</span>
            <span class="search-input">
              <a-radio-group v-model="searchValues.fcsfwc">
                <a-radio :value="2">全部</a-radio>
                <a-radio :value="1">已完成</a-radio>
                <a-radio :value="0">未完成</a-radio>
              </a-radio-group>
            </span>
          </div>
          <div class="search-item" v-if="searchValues.type!=1">
            <span class="search-title">复查结果：</span>
            <span class="search-input">
              <a-radio-group v-model="searchValues.fcjg">
                <a-radio :value="1">全部</a-radio>
                <a-radio value="未整改">未整改</a-radio>
                <a-radio value="已整改">已整改</a-radio>
              </a-radio-group>
            </span>
          </div>
        <div style="text-align: right">
          <a-button type='primary' style="margin-right:8px" @click="search" >搜索</a-button>
          <a-button  style="margin-left: 5px"  @click="clearSearch">清除搜索项</a-button>
        </div>
      </a-card>
      </div>
      <div v-if="showData" style="text-align: left">
          <qiye-list @back="()=>showData=false" v-if="searchValues.type==1"></qiye-list>
          <qiye-jc-list @back="()=>showData=false" v-if="searchValues.type==2"></qiye-jc-list>
          <yinhuan-list @back="()=>showData=false" v-if="searchValues.type==3"></yinhuan-list>
      </div>
    </a-spin>
  </div>
</template>

<script>

  import QiyeList from './QiyeList'
  import QiyeJcList from './QiyeJcList'
  import YinhuanList from './YinhuanList'
  import moment from 'moment'
  import {GeneralQuerySelChildren} from '../api'

  const selOptions=['企业类型','国民经济行业分类','安全监管行业']          //选择项所需要的配置，localstorage中的配置名称
  const selOptionMutation='INIT_QUERY_QIYEJC_SELECTED_OPTIONS'   //将选择项配置保存到store的mutation方法名
  const getSelOpitons='query_qiyejc_selOptions'   //获取选择项的配置内容
  // const reqList='reqQiyeZichaQueryList'                   //查询列表
  const getList='query_qiyejc_list'                //获取table的list
//  const commitSearchMutation='INIT_QUERY_QIYEJC_SEARCHVALUES'                  //更新store内的搜索项数据
  const clearSearchMutation='CLEAR_QUERY_QIYEJC_SEARCHVALUES'                  //清除store内的搜索项数据
  export default {
    name:'qiyeJcQuery',
    components:{
      QiyeList,
      QiyeJcList,
      YinhuanList
    },

    data(){
      return{
        pageLoading:false,
        showData:false,
        searchValues:{
          startTime:null,
          endTime:null,
          qyname:'',
          qydz:'',
          qylx:[],
          gmjjfl:[],
          gmhy:undefined,
          sffc:2,
          fcsfwc:2,
          fcjg:1,
          type:1,
        },
        selectOptions:{},
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

    mounted(){
      this.$nextTick(function () {
        let _this=this
        // window.onresize = function(){
        //   _this.table.scrollSize.y=  _this.search.showAdvanced ? window.innerHeight - 190 :window.innerHeight - 112
        //   _this.modalOption.bodyStyle.height=window.innerHeight-80 + 'px'
        // }
        // document.getElementsByClassName('ant-table-body')[0].style.height=`${window.innerHeight}px`

        //初始化选择项,存入vuex相应store的state中
        const ls = JSON.parse(localStorage.getItem('/asrsajjdic'))

        const tmp=[]
        selOptions.forEach(item=>{tmp.push({name:item,value:ls[item],lable:item})})
        this.$store.commit(selOptionMutation,tmp)
        this.selectOptions=this.$store.getters[getSelOpitons]
        this.selectOptions['企业类型'].forEach((item)=>{
          item.isLeaf=false
          item.loading=false
        })
        this.selectOptions['国民经济行业分类'].forEach(item=>item.isLeaf=false)

        // const lsSearch=JSON.parse(localStorage.getItem('/asrsajjfixsearch'))['执法检查企业列表']
        // this.search.placeholder="请输入"+lsSearch["0"][0].dispNm+"..."
        // this.search.searchOption=lsSearch
      })
    },

    methods:{
      moment,
      //请求联级选择子选项
      selLoadData(selectedOptions){
        const targetOption = selectedOptions[selectedOptions.length - 1];
//          alert(JSON.stringify(selectedOptions))
//        debugger
        targetOption.loading=true
        const parameter ={
          param1 : targetOption.value
        }
        GeneralQuerySelChildren(parameter,0)
          .then((res)=>{
            if(res.success){
//              alert(JSON.stringify(res.data))
              targetOption.loading=false
              // this.search.advancedForm.selectLoading1=false
              targetOption.children=res.data
              targetOption.children.forEach((item)=>{
                item.value=item.VALUE
                delete item.VALUE
              })
              this.selectOptions["企业类型"]=[...this.selectOptions["企业类型"]]
            }else{
              this.$message.error(res.message)
            }
          })
          .catch((err)=>{JSON.stringify(err)})
      },
      selGmjjLoadData(selectedOptions){
        const targetOption = selectedOptions[selectedOptions.length - 1];
//          console.log(JSON.stringify(selectedOptions))

        // this.search.advancedForm.selectLoading1=true
        targetOption.loading=true
        const parameter ={
          param1 : targetOption.value
        }
        const type=selectedOptions.length
        GeneralQuerySelChildren(parameter,type)
          .then((res)=>{
            if(res.success){
//              alert(JSON.stringify(res.data))
              targetOption.loading=false
              // this.search.advancedForm.selectLoading1=false
              targetOption.children=res.data
              targetOption.children.forEach((item)=>{
                item.value=item.VALUE
                if (type != 3)item.isLeaf=false
                delete item.VALUE
              })
              this.selectOptions["国民经济行业分类"]=[...this.selectOptions["国民经济行业分类"]]
            }else{
              this.$message.error(res.message)
            }
          })
          .catch((err)=>{JSON.stringify(err)})
      },
      search(){
        const commitValues={
          param1:'9361'
        }
        let reqList=''
        let commitSearchMutation=''
        switch (this.searchValues.type) {
          case 1:
            if(this.searchValues.startTime)commitValues.param2=this.searchValues.startTime.format('YYYY-MM-DD')
            if(this.searchValues.endTime)commitValues.param3=this.searchValues.endTime.format('YYYY-MM-DD')
            if(this.searchValues.qyname!='')commitValues.param4=this.searchValues.qyname
            if(this.searchValues.qydz!='')commitValues.param5=this.searchValues.qydz
            if(this.searchValues.qylx.length>0)commitValues.param6=this.searchValues.qylx[0]
            if(this.searchValues.qylx.length>1)commitValues.param7=this.searchValues.qylx[1]
            if(this.searchValues.gmjjfl.length>0)commitValues.param8=this.searchValues.gmjjfl[0]
            if(this.searchValues.gmjjfl.length>1)commitValues.param9=this.searchValues.gmjjfl[1]
            if(this.searchValues.gmjjfl.length>2)commitValues.param10=this.searchValues.gmjjfl[2]
            if(this.searchValues.gmjjfl.length>3)commitValues.param11=this.searchValues.gmjjfl[3]
            if(this.searchValues.gmhy)commitValues.param12=this.searchValues.gmhy
            reqList='reqQiyeJcQueryList'
            commitSearchMutation='INIT_QUERY_QIYEJC_SEARCHVALUES'
                break
          case 2:
            // param1：安监二级部门
            // param2：企业编号
            // param3:开始时间
            // param4:结束时间
            // param5:是否复查
            // param6:复查是否完成
            // param7:有隐患
            // param8:复查结果 ‘已整改’‘未整改’
            // param9-param17 分别为：单位名称、单位地址、企业类型、企业类型2、国名经济类型、国名经济类型2、国名经济类型3、国名经济类型4、工贸行业类型
            if(this.searchValues.startTime)commitValues.param3=this.searchValues.startTime.format('YYYY-MM-DD')
            if(this.searchValues.endTime)commitValues.param4=this.searchValues.endTime.format('YYYY-MM-DD')
            if(this.searchValues.qyname!='')commitValues.param9=this.searchValues.qyname
            if(this.searchValues.qydz!='')commitValues.param10=this.searchValues.qydz
            if(this.searchValues.qylx.length>0)commitValues.param11=this.searchValues.qylx[0]
            if(this.searchValues.qylx.length>1)commitValues.param12=this.searchValues.qylx[1]
            if(this.searchValues.gmjjfl.length>0)commitValues.param13=this.searchValues.gmjjfl[0]
            if(this.searchValues.gmjjfl.length>1)commitValues.param14=this.searchValues.gmjjfl[1]
            if(this.searchValues.gmjjfl.length>2)commitValues.param15=this.searchValues.gmjjfl[2]
            if(this.searchValues.gmjjfl.length>3)commitValues.param16=this.searchValues.gmjjfl[3]
            if(this.searchValues.gmhy)commitValues.param17=this.searchValues.gmhy
            if(this.searchValues.sffc!=2)commitValues.param5=this.searchValues.sffj
            if(this.searchValues.fcsfwc!=2)commitValues.param6=this.searchValues.fcsfwc
            if(this.searchValues.fcjg!=1)commitValues.param8=this.searchValues.fcjg
            reqList='reqQiyeJcInfoList'
            commitSearchMutation='INIT_QUERY_QIYEJC_JCSEARCHVALUES'
            break
          case 3:
            if(this.searchValues.startTime)commitValues.param3=this.searchValues.startTime.format('YYYY-MM-DD')
            if(this.searchValues.endTime)commitValues.param4=this.searchValues.endTime.format('YYYY-MM-DD')
            if(this.searchValues.qyname!='')commitValues.param6=this.searchValues.qyname
            if(this.searchValues.qydz!='')commitValues.param7=this.searchValues.qydz
            if(this.searchValues.qylx.length>0)commitValues.param8=this.searchValues.qylx[0]
            if(this.searchValues.qylx.length>1)commitValues.param9=this.searchValues.qylx[1]
            if(this.searchValues.gmjjfl.length>0)commitValues.param103=this.searchValues.gmjjfl[0]
            if(this.searchValues.gmjjfl.length>1)commitValues.param11=this.searchValues.gmjjfl[1]
            if(this.searchValues.gmjjfl.length>2)commitValues.param12=this.searchValues.gmjjfl[2]
            if(this.searchValues.gmjjfl.length>3)commitValues.param13=this.searchValues.gmjjfl[3]
            if(this.searchValues.gmhy)commitValues.param14=this.searchValues.gmhy
            if(this.searchValues.fcjg!=1)commitValues.param5=this.searchValues.fcjg
            reqList='reqQiyeJcYinhuanList'
            commitSearchMutation='INIT_QUERY_QIYEJC_YHSEARCHVALUES'
            break
        }
        this.$store.commit(commitSearchMutation,commitValues)
        this.pageLoading=true
        // commitValues.start=0
        // commitValues.limit=30
        this.$store.dispatch(reqList,commitValues)
          .then((res)=>{
            if(res.success){
             if(res.data.length>0){
               this.pageLoading=false
               this.showData=true
             }else{
               this.$error({
                 title:"没有符合要求的结果！",
                 content:"请重新设置搜索条件！"
               })
               this.pageLoading=false
             }
            }else{
              this.$message.error(res.message)
              this.pageLoading=false
            }
          })
          .catch(err=>{
            console.log(JSON.stringify(err))
            this.pageLoading=false
          })
            },
      clearSearch(){
        this.searchValues={
          startTime:null,
          endTime:null,
          qyname:'',
          qydz:'',
          qylx:[],
          gmjjfl:[],
          gmhy:undefined,
          sffc:this.searchValues.sffc,
          fcsfwc:this.searchValues.fcsfwc,
          fcjg:this.searchValues.fcjg,
          type:this.searchValues.type
        }
        this.$store.commit(clearSearchMutation)
      },
      back(){
       this.showData=false
      }
    }
  }
</script>
<style lang="scss" scoped>
.search-item{
  margin-bottom: 24px;
  .search-title{
    display: inline-block;
    width:200px;
    text-align: right;
  }
  .search-input{
    display: inline-block;
    width: calc(100% - 200px);
    text-align: left;
  }
}
</style>