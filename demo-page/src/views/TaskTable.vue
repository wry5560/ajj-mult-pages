<template>
  <div class="ajj-tast-table">
    <div  class="editable-add-btn">
      <!--<a-button @click="handleAdd">Add</a-button>-->
      <a-button type='primary' @click="()=>autoArrange('all')"size="small" :style="{'margin-left':'5px'}">自动排班</a-button>
      <a-button @click="()=>clearArrange('all')"size="small">清除排班</a-button>
      <a-button @click=""size="small">提交</a-button>
      <a-month-picker :defaultValue="dateRange.defaultMonthValue" :value="dateRange.monthPickedValue" @change="onMonthChange" placeholder="请选择月" :disabledDate="disabledMonth"size="small" />
      <a-range-picker :value="dateRange.dateRangePickedValue"@change="onRangeChange" :disabledDate="disabledDate"size="small" />
    </div>

    <a-table
      bordered
      :dataSource="dataSource"
      :columns="columns"
      size="small"
      :loading="tableIsLoading"
      :pagination='false'
      :scroll="scrollSize">
      <template  slot="levelOneTitle">
        <editable-title-cell :text="columns[1].titleText" textTitle="levelOne" @change="onTitleCellChange"/>
      </template>
      <template  slot="levelTwoTitle">
        <editable-title-cell :text="columns[2].titleText"textTitle="levelTwo" @change="onTitleCellChange"/>
      </template>
      <template  slot="levelThreeTitle">
        <editable-title-cell :text="columns[3].titleText"textTitle="levelThree" @change="onTitleCellChange"/>
      </template>
      <template  slot="levelFourTitle">
        <editable-title-cell :text="columns[4].titleText"textTitle="levelFour" @change="onTitleCellChange"/>
      </template>
      <template  slot="levelFiveTitle">
        <editable-title-cell :text="columns[5].titleText"textTitle="levelFive" @change="onTitleCellChange"/>
      </template>
      <div slot="levelOneDropdown" slot-scope="{ setSelectedKeys, selectedKeys,confirm,clearFilters }" class='custom-filter-dropdown'>
        <a-button type='primary'size="small" @click="()=>autoArrange('levelOne',confirm)">自动排班</a-button>
        <a-button size="small"@click="()=>clearArrange('levelOne',confirm)">清除排班</a-button>
      </div>
      <div slot="levelTwoDropdown" slot-scope="{ setSelectedKeys, selectedKeys,confirm,clearFilters }" class='custom-filter-dropdown'>
        <a-button size="small"type='primary' @click="()=>autoArrange('levelTwo',confirm)">自动排班</a-button>
        <a-button size="small"@click="()=>clearArrange('levelTwo',confirm)">清除排班</a-button>
      </div>
      <div slot="levelThreeDropdown" slot-scope="{ setSelectedKeys, selectedKeys,confirm,clearFilters }" class='custom-filter-dropdown'>
        <a-button size="small"type='primary' @click="()=>autoArrange('levelThree',confirm)">自动排班</a-button>
        <a-button size="small"@click="()=>clearArrange('levelThree',confirm)">清除排班</a-button>
      </div>
      <div slot="levelFourDropdown" slot-scope="{ setSelectedKeys, selectedKeys,confirm,clearFilters }" class='custom-filter-dropdown'>
        <a-button size="small"type='primary' @click="()=>autoArrange('levelFour',confirm)">自动排班</a-button>
        <a-button size="small"@click="()=>clearArrange('levelFour',confirm)">清除排班</a-button>
      </div>
      <div slot="levelFiveDropdown" slot-scope="{ setSelectedKeys, selectedKeys,confirm,clearFilters }" class='custom-filter-dropdown'>
        <a-button size="small"type='primary' @click="()=>autoArrange('levelFive',confirm)">自动排班</a-button>
        <a-button size="small"@click="()=>clearArrange('levelFive',confirm)">清除排班</a-button>
      </div>
      <template slot="levelOneCell" slot-scope="text, record">
        <editable-cell :text="text" :staffList="staffList[0]":tableKey="record.key" textTitle="levelOne" @change="onCellChange"/>
      </template>
      <template slot="levelTwoCell" slot-scope="text, record">
        <editable-cell :text="text" :staffList="staffList[1]" :tableKey="record.key" textTitle="levelTwo"@change="onCellChange"/>
      </template>
      <template slot="levelThreeCell" slot-scope="text, record">
        <editable-cell :text="text" :staffList="staffList[2]" :tableKey="record.key" textTitle="levelThree"@change="onCellChange"/>
      </template>
      <template slot="levelFourCell" slot-scope="text, record">
        <editable-cell :text="text" :staffList="staffList[3]" :tableKey="record.key" textTitle="levelFour"@change="onCellChange"/>
      </template>
      <template slot="levelFiveCell" slot-scope="text, record">
        <editable-cell :text="text" :staffList="staffList[4]" :tableKey="record.key" textTitle="levelFive"@change="onCellChange"/>
      </template>
      <a-icon slot="filterIcon" slot-scope="filtered" type='ellipsis' :style="{ color: '#aaa' }" />
    </a-table>
  </div>
</template>
<script>
  import EditableCell from '@/views/EditableCell'
  import EditableTitleCell from '@/views/EditableTitleCell'
  import { axios } from '@/utils/request'

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
    data () {
      return {
        staffList: [['曾局', '王局', '张局', '李局', '席局', '陈局'], ['吴组长', '许组长', '张组长', '李组长', '席组长', '陈组长'], ['张三', '李四', '王五', '陈六'],['曾局', '王局', '张局', '李局', '席局', '陈局'],['曾局', '王局', '张局', '李局', '席局', '陈局'],],
        dateRange:{
          startDate:moment().format('YYYY-MM-DD'),
          endDate:moment().endOf('month').format('YYYY-MM-DD'),
          defaultMonthValue:moment(),
          monthPickedValue:moment(),
          dateRangePickedValue:[]
        },
        scrollSize:{
            y:window.innerHeight - 85
        },
        tableIsLoading:false,
        dataSource: [],
        count: 2,
        columns: [
          {
          title: '日期',
          dataIndex: 'date',
          width: 150,
          align:'center',
        },
          {
          titleText:"一级",
          dataIndex: 'levelOne',
          width: 150,
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
            titleText:"二级",
            dataIndex: 'levelTwo',
          width: 150,
          align:'center',
            slots:{
              title:'levelTwoTitle'
            },
          scopedSlots: {
            customRender: 'levelTwoCell',
            filterDropdown: 'levelTwoDropdown',
            filterIcon: 'filterIcon',
          },
        },
          {
            titleText:"三级",
          dataIndex: 'levelThree',
            slots:{
              title:'levelThreeTitle'
            },
          scopedSlots: {
            customRender: 'levelThreeCell',
            filterDropdown: 'levelThreeDropdown',
            filterIcon: 'filterIcon',
          },
          width: 150,
          align:'center'
        },
          {
            titleText:"四级",
            dataIndex: 'levelFour',
            slots:{
              title:'levelFourTitle'
            },
            scopedSlots: {
              customRender: 'levelFourCell',
              filterDropdown: 'levelFourDropdown',
              filterIcon: 'filterIcon',
            },
            width: 150,
            align:'center'
          },
          {
            titleText:"五级",
            dataIndex: 'levelFive',
            slots:{
              title:'levelFiveTitle'
            },
            scopedSlots: {
              customRender: 'levelFiveCell',
              filterDropdown: 'levelFiveDropdown',
              filterIcon: 'filterIcon',
            },
            width: 150,
            align:'center'
          }
        ],
      }
    },
    mounted(){
        this.reqTableData()
    },
    methods: {
      moment,
      autoArrange(arrangeType,confirm){
        if(arrangeType=='all'){
          this.arrange('levelOne')
          this.arrange('levelTwo')
          this.arrange('levelThree')
          this.arrange('levelFour')
          this.arrange('levelFive')
        }else{
          this.arrange(arrangeType)
        }
        if (confirm) confirm()
      },
      arrange(type) {
        let dataSource=[]
        const staffListIndex=['levelOne','levelTwo','levelThree','levelFour','levelFive'].findIndex((value)=>{return value==type})
        dataSource=this.dataSource.map((item,index,arr)=>{
          if(item[type]==' '|| null){
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
            item.levelOne=' '
            item.levelTwo=' '
            item.levelThree=' '
            item.levelFour=' '
            item.levelFive=' '
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
        const columns = [...this.columns]
        const target = columns.find(item=>item.dataIndex===data[1])
        if (target) {
          target.titleText = data[0]
          this.columns = columns
        }
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
        this.dateRange.monthPickedValue=date
        const tmpData =moment(date).startOf('month')
        this.dateRange.startDate= tmpData.isBefore(moment())? moment().format('YYYY-MM-DD'): tmpData
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
        //这里临时使用下假数据
        const dateRange ={
          startDate:this.dateRange.startDate,
          endDate:this.dateRange.endDate
        }
        this.reqSchedule(dateRange)
          .then((res)=>{
            // console.log(JSON.stringify(res));
            //下面是假数据
            const dates =eachDay(this.dateRange.startDate,this.dateRange.endDate)
            // console.log(dates)
            const data= dates.map((date,index)=>{
                return {
                  key:index,
                  date: format(date,'YYYY-MM-DD'),
                  levelOne: '曾局',
                  levelTwo: '吴组长',
                  levelThree:'陈工',
                  levelFour:'曾局',
                  levelFive:'陈工',
              }
            })
            this.dataSource=data
            this.tableIsLoading=false
            // console.log(data)
          })
          .catch((err)=>{
          })
      },
      reqSchedule(parameter){
        this.dataSource=[]
        this.tableIsLoading=true
        return axios({
          url: '/schedule',
          method: 'get',
          data: parameter,
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        })
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

  .editable-cell-input-wrapper,
  .editable-cell-text-wrapper {
    padding-right: 24px;
  }

  .editable-cell-text-wrapper {
    padding: 5px 24px 5px 5px;
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
    display: none;
    margin-top: 5px;
  }

  .editable-cell-icon-check {
    line-height: 28px;
  }

  .editable-cell:hover .editable-cell-icon {
    display: inline-block;
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