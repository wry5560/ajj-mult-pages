<template>
  <div class="ajj-tast-table">
    <div  class="editable-add-btn">
      <a-button @click="handleAdd">Add</a-button>
      <a-month-picker :defaultValue="dateRange.defaultMonthValue" :value="dateRange.monthPickedValue" @change="onMonthChange" placeholder="请选择月" :disabledDate="disabledMonth" />
      <a-range-picker :value="dateRange.dateRangePickedValue"@change="onRangeChange" :disabledDate="disabledDate" />
    </div>

    <a-table
      bordered
      :dataSource="dataSource"
      :columns="columns"
      size="small"
      :loading="tableIsLoading"
      :pagination='false'
      :scroll="scrollSize">
      <template slot="name" slot-scope="text, record">
        <editable-cell :text="text" @change="onCellChange(record.key, 'name')"/>
      </template>
    </a-table>
  </div>
</template>
<script>
  import EditableCell from '@/views/EditableCell'
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
    },
    data () {
      return {
        dateRange:{
          startDate:moment().startOf('month').format('YYYY-MM-DD'),
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
          scopedSlots: { customRender: 'name' },
          align:'center'
        }, {
          title: '局长',
          dataIndex: 'juzhang',
          width: 150,
          align:'center'
        }, {
          title: '组长',
          dataIndex: 'zuzhang',
          width: 150,
          align:'center'
        }, {
          title: '组员',
          dataIndex: 'zuyuan',
          scopedSlots: { customRender: 'operation' },
          width: 150,
          align:'center'
        }],
      }
    },
    mounted(){
        this.reqTableData()
    },
    methods: {
      moment,
      disabledMonth(current){
        return current < moment().startOf('month');
      },
      disabledDate(current) {
        // Can not select days before today and today
        return current < moment().startOf('day');

      },
      onCellChange (key, dataIndex) {
        return (value) => {
          const dataSource = [...this.dataSource]
          const target = dataSource.find(item => item.key === key)
          if (target) {
            target[dataIndex] = value
            this.dataSource = dataSource
          }
        }
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
        this.dateRange.startDate=moment(date).startOf('month').format('YYYY-MM-DD')
        this.dateRange.endDate=moment(date).endOf('month').format('YYYY-MM-DD')
        this.dateRange.dateRangePickedValue=[]
        this.reqTableData()
        console.log(date, dateString);
      },
      onRangeChange(date,dateString){
        this.dateRange.dateRangePickedValue=date
        this.dateRange.startDate=dateString[0]
        this.dateRange.endDate=dateString[1]
        this.dateRange.monthPickedValue=null
        this.reqTableData()
        console.log(eachDay(date[0],date[1]))
      },
      reqTableData(){
        const dateRange ={
          startDate:this.dateRange.startDate,
          endDate:this.dateRange.endDate
        }

        this.reqSchedule(dateRange)
          //这里临时使用下假数据
          .then((res)=>{
            console.log(JSON.stringify(res));
            //下面是假数据
            const dates =eachDay(this.dateRange.startDate,this.dateRange.endDate)
            console.log(dates)
            const data= dates.map((date,index)=>{
                return {
                  key:index,
                  date: format(date,'YYYY-MM-DD'),
                  juzhang: '曾局',
                  zuzhang: '吴组长',
                  zuyuan:'陈工'
              }
            })
            this.dataSource=data
            this.tableIsLoading=false
            console.log(data)
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
    margin-bottom: 8px;
  }
</style>