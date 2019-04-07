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
              <a-date-picker style="width: 100%" v-model="searchValues.param1" placeholder="请选择开始时间"></a-date-picker>
            </span>
          </div>
          <div class="search-item">
            <span class="search-title">截止时间：</span>
            <span class="search-input">
              <a-date-picker style="width: 100%" v-model="searchValues.param2" placeholder="请选择截止时间"></a-date-picker>
            </span>
          </div>
        <div class="search-item">
          <span class="search-title">企业名称：</span>
          <span class="search-input">
            <a-input v-model="searchValues.param3" placeholder="请输入企业名称"></a-input>
          </span>
        </div>
        <div class="search-item">
          <span class="search-title">企业地址：</span>
          <span class="search-input">
            <a-input v-model="searchValues.param4" placeholder="请输入企业地址"></a-input>
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
              v-model="searchValues.param5"
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
              v-model="searchValues.param6"
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
              v-model="searchValues.param7"
              allowClear />
          </span>
        </div>

        <div style="text-align: right">
          <a-button type='primary' style="margin-right:8px" @click="search" >搜索</a-button>
          <a-button  style="margin-left: 5px"  @click="clearSearch">清除搜索项</a-button>
        </div>
      </a-card>
      </div>
      <div v-if="showData" style="text-align: left">
        <div  class="header-buttons-bar" style="padding-left: 5px">
          <a-button @click="back"size="small">返回</a-button>
          <qiye-list v-if="searchValues.type==1"></qiye-list>
          <qiye-zicha-list v-if="searchValues.type==2"></qiye-zicha-list>
          <yinhuan-list v-if="searchValues.type==3"></yinhuan-list>
        </div>
      </div>
    </a-spin>
  </div>
</template>

<script>

  import QiyeList from './QiyeList'
  import QiyeZichaList from './QiyeZichaList'
  import YinhuanList from './YinhuanList'
  import moment from 'moment'
  import {GeneralQuerySelChildren} from '../api'

  const selOptions=['企业类型','国民经济行业分类','安全监管行业']          //选择项所需要的配置，localstorage中的配置名称
  const selOptionMutation='INIT_QUERY_QIYEZICHA_SELECTED_OPTIONS'   //将选择项配置保存到store的mutation方法名
  const getSelOpitons='query_qiyezicha_selOptions'   //获取选择项的配置内容
  // const reqList='reqQiyeZichaQueryList'                   //查询列表
  const getList='query_qiyezicha_list'                //获取table的list
  const commitSearchMutation='INIT_QUERY_QIYEZICHA_SEARCHVALUES'                  //更新store内的搜索项数据
  const clearSearchMutation='CLEAR_QUERY_QIYEZICHA_SEARCHVALUES'                  //清除store内的搜索项数据
  export default {
    name:'qiyezhichaQuery',
    components:{
      QiyeList,
      QiyeZichaList,
      YinhuanList
    },

    data(){
      return{
        pageLoading:false,
        showData:false,
        searchValues:{
          param1:null,
          param2:null,
          param3:'',
          param4:'',
          param5:[],
          param6:[],
          param7:undefined,
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
        const commitValues={}
        let reqList=''
        switch (this.searchValues.type) {
          case 1:
            if(this.searchValues.param1)commitValues.param1=this.searchValues.param1.format('YYYY-MM-DD')
            if(this.searchValues.param2)commitValues.param2=this.searchValues.param2.format('YYYY-MM-DD')
            if(this.searchValues.param3!='')commitValues.param3=this.searchValues.param3
            if(this.searchValues.param4!='')commitValues.param4=this.searchValues.param4
            if(this.searchValues.param5.length>0)commitValues.param5=this.searchValues.param5[0]
            if(this.searchValues.param5.length>1)commitValues.param6=this.searchValues.param5[1]
            if(this.searchValues.param6.length>0)commitValues.param7=this.searchValues.param6[0]
            if(this.searchValues.param6.length>1)commitValues.param8=this.searchValues.param6[1]
            if(this.searchValues.param6.length>2)commitValues.param9=this.searchValues.param6[2]
            if(this.searchValues.param6.length>3)commitValues.param10=this.searchValues.param4[3]
            commitValues.param11=this.searchValues.param7
            reqList='reqQiyeZichaQueryList'
                break
          case 2:
            if(this.searchValues.param1)commitValues.param1=this.searchValues.param1.format('YYYY-MM-DD')
            if(this.searchValues.param2)commitValues.param2=this.searchValues.param2.format('YYYY-MM-DD')
            if(this.searchValues.param3!='')commitValues.param3=this.searchValues.param3
            if(this.searchValues.param4!='')commitValues.param4=this.searchValues.param4
            if(this.searchValues.param5.length>0)commitValues.param5=this.searchValues.param5[0]
            if(this.searchValues.param5.length>1)commitValues.param6=this.searchValues.param5[1]
            if(this.searchValues.param6.length>0)commitValues.param7=this.searchValues.param6[0]
            if(this.searchValues.param6.length>1)commitValues.param8=this.searchValues.param6[1]
            if(this.searchValues.param6.length>2)commitValues.param9=this.searchValues.param6[2]
            if(this.searchValues.param6.length>3)commitValues.param10=this.searchValues.param4[3]
            commitValues.param11=this.searchValues.param7
            reqList='reqQiyeZichaInfoList'
            break
          case 3:
            if(this.searchValues.param1)commitValues.param1=this.searchValues.param1.format('YYYY-MM-DD')
            if(this.searchValues.param2)commitValues.param2=this.searchValues.param2.format('YYYY-MM-DD')
            if(this.searchValues.param3!='')commitValues.param3=this.searchValues.param3
            if(this.searchValues.param4!='')commitValues.param4=this.searchValues.param4
            if(this.searchValues.param5.length>0)commitValues.param5=this.searchValues.param5[0]
            if(this.searchValues.param5.length>1)commitValues.param6=this.searchValues.param5[1]
            if(this.searchValues.param6.length>0)commitValues.param7=this.searchValues.param6[0]
            if(this.searchValues.param6.length>1)commitValues.param8=this.searchValues.param6[1]
            if(this.searchValues.param6.length>2)commitValues.param9=this.searchValues.param6[2]
            if(this.searchValues.param6.length>3)commitValues.param10=this.searchValues.param4[3]
            commitValues.param11=this.searchValues.param7
            reqList='reqQiyeZichaYinhuanList'
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
          param1:null,
          param2:null,
          param3:'',
          param4:'',
          param5:[],
          param6:[],
          param7:undefined,
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