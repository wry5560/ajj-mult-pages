<template>
  <div class="ajj-tast-table":style="{width:'100%'}">
    <div  class="editable-add-btn">
      <a-range-picker :value="dateRange.dateRangePickedValue"@change="onRangeChange" :disabledDate="disabledDate"size="small" />
    </div>
    <a-table
      bordered
      :dataSource="dataSource"
      :columns="columns"
      size="small"
      :pagination='false'
      :scroll="scrollSize">
    </a-table>
  </div>
</template>
<script>
  import moment from 'moment';
  import {format, eachDay} from 'date-fns'
  export default {
    components: {
    },
    props:{
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
          x:'130%',
          y:800
        },
        columns:[
            {
              title: '日期',
              dataIndex: 'paibandate',
              width: 300,
              align:'center',
            },
            {
              titleText:'一级',
              dataIndex: 'lv1user',
              width: 350,
              align:'center',
            },
            {
              titleText:'二级',
              dataIndex: 'lv2user',
              width: 350,
              align:'center',
            },
          ],
        dataSource: [],
        count: 2,
      }
    },
    computed:{
    },
    methods: {
      moment,
      onRangeChange(date,dateString){
        this.dateRange.dateRangePickedValue=date
        this.dateRange.startDate=dateString[0]
        this.dateRange.endDate=dateString[1]
        this.reqTableData()
      },
      reqTableData(){
        this.dataSource=[]
        const dates =eachDay(this.dateRange.startDate,this.dateRange.endDate)
        const datas=[]
        dates.forEach((date,index)=>{
          datas.push({
            key:index,
            paibandate: format(date,'YYYY-MM-DD'),
            lv1user:'',
            lv2user:'',
          })
        })
        this.dataSource=datas
      },
    },
  }
</script>
<style lang="scss" scoped>
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