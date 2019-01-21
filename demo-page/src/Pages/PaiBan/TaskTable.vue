<template>
  <div class="ajj-tast-table" :style="{width:'100%'}">
    <div  class="header-buttons-bar">
      <!--<a-button @click="handleAdd">Add</a-button>-->
      <a-button type='primary' @click="()=>autoArrange('all')"size="small" :style="{'margin-left':'5px'}">自动排班</a-button>
      <a-button @click="()=>clearArrange('all')"size="small">清除排班</a-button>
      <a-button @click="topostSchedule"size="small">提交</a-button>
      <a-button @click="reqTableData"size="small">刷新</a-button>
      <a-month-picker :defaultValue="dateRange.defaultMonthValue" :value="dateRange.monthPickedValue" @change="onMonthChange" placeholder="请选择月" :disabledDate="disabledMonth"size="small" />
      <a-range-picker :value="dateRange.dateRangePickedValue"@change="onRangeChange" :disabledDate="disabledDate"size="small" />
    </div>

    <a-table
      bordered
      :dataSource="dataSource"
      :columns="columns"
      size="small"
      :rowClassName="rowClass"
      :loading="tableIsLoading"
      :pagination='false'
      :scroll="scrollSize">
      <template  slot="levelOneTitle">
        <editable-title-cell :text="columns[1].titleText" textTitleIndex="0" @change="onTitleCellChange"/>
      </template>
      <template  slot="levelTwoTitle">
        <editable-title-cell :text="columns[2].titleText"textTitleIndex="1" @change="onTitleCellChange"/>
      </template>
      <template  slot="levelThreeTitle">
        <editable-title-cell :text="columns[3].titleText"textTitleIndex="2" @change="onTitleCellChange"/>
      </template>
      <template  slot="levelFourTitle">
        <editable-title-cell :text="columns[4].titleText"textTitleIndex="3" @change="onTitleCellChange"/>
      </template>
      <template  slot="levelFiveTitle">
        <editable-title-cell :text="columns[5].titleText"textTitleIndex="4" @change="onTitleCellChange"/>
      </template>
      <div slot="levelOneDropdown" slot-scope="{ setSelectedKeys, selectedKeys,confirm,clearFilters }" class='custom-filter-dropdown'>
        <a-button type='primary'size="small" @click="()=>autoArrange('lv1user',confirm)">自动排班</a-button>
        <a-button size="small"@click="()=>clearArrange('lv1user',confirm)">清除排班</a-button>
      </div>
      <div slot="levelTwoDropdown" slot-scope="{ setSelectedKeys, selectedKeys,confirm,clearFilters }" class='custom-filter-dropdown'>
        <a-button size="small"type='primary' @click="()=>autoArrange('lv2user',confirm)">自动排班</a-button>
        <a-button size="small"@click="()=>clearArrange('lv2user',confirm)">清除排班</a-button>
      </div>
      <div slot="levelThreeDropdown" slot-scope="{ setSelectedKeys, selectedKeys,confirm,clearFilters }" class='custom-filter-dropdown'>
        <a-button size="small"type='primary' @click="()=>autoArrange('lv3user',confirm)">自动排班</a-button>
        <a-button size="small"@click="()=>clearArrange('lv3user',confirm)">清除排班</a-button>
      </div>
      <div slot="levelFourDropdown" slot-scope="{ setSelectedKeys, selectedKeys,confirm,clearFilters }" class='custom-filter-dropdown'>
        <a-button size="small"type='primary' @click="()=>autoArrange('lv4user',confirm)">自动排班</a-button>
        <a-button size="small"@click="()=>clearArrange('lv4user',confirm)">清除排班</a-button>
      </div>
      <div slot="levelFiveDropdown" slot-scope="{ setSelectedKeys, selectedKeys,confirm,clearFilters }" class='custom-filter-dropdown'>
        <a-button size="small"type='primary' @click="()=>autoArrange('lv5user',confirm)">自动排班</a-button>
        <a-button size="small"@click="()=>clearArrange('lv5user',confirm)">清除排班</a-button>
      </div>
      <template slot="levelOneCell" slot-scope="text, record">
        <editable-cell :text="text" :staffList="staffList[0]":tableKey="record.key" textTitle="lv1user" @change="onCellChange"/>
      </template>
      <template slot="levelTwoCell" slot-scope="text, record">
        <editable-cell :text="text" :staffList="staffList[1]" :tableKey="record.key" textTitle="lv2user"@change="onCellChange"/>
      </template>
      <template slot="levelThreeCell" slot-scope="text, record">
        <editable-cell :text="text" :staffList="staffList[2]" :tableKey="record.key" textTitle="lv3user"@change="onCellChange"/>
      </template>
      <template slot="levelFourCell" slot-scope="text, record">
        <editable-cell :text="text" :staffList="staffList[3]" :tableKey="record.key" textTitle="lv4user"@change="onCellChange"/>
      </template>
      <template slot="levelFiveCell" slot-scope="text, record">
        <editable-cell :text="text" :staffList="staffList[4]" :tableKey="record.key" textTitle="lv5user"@change="onCellChange"/>
      </template>
      <a-icon slot="filterIcon" slot-scope="filtered" type='ellipsis' :style="{ color: '#aaa' }" />
    </a-table>
  </div>
</template>
<script>
  import EditableCell from './EditableCell'
  import EditableTitleCell from './EditableTitleCell'
  import { axios } from '@/utils/request'
  import {reqSchedule,postSchedule} from "./api"
  import { mapActions } from 'vuex'
  import moment from 'moment';
  import {format, eachDay} from 'date-fns'
  /*
   * EditableCell Code https://github.com/vueComponent/ant-design-vue/blob/master/components/table/demo/EditableCell.vue
   */
  export default {
    components: {
      EditableCell,
      EditableTitleCell
    },
    props:{
      staffListProp:{
        type:Array,
        default:[{type:'一级',titleText:' ',nameList:[]},
          {type:'二级',titleText:' ',nameList:[]},
          {type:'三级',titleText:' ',nameList:[]},
          {type:'四级',titleText:' ',nameList:[]},
          {type:'五级',titleText:' ',nameList:[]}],
      },
      reqStaffListComplete:Boolean
    },
    data () {
      return {
        dateRange:{
          startDate:moment().format('YYYY-MM-DD'),
          endDate:moment().endOf('month').format('YYYY-MM-DD'),
          defaultMonthValue:moment(),
          monthPickedValue:moment(),
          dateRangePickedValue:[]
        },
        scrollSize:{
          x:1022,
          y:window.innerHeight - 85
        },
        tableIsLoading:false,
        dataSource: [],
        count: 2,
        loopNum:0

      }
    },
    mounted(){
        this.reqTableData()
    },
    computed:{
      staffList(){
          const staffList=[]
        if (this.staffListProp.length>0) {this.staffListProp.forEach((levelX)=>{
          const nameList=[]
          levelX.nameList.forEach((item)=>{
            nameList.push(item.name)
          })
          staffList.push(nameList)
        })}
          return staffList
      },
      columns:{
        get:function () {
          return[
            {
              title: '日期',
              dataIndex: 'paibandate',
              width: 122,
              align:'center',
            },
            {
              title:this.staffListProp[0].titleText,
              titleText:this.staffListProp[0].titleText,
              dataIndex: 'lv1user',
              width: 180,
              align:'center',
              slots:{
                title:'levelOneTitle'
              },
              scopedSlots: {
                customRender: 'levelOneCell',
                filterDropdown: 'levelOneDropdown',
                filterIcon: 'filterIcon',
              },
            },
            {
              title:this.staffListProp[1].titleText,
              titleText:this.staffListProp[1].titleText,
              dataIndex: 'lv2user',
              width: 180,
              align:'center',
              slots:{
                title:'levelTwoTitle'
              },
              scopedSlots: {
                customRender: 'levelTwoCell',
                filterDropdown: 'levelTwoDropdown',
                filterIcon: 'filterIcon',
              },
            }, {
              title: this.staffListProp[2].titleText,
              titleText: this.staffListProp[2].titleText,
              dataIndex: 'lv3user',
              slots:{
                title:'levelThreeTitle'
              },
              scopedSlots: {
                customRender: 'levelThreeCell',
                filterDropdown: 'levelThreeDropdown',
                filterIcon: 'filterIcon',
              },
              width: 180,
              align:'center'
            },
            {
              title:this.staffListProp[3].titleText,
              titleText:this.staffListProp[3].titleText,
              dataIndex: 'lv4user',
              slots:{
                title:'levelFourTitle'
              },
              scopedSlots: {
                customRender: 'levelFourCell',
                filterDropdown: 'levelFourDropdown',
                filterIcon: 'filterIcon',
              },
              width: 180,
              align:'center'
            },
            {
              title:this.staffListProp[4].titleText,
              titleText:this.staffListProp[4].titleText,
              dataIndex: 'lv5user',
              slots:{
                title:'levelFiveTitle'
              },
              scopedSlots: {
                customRender: 'levelFiveCell',
                filterDropdown: 'levelFiveDropdown',
                filterIcon: 'filterIcon',
              },
              width: 180,
              align:'center'
            },
            // {
            //   titleText:'',
            //   dataIndex: 'other',
            //   align:'center'
            // }
          ]
        },
        set:function () {
          
        }
      }
    },
    methods: {
      moment,
      idToName(id,index){
        let staff =this.staffListProp[index].nameList.find(i=>{return i.id==id})
        if (typeof(staff)!="undefined"){
          return staff.name
        }else{return ''}
      },
      nameToId(name,index){
        let staff=this.staffListProp[index].nameList.find(i=>{return i.name==name})
        if (typeof(staff)!="undefined"){
          return staff.id.toString()
        }else{return ''}
      },
      autoArrange(arrangeType,confirm){
        if(arrangeType=='all'){
          this.arrange('lv1user')
          this.arrange('lv2user')
          this.arrange('lv3user')
          this.arrange('lv4user')
          this.arrange('lv5user')
        }else{
          this.arrange(arrangeType)
        }
        if (confirm) confirm()
      },
      arrange(type) {
        // debugger
        let dataSource=[]
        const staffListIndex=['lv1user','lv2user','lv3user','lv4user','lv5user'].findIndex((value)=>{return value==type})
        dataSource=this.dataSource.map((item,index,arr)=>{
          if(item[type]==''|| null){
            if (index==0){item[type]=this.staffList[staffListIndex][0]}else{
              const preValue =arr[index-1][type]
              const staffValueIndex =this.staffList[staffListIndex].findIndex((value) =>{
                return value ==preValue
              })
              item[type]= staffValueIndex < this.staffList[staffListIndex].length-1 ? this.staffList[staffListIndex][staffValueIndex+1]:this.staffList[staffListIndex][0]
            }
          }
          return item
        })
        this.dataSource=dataSource
      },
      clearArrange(clearData,confirm){
        let dataSource=[]
        if(clearData=='all'){
          dataSource=this.dataSource.map((item,index)=>{
            item.lv1user=' '
            item.lv2user=' '
            item.lv3user=' '
            item.lv4user=' '
            item.lv5user=' '
            return item
          })
        }else{
          dataSource=this.dataSource.map((item,index)=>{
            item[clearData]=' '
            return item
          })
        }
        this.dataSource=dataSource
        if (confirm) confirm()
        // console.log(dataSource)
        // debugger
      },
      disabledMonth(current){
        return current < moment().startOf('month');
      },
      disabledDate(current) {
        // Can not select days before today and today
        return current < moment().startOf('day');

      },
      onCellChange (data) {
          // debugger
          const dataSource = [...this.dataSource]
          const target = dataSource.find(item => item.key === data[2])
          if (target) {
            target[data[1]] = data[0]
            this.dataSource = dataSource
          }
      },
      onTitleCellChange(data){
        // const columns = [...this.columns]
        // const target = columns.find(item=>item.dataIndex===data[1])
        // if (target) {
        //   target.titleText = data[0]
        //   this.columns = columns

        // }
        this.$emit('onTitleChange', data)
        // debugger
      },
      onDelete (key) {
        const dataSource = [...this.dataSource]
        this.dataSource = dataSource.filter(item => item.key !== key)
      },
      handleAdd () {
        const { count, dataSource } = this
        const newData = {
          key: count,
          name: `Edward King ${count}`,
          age: 32,
          address: `London, Park Lane no. ${count}`,
        }
        this.dataSource = [...dataSource, newData]
        this.count = count + 1
      },
      onMonthChange(date, dateString) {
        // debugger
        this.dateRange.monthPickedValue=date
        const tmpData =moment(date).startOf('month')
        this.dateRange.startDate= tmpData.isBefore(moment())? moment().format('YYYY-MM-DD'): tmpData.format('YYYY-MM-DD')
        this.dateRange.endDate=moment(date).endOf('month').format('YYYY-MM-DD')
        this.dateRange.dateRangePickedValue=[]
        this.reqTableData()
        // console.log(date, dateString);
      },
      onRangeChange(date,dateString){
        this.dateRange.dateRangePickedValue=date
        this.dateRange.startDate=dateString[0]
        this.dateRange.endDate=dateString[1]
        this.dateRange.monthPickedValue=null
        this.reqTableData()
        // console.log(eachDay(date[0],date[1]))
      },
      reqTableData(){
        // debugger
        this.dataSource=[]
        this.tableIsLoading=true
        const dateRange ={
          limit:'10000',
          param1:departmentId,
//          param1:process.env.NODE_ENV === 'production'? departmentId:'9361',
          param2:this.dateRange.startDate,
          param3:this.dateRange.endDate
        }
        reqSchedule(dateRange)
          .then((res)=>{
            // debugger
            // console.log(JSON.stringify(res));
            const dates =eachDay(this.dateRange.startDate,this.dateRange.endDate)
            const datas=[]
            dates.forEach((date,index)=>{
              datas.push({
                key:index,
                paibandate: format(date,'YYYY-MM-DD'),
                lv1user:'',
                lv2user:'',
                lv3user:'',
                lv4user:'',
                lv5user:'',
              })
            })

            if (res.data.length>0){res.data.forEach(item=>{
              // debugger
              const paibandata=datas.find(i=>{return i.paibandate ==item.paibandate})
              paibandata.lv1user=this.idToName(item.lv1user,0)
              paibandata.lv2user=this.idToName(item.lv2user,1)
              paibandata.lv3user=this.idToName(item.lv3user,2)
              paibandata.lv4user=this.idToName(item.lv4user,3)
              paibandata.lv5user=this.idToName(item.lv5user,4)
            })}
            this.dataSource=datas
            this.tableIsLoading=false
            this.initDataSource(res,datas)

            // console.log(data)
          })
          .catch((err)=>{
          })
      },
      initDataSource(res,datas) {
        // console.log(this.reqStaffListComplete)
        // debugger
        if (this.reqStaffListComplete==true){
          res.data.forEach(item=>{
            // debugger
            const paibandata=datas.find(i=>{return i.paibandate ==item.paibandate})
            paibandata.lv1user=this.idToName(item.lv1user,0)
            paibandata.lv2user=this.idToName(item.lv2user,1)
            paibandata.lv3user=this.idToName(item.lv3user,2)
            paibandata.lv4user=this.idToName(item.lv4user,3)
            paibandata.lv5user=this.idToName(item.lv5user,4)
          })
          this.loopNum=0
        }else{
          // debugger
          if (this.loopNum==500){
            this.loopNum=0
            return}
          this.loopNum =this.loopNum + 1
          setTimeout(()=>{this.initDataSource(res,datas)},1000)
        }
      },
      topostSchedule(){
        const dataSource=[]
        this.dataSource.forEach((item)=>{
          const data={}
          data.paibandate=item.paibandate
          data.lv1user=this.nameToId(item.lv1user,0)
          data.lv2user=this.nameToId(item.lv2user,1)
          data.lv3user=this.nameToId(item.lv3user,2)
          data.lv4user=this.nameToId(item.lv4user,3)
          data.lv5user=this.nameToId(item.lv5user,4)
          dataSource.push(data)
        })
        const parameter={
        'jsonData':JSON.stringify({paiban:dataSource}),
        'param1':departmentId
//          param1:process.env.NODE_ENV === 'production'? departmentId:'9361',
        }
        postSchedule(parameter).then((res)=>{
          if (res.success) {this.$message.success('提交成功');}else{
            this.$message.error(res.message)
          }
        })
      },
      rowClass(record,index){
        if (index%2==1) return 'even-rows'
      }
    },
  }
</script>
<style lang="scss">
  .ajj-task-table{
    h4{
      margin-bottom: 16px;
    }
  }
  .editable-cell {
    position: relative;
  }

  .editable-cell-text-wrapper {
    padding-right: 24px;
  }

  .editable-cell-text-wrapper {
    /*padding: 5px 24px 5px 5px;*/
  }

  .editable-cell-icon,
  .editable-cell-icon-check {
    position: absolute;
    right: 0;
    width: 20px;
    cursor: pointer;
  }

  .editable-cell-icon {
    line-height: 18px;
    display: none !important;
    margin-top: 5px;
  }

  .editable-cell-icon-check {
    line-height: 28px;
  }

  .editable-cell:hover .editable-cell-icon {
    display: inline-block !important;
  }

  .editable-cell-icon:hover,
  .editable-cell-icon-check:hover {
    color: #108ee9;
  }

  .editable-add-btn {
    margin: 4px 0;
    button{
      margin-right: 6px;
    }
  }

  .custom-filter-dropdown {
    padding: 8px;
    border-radius: 6px;
    background: #fff;
    box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
  }

  .custom-filter-dropdown button {
    margin-right: 8px;
  }

</style>