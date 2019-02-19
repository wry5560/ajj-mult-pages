<template>
    <div class="paiban">
      <div class="header">
        {{this.nowDate}} 当日排班情况
      </div>
      <div class="content">
        <a-row :gutter="{ md: 8,lg : 24}">
          <a-col :lg="12" :md="24" v-for="item in tableDatas">
            <div class="card-warpper">
              <a-card :loading="cardLoading" >
                <span slot="title" class="title">{{item.departName}}</span>
                <a-table
                  :rowClassName="rowClass"
                  :dataSource="item.dataSource"
                  :columns="tableOption.columns"
                  :pagination= "false"
                  :size="tableOption.size"
                  :loading="tableOption.tableIsLoading"
                  :scroll="tableOption.scrollSize"
                  :rowSelection="tableOption.rowSelection"
                >
              <span slot="actionCell" slot-scope="text,record,index" >
          <a href="javascript:;" @click="showModal('query',record)">查看</a>
                <a-divider v-if="" type="vertical" />
                <a href="javascript:;" @click="showModal('map',record)">职业病危害因素</a>
                <!--<a-divider v-if="" type="vertical" />-->
                <!--<a href="javascript:;" @click="showModal('edit',record)">修改</a>-->
                <!--<a-divider v-if="" type="vertical" />-->
                <!--<a-popconfirm title="您确认删除该条记录吗？" placement="bottomRight" okText="Yes" cancelText="No" @confirm="deleteRowData(record)">-->
                <!--<a href="javascript:;">删除</a>-->
                <!--</a-popconfirm>-->
                <!--<a-divider v-if="" type="vertical" />-->
                <!--<a href="javascript:;" @click="showModal('jcx',record)">检查项</a>-->
                <!--<a-divider v-if="" type="vertical" />-->
                <!--<a href="javascript:;" @click="showModal('qy',record)">检查企业</a>-->
        </span>
                  <span slot="defaultcustomRender" slot-scope="text,record,index">
          <template>
            <a-tooltip :mouseEnterDelay="0.8">
              <template slot='title'>
                {{text}}
              </template>
              <div style="width: 100%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{text}}</div>
            </a-tooltip>
          </template>
        </span>
                </a-table>
              </a-card>
            </div>
          </a-col>
        </a-row>
      </div>
    </div>
</template>

<script>
  import { reqWholeSchedule } from './api'
  import moment from 'moment'

  export default{
    moment,
    name:'paibanWholeSchedule',

    data(){
      return {
        cardLoading:false,
        tableOption:{
          size:'nomal',
          scrollSize:{},
          tableIsLoading:false,
          columns:[
            {title: '排班级别',dataIndex: 'level', width: '100px', align: 'center'},
            {title: '值班人员', dataIndex: 'name', width: '140px', align: 'center'},
            {title: '性别', dataIndex: 'sex', width: '80px', align: 'center'},
            {title: '联系电话', dataIndex: 'mobilePhone', width: '100px', align: 'center',},
        ],
          // rowSelection:{
          //   selectedRowKeys: [],
          //   onChange: this.onSelectChange,
          //   columnWidth:'20px',
          // }
          rowSelection:null,
        },
        tableDatas:[]
      }
    },
    created(){
        this.reqData()
    },
    computed:{
      nowDate(){
          return moment().format('YYYY - MM - DD')
      }
    },
    methods:{
      reqData(){
        this.cardLoading=true
        reqWholeSchedule()
          .then((res)=>{
            if (res.success){
                console.log(JSON.stringify(res.data))
              this.tableDatas=[]
              res.data.forEach((item)=>{
                const tableData={}
                tableData.departName = item.__ddepartmentid.departName
                tableData.dataSource = []
                  const lv1= {
                    level:item.lv1name,
                    name:item.__ulv1user.userName,
                    sex:item.__ulv1user.sex == ''?'':item.__ulv1user.sex == 'M'?'男':'女',
                    mobilePhone:item.__ulv1user.mobilePhone
                    }
                  const lv2= {
                    level:item.lv2name,
                    name:item.__ulv2user.userName,
                    sex:item.__ulv2user.sex == ''?'':item.__ulv2user.sex == 'M'?'男':'女',
                    mobilePhone:item.__ulv2user.mobilePhone
                    }
                  const lv3= {level:item.lv3name,name:item.__ulv3user.userName,sex:item.__ulv3user.sex == ''?'':item.__ulv3user.sex == 'M'?'男':'女',mobilePhone:item.__ulv3user.mobilePhone}
                  const lv4={level:item.lv4name,name:item.__ulv4user.userName,sex:item.__ulv4user.sex == ''?'':item.__ulv4user.sex == 'M'?'男':'女',mobilePhone:item.__ulv4user.mobilePhone}
                  const lv5={level:item.lv5name,name:item.__ulv5user.userName,sex:item.__ulv5user.sex == ''?'':item.__ulv5user.sex == 'M'?'男':'女',mobilePhone:item.__ulv5user.mobilePhone}
                  tableData.dataSource=[lv1,lv2,lv3,lv4,lv5]
                  this.tableDatas.push(tableData)
              })
              this.cardLoading=false
//              this.tableDatas=res.data
            }
          })
          .catch((err)=>{console.log(JSON.stringify(err))})
      },
      rowClass(record,index){
        if (index%2==1) return 'even-rows'
      },
    }
  }

</script>
<style lang="scss" scoped>
.paiban{
  .header{
    background-color: #ffffff;
    padding:14px 36px;
    font-size: 20px;
    font-weight:500;
  }
  .content{
    margin: 24px;
    .card-warpper{
      margin-top: 24px;
    }
    .title{
      border-left: 4px solid #1478f0;
      padding-left: 8px;
      font-size: 16px;
      color: #575757;
      font-weight: 600;
    }
    .ant-table-wrapper{
      border-bottom: none;
    }
  }

}

</style>